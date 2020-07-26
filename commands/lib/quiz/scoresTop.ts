import { client } from '../../../index.ts';
import { Message } from '../../../deps.ts';
import { scores } from './quizDb.ts';

export const scoresTop = (msg: Message) => {
  const { channel, author } = msg;
  let allScores: [string, number][] = [];

  scores.forEach((value, user) => {
    allScores.push([user, value]);
  });

  allScores = allScores.sort((a, b) => b[1] - a[1]).slice(0, 5);
  client.createMessage(channel.id, `${allScores.map((item) => item.join(': ')).join(', ')}`);
};
