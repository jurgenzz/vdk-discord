import { open, save } from "../../../deps.ts";
import { getReminders } from "./getReminders.ts";

export const removeReminder = async (id: number) => {
  const reminders = getReminders();
  reminders.delete(id);

  const db = await open("./tokens.db");
  db.query(`DELETE FROM reminders WHERE id=$id`, { $id: id });
  save(db);
  db.close();
};
