import { Application } from 'https://deno.land/x/abc@v1/mod.ts';
import { config } from '../config.ts';
import { storeTokens } from '../commands/lib/nowPlaying/storeTokens.ts';

const app = new Application();

const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=be947c6cf75b4e5c9f043ca9d01d3548&scope=user-read-currently-playing&redirect_uri=http%3A%2F%2F${encodeURIComponent(
  config.host
)}%2Fspotify&state=`;

// console.log(AUTH_URL)
app.get('/auth', async ({ request, response }) => {
  let q = request.url;
  q = q.replace(/.+auth\?q=+/, '');

  if (q) {
    response.headers = new Headers();
    response.headers.set('Location', `${AUTH_URL}${q}`);
    response.status = 302;
  } else {
    response.headers = new Headers();
    response.headers.set('Location', `vd.jurg.is`);
    response.status = 302;
  }
});

app.get('/spotify', async ({ request, response, html }) => {
  let q = request.url.replace(/.+spotify\?code=+/, '').split('&');

  let code = q[0];
  let user = q[1] && q[1].replace('state=', '');

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    state: user,
    redirect_uri: 'http://${config.host}/spotify',
    client_id: config.client_id,
    client_secret: config.client_secret,
  });
  console.log(params);
  const req = new Request('https://accounts.spotify.com/api/token', {
    method: 'post',
    body: params.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  let res = await (await fetch(req)).json();

  const { access_token, refresh_token } = res;

  storeTokens(user, refresh_token, access_token);

  html('use !playing to see what you are playing :)');
});

app.start({ port: 3000 });
