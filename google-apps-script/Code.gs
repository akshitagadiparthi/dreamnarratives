/**
 * Dream Narratives — enquiry receiver for Google Sheets.
 *
 * Paste this into the enquiries sheet: Extensions → Apps Script.
 * Then Deploy → New deployment → Web app (Execute as: Me, Who has access:
 * Anyone). Put the Web app URL in Vercel as SHEETS_WEBHOOK_URL.
 * Full steps are in the project README.
 */

// Must match ENQUIRY_SECRET in Vercel. Use any long random string.
var SECRET = 'PASTE-THE-SAME-SECRET-AS-VERCEL';

// Optional: email the founders on every enquiry. Comma-separate addresses,
// or leave empty to turn alerts off.
var NOTIFY_EMAIL = '';

var ALL_TAB = 'All enquiries';
var SHARED = ['Submitted at', 'Name', 'Phone', 'WhatsApp', 'Email', 'City', 'How they heard of us', 'Preferred contact time', 'Message', 'Source page'];
var TRACK = ['Status', 'Owner', "Founders' notes"];
var ALL_HEADERS = ['Submitted at', 'Service', 'Name', 'Phone', 'WhatsApp', 'Email', 'City', 'Key details', 'Status', 'Owner'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var body = JSON.parse(e.postData.contents || '{}');
    if (!SECRET || body.secret !== SECRET) return reply({ ok: false, error: 'unauthorised' });

    var tabName = String(body.sheet || 'Other').slice(0, 60);
    var data = body.data || {};
    var now = new Date();
    data['Submitted at'] = now;
    if (!data.Status) data.Status = 'New';

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. The service's own tab, with every answer in its own column.
    var tab = ss.getSheetByName(tabName) || ss.insertSheet(tabName);
    var headers = ensureHeaders(tab, Object.keys(data));
    tab.appendRow(headers.map(function (h) { return valueFor(data, h); }));

    // 2. One summary line on the "All enquiries" tab.
    var all = ss.getSheetByName(ALL_TAB) || ss.insertSheet(ALL_TAB, 0);
    var allHeaders = ensureHeaders(all, ALL_HEADERS);
    var details = Object.keys(data)
      .filter(function (k) { return SHARED.indexOf(k) === -1 && TRACK.indexOf(k) === -1 && data[k] !== ''; })
      .map(function (k) { return k + ': ' + data[k]; })
      .join(' · ');
    var summary = { 'Service': tabName, 'Key details': details };
    allHeaders.forEach(function (h) { if (!(h in summary)) summary[h] = data[h]; });
    all.appendRow(allHeaders.map(function (h) { return valueFor(summary, h); }));

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'New enquiry · ' + tabName + ' · ' + (data.Name || ''),
        body: Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n') + '\n\n' + ss.getUrl(),
      });
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Makes sure the header row holds every key, adding new columns at the end. */
function ensureHeaders(sheet, keys) {
  var lastCol = sheet.getLastColumn();
  var headers = lastCol ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String) : [];
  if (!headers.length) {
    headers = ['Submitted at'].concat(keys.filter(function (k) { return k !== 'Submitted at' && TRACK.indexOf(k) === -1; })).concat(TRACK);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sheet.setFrozenRows(1);
    return headers;
  }
  var missing = keys.filter(function (k) { return headers.indexOf(k) === -1; });
  if (missing.length) {
    sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]).setFontWeight('bold');
    headers = headers.concat(missing);
  }
  return headers;
}

/** Text is written as text, so phone numbers keep their + and leading digits. */
function valueFor(obj, key) {
  var v = obj[key];
  if (v === undefined || v === null) return '';
  if (v instanceof Date) return v;
  v = String(v);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Run once from the editor to check everything is wired up. */
function testEnquiry() {
  var res = doPost({ postData: { contents: JSON.stringify({ secret: SECRET, sheet: 'The Invitation', data: { Name: 'Test enquiry', Phone: '+91 00000 00000', Occasion: 'Wedding', Message: 'Delete this row.' } }) } });
  Logger.log(res.getContent());
}
