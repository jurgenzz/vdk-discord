import { Message, sendMessage } from '../../deps.ts';
export const echo = (ctx: Message) => {
  const { content, channelID } = ctx;

  const reply = content.replace(/^!echo ?/, '');

  if (!reply) {
    return;
  }

  sendMessage(channelID, reply);
};
