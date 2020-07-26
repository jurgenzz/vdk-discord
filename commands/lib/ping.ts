import { Message } from "../../deps.ts";
import { client } from "../../index.ts";

export const ping = (ctx: Message) => {
  client.createMessage(ctx.channel.id, "pong");
};
