
import { Message, sendMessage } from "../../../deps.ts";
import { scores } from "./quizDb.ts";

export const score = (msg: Message) => {
  const { channelID, author } = msg;
  sendMessage(channelID, `Current score: ${scores.get(author.username) || 0}.`);
};
