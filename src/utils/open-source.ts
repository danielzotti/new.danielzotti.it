import { config } from "src/config";
import {
  openSourceRepos,
  type OpenSourceRepo,
} from "src/generated/open-source-repos";

export type OpenSourceRepoCard = OpenSourceRepo & {
  humanName: string;
};

const openSourceRepoBySlug = new Map(
  openSourceRepos.map((repo) => [repo.slug, repo]),
);

export function getOpenSourceRepoCards(): OpenSourceRepoCard[] {
  return config.github.selectedRepos
    .map((selectedRepo) => {
      const repo = openSourceRepoBySlug.get(selectedRepo.slug);

      if (!repo) {
        return null;
      }

      return {
        ...repo,
        humanName: selectedRepo.humanName ?? repo.name,
      };
    })
    .filter((repo): repo is OpenSourceRepoCard => repo !== null);
}

export function getOpenSourceRepoCard(
  slug: string,
): OpenSourceRepoCard | null {
  const selectedRepo = config.github.selectedRepos.find(
    (repo) => repo.slug === slug,
  );
  if (!selectedRepo) {
    return null;
  }

  const repo = openSourceRepoBySlug.get(slug);
  if (!repo) {
    return null;
  }

  return {
    ...repo,
    humanName: selectedRepo.humanName ?? repo.name,
  };
}
