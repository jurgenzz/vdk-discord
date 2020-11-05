import { Message, sendMessage } from "../../../deps.ts";
import { words, deleteWord } from "./quizDb.ts";


export const gibap = (msg: Message) => {
    const {content, author, channelID} = msg;

    const gibap = content.replace(/!quiz.gibap /, '');

    const isRight = words.get(gibap)

    if (isRight) {
        sendMessage(channelID, `No one guessed <@${author.id}>'s quiz: "${gibap}" - ${isRight}`)
        deleteWord(gibap, author.username);

    } else {
        sendMessage(channelID, 'Whoops, no active quiz has this word as an answer');
    }
}
