import { GuildChannel } from "https://deno.land/x/coward/src/structures/GuildChannel.ts";

const npChannels: Map<string, string> = new Map([]);
const generalChannels: Map<string, string> = new Map([])
const quizChannels: Map<string,string> = new Map([])


export const registerChannels = (channels: Map<string, any>, parentId: string) => {

    channels.forEach((channel: GuildChannel) => {

        switch(channel.name) {
            case 'np': {
                npChannels.set(parentId, channel.id);
                break
            }

            case 'general': {
                generalChannels.set(channel.id, channel.id)
                break;
            }

            case 'quiz': {
                quizChannels.set(channel.id, channel.id)
                break;
            }
        }
        
    })
}

export const getNpChannel = (parentId: string) => {
    return npChannels.get(parentId);
}

export const getGeneralChannels = () => {
    return [...generalChannels.values()];
}

export const getQuizChannel = () => {
    return [...quizChannels.values()];
}