import { GuildChannel } from "https://deno.land/x/coward/src/classes/GuildChannel.ts";

const npChannels: Map<string, string> = new Map([]);
const generalChannels: Map<string, string> = new Map([])


export const registerChannels = (channels: Map<string, any>, parentId: string) => {

    channels.forEach((channel: GuildChannel) => {
        if (channel.name === 'np') {
            npChannels.set(parentId, channel.id);
        }

        if (channel.name === 'general') {
            generalChannels.set(channel.id, channel.id)
        }
    })
}

export const getNpChannel = (parentId: string) => {
    return npChannels.get(parentId);
}

export const getGeneralChannels = () => {
    return [...generalChannels.values()];
}