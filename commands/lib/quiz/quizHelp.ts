import { Message, sendMessage } from "../../../deps.ts";

export const quizHelp = (msg: Message) => {
  const { channelID } = msg;

  const reply = "Commands: `!quiz.list`, `!quiz.make word:definition`, `!quiz.guess word`, `!quiz.gibap word`, `!quiz.score`, `!quiz.top`"
  sendMessage(channelID, reply);
};
