import { Message } from "../../../deps.ts";
import { config } from "../../../config.ts";
import { client } from "../../../index.ts";

const cmdCache: Map<string, string> = new Map([]);

export const checkDynamicCommands = async (ctx: Message, cmd: string) => {

    let existingReply = cmdCache.get(cmd)

    if (existingReply) {
        let uiMessage = ctx.content.split(' ').slice(1).join(' ')

        existingReply = existingReply
        .replace(/{urlParam}/, encodeURIComponent(uiMessage))
        .replace(/{param}/, uiMessage)
        .replace(/{nick}/, ctx.author.username);

        client.createMessage(ctx.channel.id, existingReply);
        return;
    }

    const req = new Request(`${config.commandsApi}/api/commands`);

    try {
        const res = await fetch(req);
        const commandsRe = await res.json();
        const commands = JSON.parse(commandsRe);
        if (commands[cmd]) {

            let reply = commands[cmd];
            let uiMessage = ctx.content.split(' ').slice(1).join(' ')

            reply = reply
            .replace(/{urlParam}/, encodeURIComponent(uiMessage))
            .replace(/{param}/, uiMessage)
            .replace(/{nick}/, ctx.author.username);

            client.createMessage(ctx.channel.id, reply);
        }

        Object.keys(commands).forEach(key => {
            cmdCache.set(key, commands[key])
        })
    } catch (err) {
        console.log(err)
    }
};

