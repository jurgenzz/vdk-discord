import { monthNames } from "./consts.ts";

const datePattern = /(\d{1,2})[/-](\d{1,2})/;

export const formatDateFromStr = (msg: string) => {
  const msgIsDate = datePattern.test(msg);
  if (!msgIsDate) {
    return false;
  }

  let [input = "", d1 = "", m1 = ""] = msg.match(datePattern) || [];

  const day = parseInt(d1);
  const month = parseInt(m1);

  const d = (day + "").padStart(2, "0");
  const m = (month + "").padStart(2, "0");
  return {
    short: `${m}-${d}`,
    full: `${day}. ${monthNames[month - 1]}`,
  };
};
