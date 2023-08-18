import {loadGitConfigFile} from "./main.ts";
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

Deno.test("fail load file", () => {
  assertEquals(loadGitConfigFile('./fixtures/config.txt'), undefined);
});
