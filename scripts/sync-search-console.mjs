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
const end = new Date();
end.setUTCDate(end.getUTCDate() - 3);
const start = new Date(end);
start.setUTCDate(start.getUTCDate() - 27);
const dateString = (date) => date.toISOString().slice(0, 10);

const analyticsResponse = await fetch(
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

if (!analyticsResponse.ok) {
  throw new Error(`Search Console query failed (${analyticsResponse.status}): ${await analyticsResponse.text()}`);
}

const analytics = await analyticsResponse.json();
const rows = (analytics.rows || []).map((row) => ({
  keyword: row.keys[0].toLowerCase(),
  clicks: row.clicks,
  impressions: row.impressions,
  ctr: row.ctr,
  position: row.position,
}));

const snapshot = {
  lastUpdated: new Date().toISOString(),
  property,
  window: `${dateString(start)} to ${dateString(end)}`,
  rows,
};

await writeFile(new URL('../src/data/gsc-snapshot.json', import.meta.url), `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Updated Search Console snapshot with ${rows.length} queries for ${snapshot.window}.`);
