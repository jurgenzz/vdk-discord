import { Message } from '../../deps.ts';
import { client } from '../../index.ts';
export const echo = (ctx: Message) => {
  const { content, channel } = ctx;

  const reply = content.replace(/^!echo ?/, '');

  if (!reply) {
    return;
  }

  client.createMessage(channel.id, reply);
};
