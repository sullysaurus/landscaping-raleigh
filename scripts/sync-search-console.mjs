import { createSign } from 'node:crypto';
import { writeFile } from 'node:fs/promises';

const credentialsSource = process.env.GSC_SERVICE_ACCOUNT_JSON;
const property = process.env.GSC_PROPERTY || 'https://www.landscapingraleigh.com/';

if (!credentialsSource) {
  throw new Error('GSC_SERVICE_ACCOUNT_JSON is required. Store the complete service-account JSON as a repository secret.');
}

const credentials = JSON.parse(credentialsSource);
const base64url = (value) => Buffer.from(value).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
const claims = base64url(JSON.stringify({
  iss: credentials.client_email,
  scope: 'https://www.googleapis.com/auth/webmasters.readonly',
  aud: credentials.token_uri || 'https://oauth2.googleapis.com/token',
  iat: now,
  exp: now + 3600,
}));
const unsignedToken = `${header}.${claims}`;
const signer = createSign('RSA-SHA256');
signer.update(unsignedToken);
signer.end();
const assertion = `${unsignedToken}.${signer.sign(credentials.private_key, 'base64url')}`;

const tokenResponse = await fetch(credentials.token_uri || 'https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
});

if (!tokenResponse.ok) {
  throw new Error(`Google OAuth failed (${tokenResponse.status}): ${await tokenResponse.text()}`);
}

const { access_token: accessToken } = await tokenResponse.json();
const dateString = (date) => date.toISOString().slice(0, 10);
const currentEnd = new Date();
currentEnd.setUTCDate(currentEnd.getUTCDate() - 3);
const currentStart = new Date(currentEnd);
currentStart.setUTCDate(currentStart.getUTCDate() - 27);
const previousEnd = new Date(currentStart);
previousEnd.setUTCDate(previousEnd.getUTCDate() - 1);
const previousStart = new Date(previousEnd);
previousStart.setUTCDate(previousStart.getUTCDate() - 27);

const querySearchConsole = async (start, end) => {
  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        startDate: dateString(start),
        endDate: dateString(end),
        dimensions: ['query'],
        type: 'web',
        rowLimit: 25000,
        dataState: 'final',
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Search Console query failed (${response.status}): ${await response.text()}`);
  }

  const analytics = await response.json();
  return (analytics.rows || []).map((row) => ({
    keyword: row.keys[0].toLowerCase(),
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));
};

const [currentRows, previousRows] = await Promise.all([
  querySearchConsole(currentStart, currentEnd),
  querySearchConsole(previousStart, previousEnd),
]);
const previousByKeyword = new Map(previousRows.map((row) => [row.keyword, row]));
const rows = currentRows.map((row) => {
  const previous = previousByKeyword.get(row.keyword);
  return {
    ...row,
    previousPosition: previous?.position ?? null,
    positionChange: previous ? previous.position - row.position : null,
  };
});

const snapshot = {
  lastUpdated: new Date().toISOString(),
  property,
  window: `${dateString(currentStart)} to ${dateString(currentEnd)}`,
  comparisonWindow: `${dateString(previousStart)} to ${dateString(previousEnd)}`,
  rows,
};

await writeFile(new URL('../src/data/gsc-snapshot.json', import.meta.url), `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Updated Search Console snapshot with ${rows.length} queries for ${snapshot.window}, compared with ${snapshot.comparisonWindow}.`);
