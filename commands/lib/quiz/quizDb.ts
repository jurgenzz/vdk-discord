import { open, save } from "../../../deps.ts";

export const words = new Map<string, string>([]);

export const scores = new Map<string, number>([]);

export const deleteWord = async (word: string, username: string) => { 

  const definition = words.get(word);
  words.delete(word);

  const db = await open("./tokens.db");

  db.query(`INSERT INTO quizHistory(username, word, definition) VALUES(?,?,?)`, [username, word, definition])

  db.query("DELETE FROM quiz WHERE word=$word", { $word: word });

  save(db);
};

export const addWord = async (word: string, definition: string) => {
  words.set(word, definition);

  const db = await open("./tokens.db");

  db.query(`INSERT INTO quiz(word, definition) VALUES(?,?)`, [word, definition]);

  save(db);
};


export const updateScore = async (username: string, score: number) => {
    scores.set(username, score);

    const db = await open("./tokens.db");
    db.query(`INSERT OR REPLACE INTO awards(username, score) VALUES(?,?)`, [username, score]);
    save(db);
}