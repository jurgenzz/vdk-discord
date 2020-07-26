import { Message } from "../../deps.ts";
import { config } from "../../config.ts";
import { client } from "../../index.ts";

let reqInProgress = false;

export const weather = async (ctx: Message) => {
  if (reqInProgress) {
    return;
  }

  setTimeout(() => {
    reqInProgress = false;
  }, 5000);

  const { content, channel } = ctx;
  const msgArr = content.split(" ");
  const city = msgArr[1];

  if (!city) {
    return;
  }
  const request = new Request(
    `http://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${config.weatherApi}`
  );

  const response = await fetch(request);

  if (!response) {
    return;
  }
  const data = await response.json();


  if (!data || !data.list || !data.list[0]) {
    return;
  }

  const weatherInfo = data.list[0];
  const weatherDescription = data.list[0].weather[0];
  const reply = `Weather in ${city}: ${weatherDescription.description}, Temperature: ${weatherInfo.main.temp}℃, wind: ${weatherInfo.wind.speed} m/s.`;
  client.createMessage(channel.id, reply)
};
