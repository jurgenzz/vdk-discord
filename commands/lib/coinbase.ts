import { Message, sendMessage } from "../../deps.ts";

export const coinbase = async (ctx: Message) => {
  const { content, channelID } = ctx;

  const msg = content.replace(/^!coinbase ?/, "");

  if (!msg) {
    return;
  }

  const [f, t] = msg.split("/");

  if (f && t) {
    const from = f.toUpperCase();
    const to = t.toUpperCase();

    const url = `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}&e=Coinbase`;

    const req = new Request(url);
    const res = await fetch(req);
    const data = await res.json();

    if (data.Response !== "Error") {
      let reply = Object.keys(data)
        .map((key) => `${from}/${key}: ${data[key]}`)
        .join(", ");
      sendMessage(channelID, reply);
    } else if (data.Response === "Error" && data.Message) {
      sendMessage(channelID, data.Message);
    }
  }
};
