import { Message } from "../../../deps.ts";
import { words } from "./quizDb.ts";
import { client } from "../../../index.ts";

export const quizHelp = (msg: Message) => {
  const { content, author, channel } = msg;

  const reply = "Commands: `!quiz.list`, `!quiz.make word:definition`, `!quiz.guess word`, `!quiz.score`, `!quiz.top`"
  client.postMessage(channel.id, reply);
};
