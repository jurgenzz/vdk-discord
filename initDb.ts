import { open, save } from "./deps.ts";
import { getReminders } from "./commands/lib/remind/getReminders.ts";

export const initDb = async () => {
    const db = await open("./tokens.db");

    db.query(
        `
        CREATE TABLE IF NOT EXISTS reminders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            guild TEXT,
            channel TEXT,
            time TEXT,
            message TEXT
        )
    `,
        []
    );

    db.query(
        `CREATE TABLE IF NOT EXISTS tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            access_token TEXT,
            refresh_token TEXT
        )`,
        []
    );

    const rows = db.query(`SELECT * FROM reminders`, {}) || [];
    [...rows].map(([id, guild, channel, time, message]: any) => {
        const reminders = getReminders();
        reminders.set(id, {
            guild,
            channel,
            time,
            message,
            id,
        });
    });

    save(db);
    db.close();
};

await initDb();
