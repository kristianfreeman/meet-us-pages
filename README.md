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

## Google Sheets sync (Apps Script)

Use `scripts/google-sheets-sync.gs` in your spreadsheet-bound Apps Script project.

1. Open the events spreadsheet -> Extensions -> Apps Script.
2. Paste in `scripts/google-sheets-sync.gs`.
3. Set Script Properties:

```txt
MEET_US_API_KEY=<your API key>
MEET_US_API_BASE=https://meet-us.developers.workers.dev/api/v1
MEET_US_SHEET_NAME=<optional tab name>
MEET_US_DRY_RUN=true
```

4. Run `syncMeetUsEvents()` once to authorize.
5. Turn off dry run (`MEET_US_DRY_RUN=false`) and run again.

The script upserts by `Event Name + Start Date + Region`, normalizes dates to `YYYY-MM-DD`, maps `APJC -> APAC`, and sends payloads to `/api/v1/events`.

Safety defaults:

- New creates are only attempted when the sheet `Status` column is `Confirmed`.
- Synced creates are sent as `status=draft` so they are not shown publicly until published.
- Duplicate rows with the same sync key in a single sheet run are logged as `[REVIEW]` and skipped.
- Rows with `Classification=Internal` are skipped.
- On updates, blank/invalid `Reg Page` values do not overwrite an existing event URL.
