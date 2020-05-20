import { Message } from "../../../deps.ts";
import { words } from "./quizDb.ts";
import { client } from "../../../index.ts";

export const quiz = (msg: Message) => {
  const { content, author, channel } = msg;

  let reply = [...words.values()].map((def, i) => `${i + 1}: ${def}`).join("; ") || `No active quiz at the moment`;

  client.postMessage(channel.id, reply);
};
