function loadGitConfigFile(filePath : string) : string {
  try {
    // 何かしらの処理
    return Deno.readTextFileSync(filePath);
  } catch (e) {
    console.error('Could not find file.');
  }
}

function matchGitConfigText(gitConfigText: string) : RegExpMatchArray | string |null {
  const regex = /https:\/\/github\.com\/(.+)\/(.+)\.git|git@github\.com\:(.+)\/(.+)\.git/;

  const gitInformation = gitConfigText.match(regex)

  if(!gitInformation || (gitInformation[0] === undefined)) return 'could not git information'
  const owner : string = gitInformation[3]!;
  const repository : string = gitInformation[4]!;
  return [owner, repository];
}

export { loadGitConfigFile, matchGitConfigText };
