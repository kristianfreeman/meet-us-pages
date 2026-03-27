# Meet Us Pages

```txt
npm install
npm run dev
```

```txt
npm run deploy
```

## Event automation API

The app exposes API-key protected event/resource endpoints under `/api/v1/*`.

- Events: `GET/POST /api/v1/events`, `GET/PUT/DELETE /api/v1/events/:id`
- Resources: `GET/POST /api/v1/resources`, `GET/PUT/DELETE /api/v1/resources/:id`
- Auth: `Authorization: Bearer <API_KEY>`

Set the key with Wrangler secrets:

```txt
wrangler secret put API_KEY
```

## Local CLI for events

Use the local CLI wrapper around the API:

```txt
# optional: cp .env.example .env
export MEET_US_API_KEY="<your key>"
npm run events:cli -- list
```

The CLI and root automation scripts auto-load `.env` and `.env.local`.

Examples:

```txt
npm run events:cli -- get <eventId>
npm run events:cli -- create --file ./event.json
npm run events:cli -- update <eventId> --file ./patch.json
npm run events:cli -- delete <eventId> --yes
npm run events:cli -- upsert --file ./events.json --key title
npm run events:cli -- upsert --file ./events.json --key title --dry-run
```

Optional target override:

```txt
export MEET_US_API_BASE="http://127.0.0.1:8788/api/v1"
```

Never hardcode API keys in repo files.
