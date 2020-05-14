const npChannels: Map<string, string> = new Map([]);
const generalChannels: Map<string, string> = new Map([])


export const registerChannels = (channels: { name: string, id: string }[], parentId: string) => {

    channels.forEach(channel => {
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