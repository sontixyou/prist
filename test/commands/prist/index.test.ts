import {expect, test} from '@oclif/test'

describe('hello', () => {
  test
  .stdout()
  .command(['prist'])
  .it('runs hello cmd', ctx => {
    expect(ctx.stdout).to.contain('hello friend from oclif!')
  })
})
