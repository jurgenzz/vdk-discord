import { Message, DMChannel } from '../../../deps.ts';
import { client } from '../../../index.ts';
import { addWord } from './quizDb.ts';
import { getQuizChannel } from '../../../registerChannels.ts';

export const makeQuiz = (msg: Message) => {
  const { channel, content, author } = msg;

  const isPrivate = channel instanceof DMChannel;

  if (!isPrivate) {
    client.createMessage(channel.id, 'Command available only in private message. Usage - "!quiz.make word:definition');
    return;
  }

  const msgText = content.replace(/!quiz.make /, '');

  const [word, definition] = msgText.split(':');

  let trimmedWord = word.replace(/(^ )| $/g, '');
  if (trimmedWord && definition) {
    addWord(trimmedWord, definition);
  }

  client.createMessage(channel.id, 'Quiz created!');

  const quizChannels = getQuizChannel();

  quizChannels.forEach((id) => {
    client.createMessage(id, `New quiz added by ${author.username}: "${definition}"!`);
  });
};
