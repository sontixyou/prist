function loadGitConfigFile(filePath : string) : string {
  try {
    // 何かしらの処理
    return Deno.readTextFileSync(filePath);
  } catch (e) {
    console.error('Could not find file.');
  }
}

export { loadGitConfigFile };
