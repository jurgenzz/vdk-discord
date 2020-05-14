import { Message } from "../../../deps.ts";
import {
  stringToSeconds,
  hypheniphyDate,
  humanizeDelta,
} from "../../../helpers/humanizeDelta.ts";
import { saveReminders } from "./saveReminder.ts";

export const remind = async (ctx: Message) => {
  const { text, author } = ctx;

  // @ts-ignore we need channel_id
  const { channel_id, guild_id } = ctx.data;

  const userId = author.id;

  const [, timeStamp] = text.split(" "); // returns 7d4h, 7d, 1d, 2w,

  const msg = text
    .replace(/^!remind /, "")
    .replace(timeStamp, "")
    .replace(/\s+/, "");

  if (!timeStamp || !msg) {
    return;
  }

  const ms = stringToSeconds(timeStamp);
  const reminderTs = Date.now() + ms * 1000;

  await saveReminders(
    guild_id as string,
    channel_id,
    hypheniphyDate(new Date(reminderTs)),
    `<@${userId}>, a reminder for you - ${msg}`
  );

  const willRemindInTs = reminderTs - Date.now();
  const willRemindInDate = humanizeDelta(willRemindInTs);
  ctx.reply(`Ok <@${userId}>! Will remind you in ${willRemindInDate}! `);
};
