import { nd } from "../../../data/nd.ts";
import { nde } from "../../../data/nde.ts";
import { formatDateFromStr } from "../../../helpers/formatDateFromStr.ts";

export const lookupNames = (msg: string) => {
  let name = msg.toLowerCase();
  let nameFormatted = name;
  let d;
  Object.keys(nd).map((k) => {
    let found = nd[k].filter((n: string) => n.toLowerCase() === name);
    if (found && found[0]) {
      d = k.split("-").reverse().join("-");
      nameFormatted = found[0];
    }
  });

  if (!d) {
    Object.keys(nde).map((k) => {
      let found = nde[k].filter((n: string) => n.toLowerCase() === name);
      if (found && found[0]) {
        d = k.split("-").reverse().join("-");
        nameFormatted = found[0];
      }
    });
  }
  if (!d) {
    return `${msg} nesvin.`;
  }

  let date = formatDateFromStr(d);

  return `${nameFormatted} vārda dienu svin ${(date && date.full) || d}.`;
};
