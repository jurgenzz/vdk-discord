import { Message } from "../../../deps.ts";
import { config } from "../../../config.ts";

const cmdCache: Map<string, string> = new Map([]);

export const checkDynamicCommands = async (ctx: Message, cmd: string) => {

    const exists = cmdCache.get(cmd)
    if (exists) {
        ctx.reply(exists);
        return;
    }

    const req = new Request(`${config.commandsApi}/api/commands`);

    try {
        const res = await fetch(req);
        const commandsRe = await res.json();
        const commands = JSON.parse(commandsRe);
        if (commands[cmd]) {
            ctx.reply(commands[cmd]);
        }

        Object.keys(commands).forEach(key => {
            cmdCache.set(key, commands[key])
        })
    } catch (err) {
        console.log(err)
    }
};
