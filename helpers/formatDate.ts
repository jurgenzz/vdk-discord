import { monthNames } from "./consts.ts";

export const formatDate = (date: Date = new Date()) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  const d = (day + "").padStart(2, "0");
  const m = (month + "").padStart(2, "0");

  return {
    short: `${m}-${d}`,
    full: `${day}. ${monthNames[month - 1]}`,
  };
};
