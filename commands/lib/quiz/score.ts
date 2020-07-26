import { client } from "../../../index.ts";
import { Message } from "../../../deps.ts";
import { scores } from "./quizDb.ts";

export const score = (msg: Message) => {
  const { channel, author } = msg;
  client.createMessage(channel.id, `Current score: ${scores.get(author.username) || 0}.`);
};
