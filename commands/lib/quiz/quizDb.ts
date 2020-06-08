import { DB } from "../../../deps.ts";

export const words = new Map<string, string>([]);

export const scores = new Map<string, number>([]);

export const deleteWord = async (word: string, username: string) => { 

  const definition = words.get(word);
  words.delete(word);

  const db = new DB("./tokens.db");

  db.query(`INSERT INTO quizHistory(username, word, definition) VALUES(?,?,?)`, [username, word, definition])

  db.query("DELETE FROM quiz WHERE word=$word", { $word: word });

};

export const addWord = async (word: string, definition: string) => {
  words.set(word, definition);

  const db = new DB("./tokens.db");

  db.query(`INSERT INTO quiz(word, definition) VALUES(?,?)`, [word, definition]);

};


export const updateScore = async (username: string, score: number) => {
    scores.set(username, score);

    const db = new DB("./tokens.db");
    db.query(`
        INSERT OR REPLACE INTO 
            awards(id, username, score) 
        VALUES(
            (SELECT id FROM 
                    awards 
                WHERE 
                    username = '${username}'
            ),
            '${username}',
            '${score}')`,
        );
}