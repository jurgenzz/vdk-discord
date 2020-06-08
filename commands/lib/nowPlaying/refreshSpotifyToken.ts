import { config } from "../../../config.ts";
import { DB } from "../../../deps.ts";

export const refreshSpotifyToken = async (
  refresh_token: string,
  username: string
) => {
  const params = new URLSearchParams();
  params.set("grant_type", "refresh_token");
  params.set("refresh_token", refresh_token);
  params.set("client_id", config.client_id);
  params.set("client_secret", config.client_secret);

  const req = new Request("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: params.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const res = await fetch(req);
  const data = await res.json();

  if (data && data.access_token) {
    const db = new DB("./tokens.db");

    db.query(
      `
        UPDATE tokens 
        SET access_token = $access_token
        WHERE username=$username`,
      { $access_token: data.access_token, $username: username }
    );

    db.close();
  }

  return data && data.access_token;
};
