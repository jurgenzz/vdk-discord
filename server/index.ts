import { Application } from 'https://deno.land/x/abc@v1/mod.ts';
import { DB } from '../deps.ts';

const decoder = new TextDecoder('utf-8');
const db = new DB('./tokens.db');

const app = new Application();

app.static('/assets', `./web/static/`);

app.get('/', async (ctx) => {
  const html = await Deno.readFile(`${Deno.cwd()}/web/app/index.html`);
  ctx.html(decoder.decode(html));
});

app.get('/commands', async (ctx) => {
  const commands = db.query(`SELECT * FROM commands`, {});

  ctx.json([...commands]);
});

app.post('/commands', async (ctx) => {
  let re = (await ctx.body()) as any;
  const { cmd: id, code: command } = JSON.parse(re);
  const exists = [...db.query(`SELECT id FROM commands WHERE id=$id`, { $id: `!${id}` })][0]

  if (exists) {
    return ctx.json({ ok: false });
  }

  db.query(`INSERT INTO commands (id, command, date, createdBy) VALUES (?,?,?,?)`, [`!${id}`, command, Date.now(), 'admin']);

  ctx.json({ ok: true });
});

app.start({ port: 3000 });
