import { DB } from './deps.ts';
import { getReminders } from './commands/lib/remind/getReminders.ts';
import { scores, words } from './commands/lib/quiz/quizDb.ts';

export const initDb = async () => {
  const db = new DB('./tokens.db');

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

  db.query(
    `CREATE TABLE IF NOT EXISTS commands (
            id TEXT PRIMARY KEY,
            command TEXT,
            date TEXT,
            createdBy TEXT
        )`
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

  // TODO: run on initial load on prod
  // const req = new Request('http://vd.jurg.is/api/commands');
  // const res = await fetch(req);
  // const commands = await res.json();
  //   Object.entries(JSON.parse(commands)).map(([id, command]) => {
  //     db.query(`INSERT INTO commands (id, command, date, createdBy) VALUES (?,?,?,?)`, [id, `print(${JSON.stringify(command)})`, Date.now(), 'admin']);
  //   });

  const awards = db.query(`SELECT * FROM awards`, {}) || [];

  [...awards].map(([, username, score]: any) => {
    scores.set(username, score);
  });

  const quizes = db.query(`SELECT * FROM quiz`, {}) || [];

  [...quizes].map(([, word, definition]: any) => {
    words.set(word, definition);
  });

  db.close();
};

await initDb();
