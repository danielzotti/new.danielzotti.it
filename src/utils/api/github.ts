import { Octokit } from "octokit";
import { config } from "src/config";

const octokit = new Octokit({
  auth: config.github.token,
});

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelayMs = 1000,
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      const delayMs = initialDelayMs * Math.pow(2, attempt);
      console.warn(
        `GitHub API attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${delayMs}ms...`,
        lastError.message,
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  
  throw lastError;
}

export async function fetchGithubRepos() {
  return retryWithBackoff(() =>
    octokit.rest.repos
      .listForUser({
        username: config.github.user,
        sort: "full_name",
        direction: "asc",
      })
      .then((res) => res.data),
  );
}

export async function fetchGithubReposByName(name: string) {
  return retryWithBackoff(async () => {
    const res = await octokit.rest.repos.get({
      owner: config.github.user,
      repo: name,
    });

    const defaultBranch = res.data.default_branch;
    const readmeUrl = `https://raw.githubusercontent.com/${config.github.user}/${name}/${defaultBranch}/README.md`;

    try {
      const response = await fetch(readmeUrl);
      if (!response.ok) {
        return { data: res.data };
      }
      const readme = await response.text();
      return { data: res.data, readme };
    } catch (ex) {
      return { data: res.data };
    }
  });
}
