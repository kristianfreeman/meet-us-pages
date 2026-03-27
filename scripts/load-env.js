import { existsSync, readFileSync } from 'node:fs';

function stripQuotes(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseEnvFile(content) {
  const result = {};
  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const equalsIndex = line.indexOf('=');
    if (equalsIndex === -1) continue;

    const key = line.slice(0, equalsIndex).trim();
    if (!key) continue;

    const value = line.slice(equalsIndex + 1);
    result[key] = stripQuotes(value);
  }

  return result;
}

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  const parsed = parseEnvFile(readFileSync(path, 'utf8'));

  for (const [key, value] of Object.entries(parsed)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

export function loadEnvFiles() {
  loadEnvFile('.env');
  loadEnvFile('.env.local');
}
