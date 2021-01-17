import './initDb.ts';
import { StartBot, Intents } from './deps.ts';
import { config } from './config.ts';
import { resolveCommand } from './commands/index.ts';
import { checkIfSomethingToSend } from './checkIfSomethingToSend.ts';
import { registerChannels } from './registerChannels.ts';

StartBot({
  token: config.token,
  intents: [Intents.GUILD_MESSAGES, Intents.GUILDS, Intents.DIRECT_MESSAGES],
  eventHandlers: {
    ready: () => {
      console.log('Successfully connected to gateway');
    },
    messageCreate: (message) => {
      console.log(message);
      resolveCommand(message);
    },
    guildLoaded: (guild) => {
      registerChannels(guild.channels, guild.id);
    },
  },
});
export const upSince = Date.now();

setInterval(() => {
  checkIfSomethingToSend();
}, 1000);
