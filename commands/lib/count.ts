import { Message } from "../../deps.ts";
import { client } from "../../index.ts";

const rowsRegex = /<tr>\n+.+<td>(<.+?>)?([A-Ž0-9]+|[A-Ž]+ [A-Ž]+)<.+?>+\n+.+<td>([0-9]+)<\/td>/gm;
const tdRegex = /<td>(<.+?>)?([A-Ž0-9]+|[A-Ž]+ [A-Ž]+)<.+?>/gm;
export const count = async (ctx: Message) => {
  const { content, channel } = ctx;

  let query = content.replace(/!count ?/, "");

  if (!query) {
    return;
  }

  query = encodeURIComponent(query);

  const url = `http://www.pmlp.gov.lv/lv/sakums/statistika/personvardu-datu-baze/?id=137&query=${query}`;

  const req = new Request(url);
  const res = await fetch(req);

  const data = await res.text();

  let rows = data.match(rowsRegex);

  const results: string[] = [];

  for (let i = 0; i < 3; i++) {
    const row = rows && rows[i];
    if (!row) {
      return;
    }
    const [nameMatch, countMatch] = row.match(tdRegex) || [];
    const [name] = nameMatch.match(/>[A-Ž]+ [A-Ž]+|>[A-Ž]+/) || [];
    const [count] = countMatch.match(/[0-9]+/) || [];

    const formattedName = name
      .slice(1)
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    results.push(`${formattedName}[${count}]`);
  }

  if (results.length) {
    client.postMessage(
      channel.id,
      `PMPL stāsta, ka Latvijā ir apmēram šādi - ${results.join(
        ", "
      )}. http://vd.jurg.is/n?q=${query}`
    );
  } else {
    client.postMessage(channel.id, `PMLP saka, ka nav ar šādu vārdu neviens.`);
  }
};
