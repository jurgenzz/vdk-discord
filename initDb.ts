import { DB } from "./deps.ts";
import { getReminders } from "./commands/lib/remind/getReminders.ts";
import { scores, words } from "./commands/lib/quiz/quizDb.ts";

export const initDb = async () => {
    const db = new DB("./tokens.db");

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

    db.query(
        `CREATE TABLE IF NOT EXISTS awards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            score INTEGER
        )`,
        []
    );

    db.query(
        `CREATE TABLE IF NOT EXISTS quiz (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT,
            definition TEXT
        )`,
        []
    );

    db.query(
        `CREATE TABLE IF NOT EXISTS quizHistory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT,
            definition TEXT,
            username TEXT
        )`,
        []
    );

    const reminders = db.query(`SELECT * FROM reminders`, {}) || [];
    [...reminders].map(([id, guild, channel, time, message]: any) => {
        const remindersMap = getReminders();
        remindersMap.set(id, {
            guild,
            channel,
            time,
            message,
            id,
        });
    });

    const awards = db.query(`SELECT * FROM awards`, {}) || [];

    [...awards].map(([, username, score]: any) => {
        scores.set(username, score);
    })

    const quizes = db.query(`SELECT * FROM quiz`, {}) || [];

    [...quizes].map(([, word, definition]: any) => {
        words.set(word, definition);
    })

    db.close();
};

await initDb();
