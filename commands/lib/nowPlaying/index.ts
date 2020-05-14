import { Message } from "../../../deps.ts";
import { getSpotifyTokens } from "./spotifyTokens.ts";
import { getCurrenyPlayingSong } from "./getCurrentPlayingSong.ts";
import { getNpChannel } from "../../../registerChannels.ts";
import { sendMessage } from "../../../helpers/sendMessage.ts";

export const nowPlayingHere = async (ctx: Message) => {
    await nowPlaying(ctx, true)
}

export const nowPlaying = async (ctx: Message, replySameChannel: boolean) => {
    const { author, text } = ctx;

    const username = text.replace(/^!np(h ?| ?)/, "") || author.name;

    // @ts-ignore
    const guildId = <string>ctx.data.guild_id

    const channelId = !replySameChannel && getNpChannel(guildId);

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
        ctx.reply("Nothing is playin'");
        return;
    }

    if (res.is_playing) {
        // prettier-ignore
        const msg = `🎵 ${res.item.artists.map((a: any) => a.name).join(", ")} — ${res.item.name} [${res.item.album.name}] | ${res.item.external_urls.spotify}`

        if (channelId) {
            sendMessage(channelId, msg)
        } else {
            ctx.reply(msg);
        }
    }
};
