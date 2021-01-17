import { DB } from '../../../deps.ts';

export const storeTokens = (username: string, refresh_token: string, access_token: string) => {
  //
  const db = new DB('./tokens.db');

  const [user] = db.query(`SELECT * FROM tokens WHERE username=$username`, {
    $username: username,
  });
  if (user) {
    db.query(
      `
          UPDATE tokens 
          SET 
            access_token = $access_token, 
            refresh_token = $refresh_token
          WHERE username=$username`,
      { $access_token: access_token, $username: username, $refresh_token: refresh_token }
    );
  } else {
    db.query(
      `
          INSERT INTO tokens(username, refresh_token, access_token) VALUES(?,?,?)
          `,
      [username, refresh_token, access_token]
    );
  }
  db.close();
};
