import { Message, sendMessage } from "../../../deps.ts";
import { config } from "../../../config.ts";

let cmdCache: Map<string, string> = new Map([]);
let needsUpdate = true;

export const checkDynamicCommands = async (ctx: Message, cmd: string) => {

    let existingReply = cmdCache.get(cmd)
    if (existingReply) {
        let uiMessage = ctx.content.split(' ').slice(1).join(' ')

        existingReply = existingReply
        .replace(/{urlParam}/, encodeURIComponent(uiMessage))
        .replace(/{param}/, uiMessage)
        .replace(/{nick}/, ctx.author.username);

        sendMessage(ctx.channelID, existingReply);
        return;
    }


    if (needsUpdate) {
        await updateCommands()
        let updated = cmdCache.get(cmd)
        if (updated) {
            let reply = updated;
            let uiMessage = ctx.content.split(' ').slice(1).join(' ')

            reply = reply
            .replace(/{urlParam}/, encodeURIComponent(uiMessage))
            .replace(/{param}/, uiMessage)
            .replace(/{nick}/, ctx.author.username);

            sendMessage(ctx.channelID, reply);
        }
    }
};

export const clearCache = async (ctx: Message, cmd: string) => {
    cmdCache = new Map([])
    needsUpdate = true

    if (!ctx.guildID) {
        sendMessage(ctx.channelID, 'Cache cleared')
    }
}

export const updateCommands = async () => {
    const req = new Request(`${config.commandsApi}/api/commands`);

    try {
        const res = await fetch(req);
        const commandsRe = await res.json();
        const commands = JSON.parse(commandsRe);
       

        Object.keys(commands).forEach(key => {
            cmdCache.set(key, commands[key])
        })

        needsUpdate = false
    } catch (err) {
        console.log(err)
    }
}