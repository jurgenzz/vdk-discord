import { Message } from '../../../deps.ts';
import { client } from '../../../index.ts';
import { DB } from '../../../deps.ts';

const cmdCache: Map<string, string> = new Map([]);

export const checkDynamicCommands = async (ctx: Message, cmd: string) => {
  let codeToRun = cmdCache.get(cmd);

  if (!codeToRun) {
    const db = new DB('./tokens.db');
    const commands = db.query(`SELECT * FROM commands`, {});

    [...commands].forEach(([c, output]) => {
      if (!cmdCache.get(c)) {
        cmdCache.set(c, output);
      }
      if (c === cmd) {
        codeToRun = output;
      }
    });
  }

  if (!codeToRun) {
    return;
  }
  const content = ctx.content.split(' ').slice(1).join(' ');
  console.log(`${Deno.cwd()}/run.ts`);
  const process = Deno.run({
    cmd: ['deno', 'run', '--allow-net', `${Deno.cwd()}/commands/lib/dynamicComands/run.ts`, codeToRun, content],
    stdout: 'piped',
  });

  const rawOutput = await process.output();
  const decoder = new TextDecoder();

  const output = decoder.decode(rawOutput);

  if (output) {
    client.createMessage(ctx.channel.id, output);
  }
};
