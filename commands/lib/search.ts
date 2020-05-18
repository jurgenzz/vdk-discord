import { Message } from "../../deps.ts";
import { client } from "../../index.ts";

export const search = (ctx: Message) => {
  const { content, channel } = ctx;

  let query = content.replace(/!search ?/, "");

  client.postMessage(channel.id,
    `https://developers.lv/?search${
      query ? `&text=${encodeURIComponent(query)}` : ""
    }`
  );
};
