import { createSign } from 'node:crypto';
import { writeFile } from 'node:fs/promises';

const credentialsSource = process.env.GSC_SERVICE_ACCOUNT_JSON;
const property = process.env.GSC_PROPERTY || 'https://www.landscapingraleigh.com/';
const ga4PropertyId = process.env.GA4_PROPERTY_ID || '548354885';

if (!credentialsSource) {
  throw new Error('GSC_SERVICE_ACCOUNT_JSON is required. Store the complete service-account JSON as a repository secret.');
}

const credentials = JSON.parse(credentialsSource);
const base64url = (value) => Buffer.from(value).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
const claims = base64url(JSON.stringify({
  iss: credentials.client_email,
  scope: [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/analytics.readonly',
  ].join(' '),
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

const analyticsEnd = new Date();
const analyticsStart = new Date(analyticsEnd);
analyticsStart.setUTCDate(analyticsStart.getUTCDate() - 27);
const previousAnalyticsEnd = new Date(analyticsStart);
previousAnalyticsEnd.setUTCDate(previousAnalyticsEnd.getUTCDate() - 1);
const previousAnalyticsStart = new Date(previousAnalyticsEnd);
previousAnalyticsStart.setUTCDate(previousAnalyticsStart.getUTCDate() - 27);

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

const runAnalyticsReport = async (body) => {
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${ga4PropertyId}:runReport`,
    {
      method: 'POST',
      headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    throw new Error(`Analytics query failed (${response.status}): ${await response.text()}`);
  }

  return response.json();
};

const numberValue = (value) => Number(value || 0);
const queryAnalytics = async (start, end) => {
  const dateRanges = [{ startDate: dateString(start), endDate: dateString(end) }];
  const [totalsReport, channelsReport, eventsReport] = await Promise.all([
    runAnalyticsReport({
      dateRanges,
      metrics: [{ name: 'totalUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }],
    }),
    runAnalyticsReport({
      dateRanges,
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }],
    }),
    runAnalyticsReport({
      dateRanges,
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          inListFilter: { values: ['generate_lead', 'phone_click', 'email_click'] },
        },
      },
    }),
  ]);

  const totals = totalsReport.rows?.[0]?.metricValues || [];
  const organicRow = channelsReport.rows?.find((row) => row.dimensionValues?.[0]?.value === 'Organic Search');
  const events = new Map((eventsReport.rows || []).map((row) => [
    row.dimensionValues?.[0]?.value,
    numberValue(row.metricValues?.[0]?.value),
  ]));

  return {
    users: numberValue(totals[0]?.value),
    sessions: numberValue(totals[1]?.value),
    pageViews: numberValue(totals[2]?.value),
    organicSessions: numberValue(organicRow?.metricValues?.[0]?.value),
    formLeads: events.get('generate_lead') || 0,
    phoneClicks: events.get('phone_click') || 0,
    emailClicks: events.get('email_click') || 0,
  };
};

const [currentAnalytics, previousAnalytics] = await Promise.all([
  queryAnalytics(analyticsStart, analyticsEnd),
  queryAnalytics(previousAnalyticsStart, previousAnalyticsEnd),
]);

const analyticsSnapshot = {
  lastUpdated: new Date().toISOString(),
  property: ga4PropertyId,
  window: `${dateString(analyticsStart)} to ${dateString(analyticsEnd)}`,
  comparisonWindow: `${dateString(previousAnalyticsStart)} to ${dateString(previousAnalyticsEnd)}`,
  current: currentAnalytics,
  previous: previousAnalytics,
};

await writeFile(new URL('../src/data/gsc-snapshot.json', import.meta.url), `${JSON.stringify(snapshot, null, 2)}\n`);
await writeFile(new URL('../src/data/ga4-snapshot.json', import.meta.url), `${JSON.stringify(analyticsSnapshot, null, 2)}\n`);
console.log(`Updated Search Console snapshot with ${rows.length} queries for ${snapshot.window}, compared with ${snapshot.comparisonWindow}.`);
console.log(`Updated Analytics snapshot for ${analyticsSnapshot.window}, compared with ${analyticsSnapshot.comparisonWindow}.`);
