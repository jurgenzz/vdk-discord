import { Message, sendMessage } from "../../deps.ts";

export const ping = (ctx: Message) => {
  sendMessage(ctx.channelID, "pong");
};
