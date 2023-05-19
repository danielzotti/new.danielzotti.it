import { Octokit } from 'octokit';
import { config } from '../../config';

const octokit = new Octokit({
  auth: config.github.token,
});

export async function fetchGithubRepos() {
  const res = await octokit.rest.repos.listForUser({
    username: config.github.user,
    sort: 'full_name',
    direction: 'asc',
  });
  return res.data;
}

export async function fetchGithubReposByName(name: string) {
  const res = await octokit.rest.repos.get({
    owner: config.github.user,
    repo: name,
  });
  return res.data;
}
