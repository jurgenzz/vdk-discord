# vdk-discord
[VDK](https://github.com/jurgenzz/vd) port from irc & node => deno & discord

Runs with [deno](https://deno.land)

### Usage
* install [deno](https://deno.land)
* create config.ts

```ts
 export const config = {
  TOKEN: "", // discord api token
  weatherApi: "", // weather api token
  client_id: "", // spotify client id
  client_secret: "", // spotify client secret
  commandsApi: "" // that's where user defined commands live
 }
```

* `deno run --allow-net --allow-read --allow-write index.ts`


### TODOS

- [x] !search
- [x] !spotify
- [x] support for vd.jurg.is
- [ ] migrate vdk-ui inside this project
- [x] 8:00 & 18:00 cron for !vd
- [x] if #np room exists, reply !np to #np, not the channel currently in
- [x] !nph (!now-playing-here) posts !np to current channel
- [ ] rework !remind
- [ ] `!award nick` simple counter++ without possibility to award yourself 
- [x] cache dynamic commands