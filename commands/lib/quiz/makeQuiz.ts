import { Message, DMChannel } from "../../../deps.ts";
import { client } from "../../../index.ts";
import { words, addWord } from "./quizDb.ts";

export const makeQuiz = (msg: Message) => {

    const {channel, content, author} = msg;
    
    const isPrivate = channel instanceof DMChannel;


    if (!isPrivate) {
        client.postMessage(channel.id, 'Command available only in private message. Usage - "!quiz.make word:definition')
        return;
    }

    const msgText = content.replace(/!quiz.make /, '');

    const [word, definition] = msgText.split(':');

    if (word && definition) {
        addWord(word.replace(/ /g, ''), definition);
    }

    client.postMessage(channel.id, 'Quiz created!')
};
