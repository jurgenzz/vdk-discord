import "./initDb.ts";
import { createClient } from "./deps.ts";
import { config } from "./config.ts";
import { resolveCommand } from "./commands/index.ts";
import { checkIfSomethingToSend } from "./checkIfSomethingToSend.ts";
import { registerChannels } from "./registerChannels.ts";

const client = await createClient(config.token);

console.log(client);

export const upSince = Date.now();

setInterval(() => {
  checkIfSomethingToSend();
}, 1000);

for await (const ctx of client) {
  if (ctx.event === "GUILD_CREATE") {
      // @ts-ignore
      registerChannels(ctx.data.channels, ctx.id);
  }
  if (ctx.event === "MESSAGE_CREATE") {
    //@ts-ignore
    const channelId = ctx.data.channel_id;
    if (channelId !== "639373043017187351") {
      resolveCommand(ctx);
    }
  }
}
