import { Message } from "../../deps.ts";
import { client } from "../../index.ts";

export const ping = (ctx: Message) => {
  client.postMessage(ctx.channel.id, "pong");
};
