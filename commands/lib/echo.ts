import { Message } from "../../deps.ts";
export const echo = (ctx: Message) => {
  const { text } = ctx;

  const reply = text.replace(/^!echo ?/, "");

  if (!reply) {
      return;
  }

  ctx.reply(reply);
};
