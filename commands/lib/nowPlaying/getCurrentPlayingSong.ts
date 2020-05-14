import { refreshSpotifyToken } from "./refreshSpotifyToken.ts";

export const getCurrenyPlayingSong = async (
  access_token: string,
  refresh_token: string,
  username: string,
  secondTry?: boolean
): Promise<any> => {
  const req = new Request(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const res = await fetch(req);

  if (res.status === 204) {
    // no content
    return null;
  }

  const json = await res.json();

  if (json && json.error && json.error.message === "The access token expired") {
    if (secondTry) {
      return null;
    }
    let newToken = await refreshSpotifyToken(refresh_token, username);

    // try once again with new token
    let re = await getCurrenyPlayingSong(newToken, refresh_token, username);
    return re;
  }

  return json;
};
