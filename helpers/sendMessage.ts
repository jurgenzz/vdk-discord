import { client } from "../index.ts";

export const sendMessage = async (channel: string, msg: string) => {
  client.postMessage(channel, msg);
};
