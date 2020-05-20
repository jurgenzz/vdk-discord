import { Message } from "../../../deps.ts";
import { words, scores, updateScore, deleteWord } from "./quizDb.ts";
import { client } from "../../../index.ts";


export const guess = (msg: Message) => {
    const {content, author, channel} = msg;

    const guess = content.replace(/!quiz.guess /, '');

    const isRight = words.get(guess)

    if (isRight) {
        let currentScore = scores.get(author.username) || 0;
        currentScore++;
        
        client.postMessage(channel.id, `<@${author.id}> (score: ${currentScore}) guessed: "${guess}" - ${isRight}`)
        updateScore(author.username, currentScore)
        deleteWord(guess, author.username);

    } else {
        client.postMessage(channel.id, 'Whoops, no active quiz has this word as an answer');
    }
}