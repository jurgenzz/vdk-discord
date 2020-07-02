import { Message } from "../../../deps.ts";
import { words, deleteWord } from "./quizDb.ts";
import { client } from "../../../index.ts";


export const gibap = (msg: Message) => {
    const {content, author, channel} = msg;

    const gibap = content.replace(/!quiz.gibap /, '');

    const isRight = words.get(gibap)

    if (isRight) {
        client.postMessage(channel.id, `No one guessed <@${author.id}>'s quiz: "${gibap}" - ${isRight}`)
        deleteWord(gibap, author.username);

    } else {
        client.postMessage(channel.id, 'Whoops, no active quiz has this word as an answer');
    }
}
