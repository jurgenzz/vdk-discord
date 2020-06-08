import { DB } from "../../../deps.ts";

export const getSpotifyTokens = async (
  username: string
): Promise<{ access_token: string; refresh_token: string } | null> => {
  const db = new DB("./tokens.db");

  const [user] = db.query(
    `SELECT access_token, refresh_token FROM tokens WHERE username=$username`,
    {
      $username: username,
    }
  );

  db.close();
  
  if (!user) {
    return null;
  }

  const [access_token, refresh_token] = user;

  return {
    access_token,
    refresh_token,
  };
};
