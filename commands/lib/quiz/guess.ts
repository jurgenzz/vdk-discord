import { Message, sendMessage } from "../../../deps.ts";
import { words, scores, updateScore, deleteWord } from "./quizDb.ts";


export const guess = (msg: Message) => {
    const {content, author, channelID} = msg;

    const guess = content.replace(/!quiz.guess /, '');

    const isRight = words.get(guess)

    if (isRight) {
        let currentScore = scores.get(author.username) || 0;
        currentScore++;
        
        sendMessage(channelID, `<@${author.id}> (score: ${currentScore}) guessed: "${guess}" - ${isRight}`)
        updateScore(author.username, currentScore)
        deleteWord(guess, author.username);

    } else {
        sendMessage(channelID, 'Whoops, no active quiz has this word as an answer');
    }
}