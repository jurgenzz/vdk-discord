import "./initDb.ts";
import { Coward } from "./deps.ts";
import { config } from "./config.ts";
import { resolveCommand } from "./commands/index.ts";
import { checkIfSomethingToSend } from "./checkIfSomethingToSend.ts";
import { registerChannels } from "./registerChannels.ts";

export const client = new Coward(config.token);

export const upSince = Date.now();

setInterval(() => {
  checkIfSomethingToSend();
}, 1000);


client.evt.messageCreate.attach(({ message }) => {
  resolveCommand(message);
})

client.evt.guildCreate.attach(({ guild }) => {
    console.log('connected!')
    registerChannels(guild.channels, guild.id)
})

client.connect();
