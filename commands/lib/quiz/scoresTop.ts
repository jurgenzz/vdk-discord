import { Message, sendMessage } from '../../../deps.ts';
import { scores } from './quizDb.ts';

export const scoresTop = (msg: Message) => {
  const { channelID } = msg;
  let allScores: [string, number][] = [];

  scores.forEach((value, user) => {
    allScores.push([user, value]);
  });

  allScores = allScores.sort((a, b) => b[1] - a[1]).slice(0, 5);
  sendMessage(channelID, `${allScores.map((item) => item.join(': ')).join(', ')}`);
};
