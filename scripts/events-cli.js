import { readFile } from 'node:fs/promises';
import { loadEnvFiles } from './load-env.js';

loadEnvFiles();

const API_KEY = process.env.MEET_US_API_KEY || process.env.API_KEY;
const API_BASE = (process.env.MEET_US_API_BASE || 'https://meet-us.developers.workers.dev/api/v1').replace(/\/$/, '');

function usage() {
  console.log(`Meet Us Events CLI

Usage:
  node scripts/events-cli.js list
  node scripts/events-cli.js get <eventId>
  node scripts/events-cli.js create --file <event.json>
  node scripts/events-cli.js update <eventId> --file <patch.json>
  node scripts/events-cli.js delete <eventId> --yes
  node scripts/events-cli.js upsert --file <events.json> [--key title] [--dry-run]

Environment:
  MEET_US_API_KEY   Required unless API_KEY is set
  MEET_US_API_BASE  Optional (default: https://meet-us.developers.workers.dev/api/v1)
`);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function parseFlag(args, flagName) {
  const idx = args.indexOf(flagName);
  if (idx === -1) return null;
  if (idx === args.length - 1) fail(`Missing value for ${flagName}`);
  return args[idx + 1];
}

async function readJsonFile(path) {
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw);
}

function getEventsFromPayload(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.events)) {
    return payload.events;
  }

  fail('Invalid upsert payload. Expected an array of events or an object with an events array.');
}

async function api(path, options = {}) {
  if (!API_KEY) {
    fail('Missing API key. Set MEET_US_API_KEY (or API_KEY).');
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  let body;
  try {
    body = await response.json();
  } catch {
    body = { error: await response.text() };
  }

  if (!response.ok) {
    fail(`Request failed (${response.status}): ${JSON.stringify(body, null, 2)}`);
  }

  return body;
}

async function run() {
  const [command, ...args] = process.argv.slice(2);

  if (!command || command === '--help' || command === '-h' || command === 'help') {
    usage();
    return;
  }

  if (command === 'list') {
    const result = await api('/events');
    console.log(JSON.stringify(result.events || [], null, 2));
    return;
  }

  if (command === 'get') {
    const id = args[0];
    if (!id) fail('Missing event ID. Usage: get <eventId>');
    const result = await api(`/events/${id}`);
    console.log(JSON.stringify(result.event || result, null, 2));
    return;
  }

  if (command === 'create') {
    const file = parseFlag(args, '--file');
    if (!file) fail('Missing --file. Usage: create --file <event.json>');
    const payload = await readJsonFile(file);
    const result = await api('/events', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (command === 'update') {
    const id = args[0];
    const file = parseFlag(args.slice(1), '--file');
    if (!id) fail('Missing event ID. Usage: update <eventId> --file <patch.json>');
    if (!file) fail('Missing --file. Usage: update <eventId> --file <patch.json>');
    const payload = await readJsonFile(file);
    const result = await api(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (command === 'delete') {
    const id = args[0];
    const confirmed = args.includes('--yes');
    if (!id) fail('Missing event ID. Usage: delete <eventId> --yes');
    if (!confirmed) fail('Refusing to delete without --yes');
    const result = await api(`/events/${id}`, { method: 'DELETE' });
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (command === 'upsert') {
    const file = parseFlag(args, '--file');
    const key = parseFlag(args, '--key') || 'title';
    const isDryRun = args.includes('--dry-run');

    if (!file) fail('Missing --file. Usage: upsert --file <events.json> [--key title] [--dry-run]');

    const payload = await readJsonFile(file);
    const incomingEvents = getEventsFromPayload(payload);

    if (!incomingEvents.length) {
      console.log('No events in input file. Nothing to do.');
      return;
    }

    const existing = await api('/events');
    const existingEvents = existing.events || [];
    const existingByKey = new Map();

    for (const event of existingEvents) {
      const keyValue = event?.[key];
      if (typeof keyValue === 'string' && keyValue.trim()) {
        existingByKey.set(keyValue, event);
      }
    }

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const event of incomingEvents) {
      const keyValue = event?.[key];
      if (typeof keyValue !== 'string' || !keyValue.trim()) {
        console.log(`SKIP missing key '${key}': ${JSON.stringify(event)}`);
        skipped += 1;
        continue;
      }

      const existingEvent = existingByKey.get(keyValue);

      if (existingEvent) {
        if (isDryRun) {
          console.log(`DRY-RUN update ${key}=${JSON.stringify(keyValue)} id=${existingEvent.id}`);
          updated += 1;
          continue;
        }

        await api(`/events/${existingEvent.id}`, {
          method: 'PUT',
          body: JSON.stringify(event)
        });
        console.log(`UPDATED ${key}=${JSON.stringify(keyValue)} id=${existingEvent.id}`);
        updated += 1;
      } else {
        if (isDryRun) {
          console.log(`DRY-RUN create ${key}=${JSON.stringify(keyValue)}`);
          created += 1;
          continue;
        }

        const result = await api('/events', {
          method: 'POST',
          body: JSON.stringify(event)
        });
        const createdId = result?.event?.id || 'unknown';
        console.log(`CREATED ${key}=${JSON.stringify(keyValue)} id=${createdId}`);
        created += 1;
      }
    }

    console.log(JSON.stringify({ created, updated, skipped, dryRun: isDryRun, key }, null, 2));
    return;
  }

  fail(`Unknown command: ${command}`);
}

run().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
