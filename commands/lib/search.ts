import { Message, sendMessage } from "../../deps.ts";


export const search = (ctx: Message) => {
  const { content, channelID } = ctx;

  let query = content.replace(/!search ?/, "");

  sendMessage(channelID,
    `https://developers.lv/?search${
      query ? `&text=${encodeURIComponent(query)}` : ""
    }`
  );
};
