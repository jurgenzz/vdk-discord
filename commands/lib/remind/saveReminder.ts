import { open, save } from "../../../deps.ts";
import { getReminders } from "./getReminders.ts";

export const saveReminders = async (
  guild: string,
  channel: string,
  time: string,
  message: string
) => {
  const db = await open("./tokens.db");

  db.query(
    `INSERT INTO reminders 
    (
      guild, channel, time, message
    ) 
    VALUES 
    (
        ?, ?, ?, ?
    )`,
    [guild, channel, time, message]
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
  });

  save(db);
  db.close();

  return id;
};
