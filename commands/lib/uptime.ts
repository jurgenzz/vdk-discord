import { Message } from "../../deps.ts";
import { upSince, client } from "../../index.ts";
import { humanizeDelta } from "../../helpers/humanizeDelta.ts";

export const uptime = (ctx: Message) => {
  const diff = Date.now() - upSince;

  client.createMessage(ctx.channel.id, humanizeDelta(diff))
};
