import {loadGitConfigFile, matchGitConfigText} from "./main.ts";
import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";

Deno.test("loadGitConfigFile is success", () => {
  const result = loadGitConfigFile('./fixtures/git_config.txt');
  const expectFileContent =
`[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
[remote "origin"]
        url = git@github.com:git_owner/git_repogitory.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
        remote = origin
        merge = refs/heads/main
`
  assertEquals(result, expectFileContent);
});

Deno.test("fail load file about loadGitConfigFile", () => {
  assertEquals(loadGitConfigFile('./fixtures/config.txt'), undefined);
});


Deno.test("matchGitConfigText is success", () => {
  assertEquals(matchGitConfigText('git@github.com:git_owner/git_repogitory.git'), ['git_owner', 'git_repogitory'])
  assertEquals(matchGitConfigText('https://github.com/git_owner/git_repogitory.git'), ['git_owner', 'git_repogitory'])
});

Deno.test("matchGitConfigText is failed", () => {
  assertEquals(matchGitConfigText('hoge@hoge.com:git_owner/git_repository'), 'could not git information')
});
