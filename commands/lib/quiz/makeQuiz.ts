import { Message, sendMessage } from '../../../deps.ts';
import { addWord } from './quizDb.ts';
import { getQuizChannel } from '../../../registerChannels.ts';

export const makeQuiz = (msg: Message) => {
  const { channelID, content, author } = msg;

  // TODO not sure how good is this approach
  // we assume if there is no guildID, that must be a private message
  const isPrivate = !msg.guildID

  if (!isPrivate) {
    sendMessage(channelID, 'Command available only in private message. Usage - "!quiz.make word:definition');
    return;
  }

  const msgText = content.replace(/!quiz.make /, '');

  const [word, definition] = msgText.split(':');

  let trimmedWord = word.replace(/(^ )| $/g, '');
  if (trimmedWord && definition) {
    addWord(trimmedWord, definition);
  }

  sendMessage(channelID, 'Quiz created!');

  const quizChannels = getQuizChannel();

  quizChannels.forEach((id) => {
    sendMessage(id, `New quiz added by ${author.username}: "${definition}"!`);
  });
};
