import { Message } from "../../deps.ts";

export const search = (ctx: Message) => {
  const { text } = ctx;

  let query = text.replace(/!search ?/, "");

  ctx.reply(
    `https://developers.lv/?search${
      query ? `&text=${encodeURIComponent(query)}` : ""
    }`
  );
};
