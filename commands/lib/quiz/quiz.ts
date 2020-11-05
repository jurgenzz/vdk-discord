import { Message, sendMessage } from "../../../deps.ts";
import { words } from "./quizDb.ts";

export const quiz = (msg: Message) => {
  const { content, author, channelID } = msg;

  let reply = [...words.values()].map((def, i) => `${i + 1}: ${def}`).join(";\n") || `No active quiz at the moment`;

  sendMessage(channelID, reply);
};
