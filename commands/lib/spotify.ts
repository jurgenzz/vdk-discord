import { config } from '../../config.ts';
import { Message, sendMessage } from '../../deps.ts';

export const spotify = (ctx: Message) => {
  const { channelID, author } = ctx;

  sendMessage(channelID, `http://${config.host}/auth?q=${author.username}`);
};
