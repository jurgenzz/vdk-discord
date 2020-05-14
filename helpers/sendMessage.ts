import { config } from "../config.ts";
import { DiscordHTTPClient } from "../deps.ts";

export const sendMessage = async (channel: string, msg: string) => {
  let http = new DiscordHTTPClient(config.token);

  await http.request("POST", "/channels/{channel.id}/messages", {
    substitutions: { "{channel.id}": channel },
    type: "json",
    body: {
      content: msg,
      tts: false,
    },
  });
};
