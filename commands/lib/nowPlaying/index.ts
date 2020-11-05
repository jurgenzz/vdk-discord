import { Message, sendMessage } from "../../../deps.ts";
import { getSpotifyTokens } from "./spotifyTokens.ts";
import { getCurrenyPlayingSong } from "./getCurrentPlayingSong.ts";
import { getNpChannel } from "../../../registerChannels.ts";

export const nowPlayingHere = async (ctx: Message) => {
    await nowPlaying(ctx, true)
}

export const nowPlaying = async (ctx: Message, replySameChannel: boolean) => {
    const { author, content, guildID, channelID } = ctx;

    const username = content.replace(/^!np(h ?| ?)/, "") || author.username;


    const newChannelId = !replySameChannel && guildID && getNpChannel(guildID);

    if (!username) {
        return;
    }

    const { access_token, refresh_token } =
        (await getSpotifyTokens(username)) || {};

    if (!access_token || !refresh_token) {
        return;
    }


    
    let res = await getCurrenyPlayingSong(access_token, refresh_token, username);
    
    if (!res) {
        // unknown or not playing anything
        sendMessage(channelID, "Nothing is playin'");
        return;
    }

    if (res.is_playing) {
        // prettier-ignore
        const msg = `🎵 ${username}: ${res.item.artists.map((a: any) => a.name).join(", ")} — ${res.item.name} [${res.item.album.name}] | ${res.item.external_urls.spotify}`

        sendMessage(newChannelId || channelID, msg)
    }
};
