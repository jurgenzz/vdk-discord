import { Message } from "../../../deps.ts";
import { client } from "../../../index.ts";
import { words, addWord } from "./quizDb.ts";

export const makeQuiz = (msg: Message) => {

    const {channel, content, author} = msg;
    
    const isPrivate = !channel;

    if (!isPrivate) {
        client.postMessage(channel.id, 'Command available only in private message. Usage - "!quiz.make word:definition')
    }

    const msgText = content.replace(/!quiz.make /, '');

    const [word, definition] = msgText.split(':');

    if (word && definition) {
        addWord(word.replace(/ /g, ''), definition);
    }

    //todo: reply to pm

};
