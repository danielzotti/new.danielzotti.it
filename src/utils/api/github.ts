import { Octokit } from 'octokit';
import { config } from '../../config';

const octokit = new Octokit({
  auth: config.github.token
});

export async function fetchGithubRepos() {
  const res = await octokit.rest.repos.listForUser({
    username: config.github.user,
    sort: 'full_name',
    direction: 'asc'
  });
  return res.data;
}

export async function fetchGithubReposByName(name: string) {
  const res = await octokit.rest.repos.get({
    owner: config.github.user,
    repo: name
  });

  const defaultBranch = res.data.default_branch;
  const readmeUrl = `https://raw.githubusercontent.com/${config.github.user}/${name}/${defaultBranch}/README.md`;

  try {
    const response = await fetch(readmeUrl);
    const readme = await response.text();
    return { data: res.data, readme };
  } catch (ex) {
    return { data: res.data };
  }

}
