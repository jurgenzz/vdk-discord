import { Message } from "../../../deps.ts";
import { formatDate } from "../../../helpers/formatDate.ts";
import { formatDateFromStr } from "../../../helpers/formatDateFromStr.ts";
import { lookupNames } from "./lookupNames.ts";
import { getNameDayByDate } from "./getNameByDate.ts";
import { sendMessage } from "../../../helpers/sendMessage.ts";
import { getGeneralChannels } from "../../../registerChannels.ts";

export const vd = (ctx?: Message) => {
  const { text } = ctx || {};

  const msg = text && text.replace(/^!vd ?/, '')
  let date = formatDate();
  let dateFromMsg;
  if (msg && ctx) {
    dateFromMsg = formatDateFromStr(msg);

    if (typeof dateFromMsg === "object") {
      date = dateFromMsg;
    } else {
      return ctx.reply(lookupNames(msg));
    }
  }

  let reply = getNameDayByDate(date);

  if (!reply) {
      return;
  }
  
  if (ctx) {
      ctx.reply(`${reply}.`);
  } else {
      const generalChannes = getGeneralChannels()
      generalChannes.forEach(channel => {
          sendMessage(channel, `${reply}.`)
      })
  }

};
