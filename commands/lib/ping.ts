import { Message } from "../../deps.ts";

export const ping = (ctx: Message) => {
  ctx.reply("pong");
};
