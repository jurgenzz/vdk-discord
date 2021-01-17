import { Message, sendMessage } from "../../deps.ts";
import { upSince } from "../../index.ts";
import { humanizeDelta } from "../../helpers/humanizeDelta.ts";

export const uptime = (ctx: Message) => {
  const diff = Date.now() - upSince;

  sendMessage(ctx.channelID, humanizeDelta(diff))
};
