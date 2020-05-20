export const list = new Map<string, any>();

import { ping } from "./lib/ping.ts";
import { echo } from "./lib/echo.ts";
import { weather } from "./lib/weather.ts";
import { uptime } from "./lib/uptime.ts";
import { coinbase } from "./lib/coinbase.ts";
import { vd } from "./lib/vd/index.ts";
import { count } from "./lib/count.ts";
import { nowPlaying, nowPlayingHere } from "./lib/nowPlaying/index.ts";
import { remind } from "./lib/remind/index.ts";
import { search } from "./lib/search.ts";
import { makeQuiz } from "./lib/quiz/makeQuiz.ts";
import { quiz } from "./lib/quiz/quiz.ts";
import { guess } from "./lib/quiz/guess.ts";
import { score } from "./lib/quiz/score.ts";
import { scoresTop } from "./lib/quiz/scoresTop.ts";
import { quizHelp } from "./lib/quiz/quizHelp.ts";

list.set("!ping", ping);
list.set("!echo", echo);
list.set("!weather", weather);
list.set("!uptime", uptime);
list.set("!coinbase", coinbase);
list.set("!vd", vd);
list.set("!count", count);
list.set("!np", nowPlaying);
list.set("!nph", nowPlayingHere);
list.set("!remind", remind);
list.set("!search", search);
list.set("!quiz.list", quiz);
list.set("!quiz.guess", guess);
list.set("!quiz.make", makeQuiz);
list.set("!quiz.score", score);
list.set("!quiz.top", scoresTop);
list.set("!quiz", quizHelp);

// @todo
// !search
// !spotify
