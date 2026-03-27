/**
 * Google Apps Script: sync a planning sheet into meet-us-pages events API.
 *
 * Script properties:
 * - MEET_US_API_KEY (required)
 * - MEET_US_API_BASE (optional, default: https://meet-us.developers.workers.dev/api/v1)
 * - MEET_US_SHEET_NAME (optional, default: active sheet)
 * - MEET_US_DRY_RUN (optional: "true" to log only)
 */

function syncMeetUsEvents() {
  const config = getConfig_();
  const sheet = getTargetSheet_(config.sheetName);
  const rows = readSheetRows_(sheet);

  if (!rows.length) {
    Logger.log("No data rows found. Nothing to sync.");
    return;
  }

  const incomingEvents = rows
    .map((row, idx) => mapSheetRowToEvent_(row, idx + 2, sheet))
    .filter(Boolean);

  if (!incomingEvents.length) {
    Logger.log("No valid events found after mapping. Nothing to sync.");
    return;
  }

  const existingEvents = fetchExistingEvents_(config);
  const existingByKey = {};

  for (let i = 0; i < existingEvents.length; i += 1) {
    const event = existingEvents[i];
    const key = eventKey_(event.title, event.date, event.region || null);
    if (key) {
      existingByKey[key] = event;
    }
  }

  const seenIncomingKeys = {};

  let created = 0;
  let updated = 0;
  let unchanged = 0;
  let skipped = 0;
  let review = 0;

  for (let i = 0; i < incomingEvents.length; i += 1) {
    const incoming = incomingEvents[i];
    const event = incoming.event;
    const sourceStatus = incoming.sourceStatus;
    const key = eventKey_(event.title, event.date, event.region || null);
    if (!key) {
      skipped += 1;
      continue;
    }

    if (seenIncomingKeys[key]) {
      Logger.log("Skipping row due to duplicate key in sheet: %s", key);
      review += 1;
      continue;
    }
    seenIncomingKeys[key] = true;

    const existing = existingByKey[key];

    if (!existing) {
      if (sourceStatus !== "confirmed") {
        Logger.log("[REVIEW] CREATE blocked because sheet status is not Confirmed: %s sourceStatus=%s", key, sourceStatus || "(empty)");
        review += 1;
        continue;
      }

      if (config.dryRun) {
        Logger.log("[DRY RUN] CREATE %s", key);
      } else {
        requestJson_(config, "POST", "/events", event);
      }
      created += 1;
      continue;
    }

    const hasChanges = hasEventChanges_(existing, event);
    if (!hasChanges) {
      unchanged += 1;
      continue;
    }

    if (config.dryRun) {
      Logger.log("[DRY RUN] UPDATE %s id=%s", key, existing.id);
    } else {
      requestJson_(config, "PUT", "/events/" + encodeURIComponent(existing.id), buildUpdatePayload_(event, existing));
    }
    updated += 1;
  }

  Logger.log("Sync complete. created=%s updated=%s unchanged=%s skipped=%s review=%s dryRun=%s", created, updated, unchanged, skipped, review, config.dryRun);
}

function getConfig_() {
  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty("MEET_US_API_KEY");

  if (!apiKey) {
    throw new Error("Missing MEET_US_API_KEY script property.");
  }

  const apiBaseRaw = props.getProperty("MEET_US_API_BASE") || "https://meet-us.developers.workers.dev/api/v1";
  const apiBase = apiBaseRaw.replace(/\/+$/, "");
  const sheetName = props.getProperty("MEET_US_SHEET_NAME") || "";
  const dryRun = (props.getProperty("MEET_US_DRY_RUN") || "").toLowerCase() === "true";

  return {
    apiKey: apiKey,
    apiBase: apiBase,
    sheetName: sheetName,
    dryRun: dryRun,
  };
}

function getTargetSheet_(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = sheetName ? spreadsheet.getSheetByName(sheetName) : spreadsheet.getActiveSheet();

  if (!sheet) {
    throw new Error("Target sheet not found: " + sheetName);
  }

  return sheet;
}

function readSheetRows_(sheet) {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow < 2 || lastColumn < 1) {
    return [];
  }

  const headerValues = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const dataValues = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();
  const headers = headerValues.map(function (h) {
    return String(h || "").trim();
  });

  return dataValues.map(function (rowValues) {
    const row = {};
    for (let i = 0; i < headers.length; i += 1) {
      const header = headers[i];
      if (!header) continue;
      row[header] = rowValues[i];
    }
    return row;
  });
}

function mapSheetRowToEvent_(row, rowNumber, sheet) {
  const title = cleanString_(row["Event Name"]);
  const date = toIsoDate_(row["Start Date"], sheet);
  const sourceStatus = normalizeSheetStatus_(row["Status"]);
  const classification = cleanString_(row["Classification"]);

  if (!title || !date) {
    Logger.log("Skipping row " + rowNumber + ": missing Event Name or Start Date");
    return null;
  }

  if (classification && classification.toLowerCase() === "internal") {
    Logger.log("[REVIEW] Skipping row " + rowNumber + ": internal classification");
    return null;
  }

  const endDate = toIsoDate_(row["End Date"], sheet);
  const region = normalizeRegion_(row["Region"]);
  const location = cleanString_(row["Location"]);
  const url = cleanUrl_(row["Reg Page"]);
  const type = cleanString_(row["Classification"]);
  const tags = buildTags_(row);
  const description = buildDescription_(row);
  const virtual = inferVirtual_(row, region, location);
  const featured = normalizePriority_(row["Priority Level"]);

  return {
    sourceStatus: sourceStatus,
    event: {
      title: title,
      description: description,
      date: date,
      endDate: endDate,
      location: location,
      region: region,
      url: url,
      type: type,
      tags: tags,
      status: "draft",
      featured: featured,
      virtual: virtual,
    },
  };
}

function normalizeSheetStatus_(value) {
  const raw = cleanString_(value);
  if (!raw) return null;
  return raw.toLowerCase();
}

function normalizeRegion_(value) {
  const raw = cleanString_(value);
  if (!raw) return null;

  const upper = raw.toUpperCase();
  if (upper === "APJC") return "APAC";
  if (upper === "APAC") return "APAC";
  if (upper === "EMEA") return "EMEA";
  if (upper === "NAMER" || upper === "NORTH AMERICA") return "NAMER";
  if (upper === "LATAM") return "LATAM";
  if (upper === "VIRTUAL" || upper === "ONLINE" || upper === "GLOBAL") return "VIRTUAL";

  return null;
}

function cleanUrl_(value) {
  const raw = cleanString_(value);
  if (!raw || raw.toLowerCase() === "n/a") return null;
  if (!/^https?:\/\//i.test(raw)) return null;
  return raw;
}

function cleanString_(value) {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  return str ? str : null;
}

function toIsoDate_(value, sheet) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const timezone = sheet.getParent().getSpreadsheetTimeZone() || Session.getScriptTimeZone() || "Etc/UTC";
  let dateObj = null;

  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime())) {
    dateObj = value;
  } else {
    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) {
      dateObj = parsed;
    }
  }

  if (!dateObj) {
    return null;
  }

  return Utilities.formatDate(dateObj, timezone, "yyyy-MM-dd");
}

function buildTags_(row) {
  const candidates = [
    cleanString_(row["Quarter"]),
    cleanString_(row["Status"]),
    cleanString_(row["Executing Team"]),
    cleanString_(row["TM Community"]),
    cleanString_(row["Pipe v. Awareness"]),
    cleanString_(row["Priority Level"]),
  ].filter(Boolean);

  if (!candidates.length) {
    return null;
  }

  const deduped = [];
  const seen = {};
  for (let i = 0; i < candidates.length; i += 1) {
    const candidate = candidates[i];
    const key = candidate.toLowerCase();
    if (seen[key]) continue;
    seen[key] = true;
    deduped.push(candidate);
  }

  const joined = deduped.join(", ");
  return joined.length <= 500 ? joined : joined.slice(0, 500);
}

function buildDescription_(row) {
  const lines = [];

  const note = cleanString_(row["Notes"]);
  if (note) {
    lines.push(note);
  }

  addLabelLine_(lines, "Owner", row["Owner"]);
  addLabelLine_(lines, "Status", row["Status"]);
  addLabelLine_(lines, "Executing Team", row["Executing Team"]);
  addLabelLine_(lines, "TM Community", row["TM Community"]);
  addLabelLine_(lines, "Focus", row["Pipe v. Awareness"]);
  addLabelLine_(lines, "On Site Staff", row["On Site Staff"]);
  addLabelLine_(lines, "Speakers", row["Speaker"]);
  addLabelLine_(lines, "Partner/Customer", row["Partner/Customer"]);
  addLabelLine_(lines, "Next Steps", row["Next Steps"]);
  addLabelLine_(lines, "Planning Doc", row["Planning Doc"]);

  if (!lines.length) {
    return null;
  }

  const body = lines.join("\n");
  return body.length <= 5000 ? body : body.slice(0, 5000);
}

function addLabelLine_(lines, label, value) {
  const cleaned = cleanString_(value);
  if (!cleaned) return;
  lines.push(label + ": " + cleaned);
}

function inferVirtual_(row, region, location) {
  const regionIsVirtual = region === "VIRTUAL";
  const inOfficeRaw = cleanString_(row["In Office"]);
  const inOffice = inOfficeRaw ? inOfficeRaw.toLowerCase() === "yes" : null;
  const locationRaw = location ? location.toLowerCase() : "";
  const locationVirtual = locationRaw.indexOf("virtual") !== -1 || locationRaw.indexOf("online") !== -1;

  if (regionIsVirtual) return true;
  if (locationVirtual) return true;
  if (inOffice === false) return true;
  return false;
}

function normalizePriority_(value) {
  const raw = cleanString_(value);
  if (!raw) return false;

  const normalized = raw.toLowerCase();
  return normalized === "high" || normalized === "p0" || normalized === "p1";
}

function eventKey_(title, date, region) {
  if (!title || !date) {
    return null;
  }

  return [title.trim().toLowerCase(), date, (region || "").trim().toUpperCase()].join("|");
}

function hasEventChanges_(existing, incoming) {
  const fields = [
    "title",
    "description",
    "date",
    "endDate",
    "location",
    "region",
    "url",
    "type",
    "tags",
    "featured",
    "virtual",
  ];

  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    if (field === "url" && !incoming.url) {
      continue;
    }
    if (normalizeComparable_(existing[field]) !== normalizeComparable_(incoming[field])) {
      return true;
    }
  }

  return false;
}

function buildUpdatePayload_(event, existing) {
  const payload = {
    title: event.title,
    description: event.description,
    date: event.date,
    endDate: event.endDate,
    location: event.location,
    region: event.region,
    type: event.type,
    tags: event.tags,
    featured: event.featured,
    virtual: event.virtual,
  };

  if (event.url) {
    payload.url = event.url;
  } else if (!existing || !existing.url) {
    payload.url = null;
  }

  return payload;
}

function normalizeComparable_(value) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value === "boolean") return value;
  return String(value).trim();
}

function fetchExistingEvents_(config) {
  const response = requestJson_(config, "GET", "/events");
  if (response && response.events && response.events.length) {
    return response.events;
  }
  return [];
}

function requestJson_(config, method, path, body) {
  const options = {
    method: method,
    muteHttpExceptions: true,
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + config.apiKey,
    },
  };

  if (body !== undefined) {
    options.payload = JSON.stringify(body);
  }

  const response = UrlFetchApp.fetch(config.apiBase + path, options);
  const status = response.getResponseCode();
  const raw = response.getContentText();

  if (status < 200 || status >= 300) {
    throw new Error("API request failed (" + status + ") " + method + " " + path + " -> " + raw);
  }

  if (!raw) {
    return {};
  }

  return JSON.parse(raw);
}
