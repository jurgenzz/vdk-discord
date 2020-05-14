import { Message } from "../../deps.ts";
import { upSince } from "../../index.ts";
import { humanizeDelta } from "../../helpers/humanizeDelta.ts";

export const uptime = (ctx: Message) => {
  const diff = Date.now() - upSince;

  ctx.reply(humanizeDelta(diff));
};
