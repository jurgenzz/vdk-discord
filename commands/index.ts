import { Message } from "../deps.ts";
import { list } from "./list.ts";
import { checkDynamicCommands } from "./lib/dynamicComands/checkDynamicCommands.ts";

export const resolveCommand = async (ctx: Message) => {
  const { content } = ctx;

  const matchCommand = content.match(/^!\w+(\.|-?)\w+/);
  const cmd = matchCommand && matchCommand[0];

  if (!cmd) {
    return;
  }

  const action = list.get(cmd);

  if (action) {
    action(ctx);
  } else {
    await checkDynamicCommands(ctx, cmd);
  }
};
