import { DB } from "../../../deps.ts";
import { getReminders } from "./getReminders.ts";

export const saveReminders = async (
  guild: string,
  channel: string,
  time: string,
  message: string,
  text: string,
  ts: number
) => {
  const db = new DB("./tokens.db");

  db.query(
    `INSERT INTO reminders 
    (
      guild, channel, time, message, text, ts
    ) 
    VALUES 
    (
        ?, ?, ?, ?, ?, ?
    )`,
    [guild, channel, time, message, text, ts]
  );

  // get last id

  const [lastRow = []] = db.query(
    `SELECT * FROM reminders ORDER BY id DESC LIMIT 1`,
    []
  );

  const id = lastRow[0];
  const reminders = getReminders();
  reminders.set(id, {
    guild,
    channel,
    time,
    message,
    id,
    text,
    ts
  });

  db.close();

  return id;
};
