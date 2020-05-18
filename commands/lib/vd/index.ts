import { Message } from "../../../deps.ts";
import { formatDate } from "../../../helpers/formatDate.ts";
import { formatDateFromStr } from "../../../helpers/formatDateFromStr.ts";
import { lookupNames } from "./lookupNames.ts";
import { getNameDayByDate } from "./getNameByDate.ts";
import { sendMessage } from "../../../helpers/sendMessage.ts";
import { getGeneralChannels } from "../../../registerChannels.ts";
import { client } from "../../../index.ts";

export const vd = (ctx?: Message) => {
  const { content } = ctx || {};

  const msg = content && content.replace(/^!vd ?/, "");
  let date = formatDate();
  let dateFromMsg;
  if (msg && ctx) {
    dateFromMsg = formatDateFromStr(msg);

    if (typeof dateFromMsg === "object") {
      date = dateFromMsg;
    } else {
      return client.postMessage(ctx.channel.id, lookupNames(msg));
    }
  }

  let reply = getNameDayByDate(date);

  if (!reply) {
    return;
  }

  if (ctx) {
    client.postMessage(ctx.channel.id, `${reply}.`);
  } else {
    const generalChannes = getGeneralChannels();
    generalChannes.forEach((channel) => {
      sendMessage(channel, `${reply}.`);
    });
  }
};
