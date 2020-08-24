import { Message } from "../../../deps.ts";
import {
  stringToSeconds,
  hypheniphyDate,
  humanizeDelta,
} from "../../../helpers/humanizeDelta.ts";
import { saveReminders } from "./saveReminder.ts";
import { client } from "../../../index.ts";
import { getReminders } from "./getReminders.ts";

export const remind = async (ctx: Message) => {
  const { content, author } = ctx;

  const hasContent = content.replace(/^!remind ?/, '').replace(/s+/, '');
  
  if (!hasContent) {
    const reminders: string[] = [];

    getReminders().forEach((item) => {
      reminders.push(`* ${item.text} - ${humanizeDelta(item.ts - Date.now())}`)
    })
    
    client.createMessage(ctx.channel.id, reminders.join('\n'))
  }

  const { id } = ctx.channel;

  const guild_id = client.channelGuildIDs.get(id);

  const userId = author.id;

  const [, timeStamp] = content.split(" "); // returns 7d4h, 7d, 1d, 2w,

  const msg = content
    .replace(/^!remind /, "")
    .replace(timeStamp, "")
    .replace(/\s+/, "");

  if (!timeStamp || !msg) {
    return;
  }

  const seconds = stringToSeconds(timeStamp);
  const reminderTs = Date.now() + seconds * 1000;

  await saveReminders(
    guild_id as string,
    id,
    hypheniphyDate(new Date(reminderTs)),
    `<@${userId}>, a reminder for you - ${msg}`,
    msg,
    reminderTs
  );

  const willRemindInTs = reminderTs - Date.now();
  const willRemindInDate = humanizeDelta(willRemindInTs);
  client.createMessage(ctx.channel.id, `Ok <@${userId}>! Will remind you in ${willRemindInDate}! `);
};
