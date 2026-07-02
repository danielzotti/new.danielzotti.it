import fs from "fs";
import path from "path";
import { loadEnvConfig } from "@next/env";
import { Octokit } from "octokit";

// Load .env.local (and other .env* files) before reading config,
// so GITHUB_ACCESS_TOKEN is available.
loadEnvConfig(process.cwd());

// Dynamic import so config is evaluated AFTER env vars are set above.
const { config } = await import("../src/config");

type OpenSourceRepo = {
  slug: string;
  name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  created_at: string | null;
  updated_at: string | null;
  topics: string[];
  readme: string | null;
};

const outputPath = path.join(process.cwd(), "src/generated/open-source-repos.ts");

const octokit = new Octokit({ auth: config.github.token });

async function retryWithBackoff<T>(fn: () => Promise<T>, maxRetries = 3, initialDelayMs = 1000): Promise<T> {
  let lastError: Error | undefined;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      const delayMs = initialDelayMs * 2 ** attempt;
      console.warn(`GitHub API attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${delayMs}ms...`, lastError.message);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw lastError;
}

async function fetchRepoSnapshot(selectedRepo: { slug: string; name: string }): Promise<OpenSourceRepo> {
  return retryWithBackoff(async () => {
    const res = await octokit.rest.repos.get({ owner: config.github.user, repo: selectedRepo.name });
    const defaultBranch = res.data.default_branch;
    const readmeUrl = `https://raw.githubusercontent.com/${config.github.user}/${selectedRepo.name}/${defaultBranch}/README.md`;
    const readmeResponse = await fetch(readmeUrl);

    return {
      slug: selectedRepo.slug,
      name: res.data.name,
      description: res.data.description,
      homepage: res.data.homepage ?? null,
      html_url: res.data.html_url,
      created_at: res.data.created_at,
      updated_at: res.data.updated_at,
      topics: res.data.topics ?? [],
      readme: readmeResponse.ok ? await readmeResponse.text() : null,
    };
  });
}

const snapshots: OpenSourceRepo[] = [];
for (const selectedRepo of config.github.selectedRepos) {
  snapshots.push(await fetchRepoSnapshot(selectedRepo));
}

const fileContents = `/* eslint-disable prettier/prettier */
export type OpenSourceRepo = {
  slug: string;
  name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  created_at: string | null;
  updated_at: string | null;
  topics: string[];
  readme: string | null;
};

export const openSourceRepos: OpenSourceRepo[] = ${JSON.stringify(snapshots, null, 2)};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, fileContents);

console.log(`Generated ${path.relative(process.cwd(), outputPath)}`);
