import { DB } from "../../../deps.ts";
import { getReminders } from "./getReminders.ts";

export const removeReminder = async (id: number) => {
  const reminders = getReminders();
  reminders.delete(id);

  const db = new DB("./tokens.db");
  db.query(`DELETE FROM reminders WHERE id=$id`, { $id: id });
  db.close();
};
