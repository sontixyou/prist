function loadGitConfigFile(filePath : string) : string {
  try {
    // 何かしらの処理
    return Deno.readTextFileSync(filePath);
  } catch (e) {
    console.error('Could not find file.');
  }
}

function matchGitConfigText(gitConfigText: string) : any {
  const regex = /https:\/\/github\.com\/(.+)\/(.+)\.git|git@github\.com\:(.+)\/(.+)\.git/;

  const gitInformation = gitConfigText.match(regex)

  if(!gitInformation || (gitInformation[0] === undefined)) return 'could not git information'
  const owner : string = gitInformation[3]!;
  const repository : string = gitInformation[4]!;
  return [owner, repository];
}

import { exec } from 'https://deno.land/x/execute@v1.1.0/mod.ts'

async function fetchGitHubPullRequest(owner: string, repository: string) : Promise<string[]> {
  const today : string = new Date().toISOString().split('T')[0];
  const result :string = await exec(`gh search prs --repo ${owner}/${repository} --created ${today} --author sontixyou --json title,url `)
  return JSON.parse(result)
}

async function generateGithubPullRequestReport(githubPullRequestJsonArray: Promise<string[]>): Promise<string> {
  const pullRequestArray = await githubPullRequestJsonArray;
  const report = pullRequestArray.map(pullRequest => `- [${pullRequest.title}](${pullRequest.url})\n`).join('');
  return report;
}


export { loadGitConfigFile, matchGitConfigText, fetchGitHubPullRequest, generateGithubPullRequestReport };
async function main() {
  const gitConfigText = loadGitConfigFile('./.git/config');
  const gitInfo = matchGitConfigText(gitConfigText);
  const githubPullRequestJsonArray : Array<string> = fetchGitHubPullRequest(gitInfo[0], gitInfo[1]);

  const report : string = await generateGithubPullRequestReport(githubPullRequestJsonArray);

  console.log(report);
}

main();
