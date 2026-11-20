/**
 * ION contest entries -> Google Sheet
 *
 * SETUP (about 5 minutes)
 * 1. Create a new Google Sheet (name it e.g. "ION Contest Entries").
 * 2. In the Sheet: Extensions > Apps Script. Delete the sample code and paste
 *    this whole file. Save.
 * 3. In Apps Script: Project Settings (gear icon) > Script properties >
 *    Add script property:
 *        ADMIN_KEY = a long random string (this is NOT the page password;
 *        it is a separate secret shared with the website).
 * 4. Deploy > New deployment > type "Web app":
 *        Execute as:      Me
 *        Who has access:  Anyone
 *    Click Deploy, approve the permissions, and copy the "Web app" URL.
 * 5. Paste that URL into entryEndpoint in src/data/contests.ts.
 * 6. In Netlify (Environment variables) add CONTEST_SHEET_KEY with the same
 *    value as ADMIN_KEY (secret, scopes: Functions + Runtime), then redeploy.
 *
 * After editing this code later: Deploy > Manage deployments > edit >
 * Version: New version > Deploy (the URL stays the same).
 *
 * Each contest gets its own tab, created automatically on the first entry.
 */

// contest slug (from src/data/contests.ts) -> sheet tab name
var CONTESTS = {
  'raptors-tickets': 'Raptors Tickets',
  'printing-promo-500': 'Printing Promo $500',
};

var HEADERS = [
  'Timestamp', 'Name', 'Email', 'Phone', 'Organization', 'Notes',
  'Email key (do not edit)', 'Phone key (do not edit)',
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var data = JSON.parse(e.postData.contents);

    // Honeypot: real people never fill this in. Pretend success.
    if (data.website) return json_({ ok: true });

    var tabName = CONTESTS[data.contest];
    if (!tabName) return json_({ ok: false, error: 'unknown_contest' });

    var name = clean_(data.name, 120);
    var email = clean_(data.email, 160);
    var phone = clean_(data.phone, 40);
    var org = clean_(data.organization, 160);

    if (!name || !email || !phone) return json_({ ok: false, error: 'missing' });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json_({ ok: false, error: 'bad_email' });
    }

    var emailKey = normEmail_(email);
    var phoneKey = normPhone_(phone); // '' or 'p' + 10 digits (text, never a number)
    var sheet = getSheet_(tabName);

    // Reject duplicates (same email OR same phone) for this contest.
    var last = sheet.getLastRow();
    if (last > 1) {
      var keys = sheet.getRange(2, 7, last - 1, 2).getValues();
      for (var i = 0; i < keys.length; i++) {
        if (String(keys[i][0]) === emailKey || (phoneKey && String(keys[i][1]) === phoneKey)) {
          return json_({ ok: false, error: 'duplicate' });
        }
      }
    }

    // Prefix with ' so Sheets never treats text as a formula.
    sheet.appendRow([
      new Date(), safe_(name), safe_(email), safe_(phone), safe_(org), '',
      emailKey, phoneKey,
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'server_error' });
  } finally {
    lock.releaseLock();
  }
}

// Used by the website's admin page. Requires the ADMIN_KEY.
function doGet(e) {
  var key = PropertiesService.getScriptProperties().getProperty('ADMIN_KEY');
  var p = (e && e.parameter) || {};
  if (!key || p.action !== 'entries' || p.key !== key) {
    return json_({ ok: false, error: 'unauthorized' });
  }

  var out = {};
  Object.keys(CONTESTS).forEach(function (slug) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONTESTS[slug]);
    var rows = [];
    if (sheet && sheet.getLastRow() > 1) {
      var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues();
      values.forEach(function (v) {
        rows.push({
          enteredAt: v[0] instanceof Date ? v[0].toISOString() : String(v[0]),
          name: unsafe_(v[1]),
          email: unsafe_(v[2]),
          phone: unsafe_(v[3]),
          organization: unsafe_(v[4]),
        });
      });
    }
    out[slug] = rows;
  });
  return json_({ ok: true, contests: out });
}

function getSheet_(tabName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.hideColumns(7, 2);
  }
  return sheet;
}

function clean_(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
}

function safe_(v) {
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function unsafe_(v) {
  var s = String(v == null ? '' : v);
  return s.charAt(0) === "'" ? s.slice(1) : s;
}

// jane.doe+x@gmail.com and janedoe@gmail.com are the same person
function normEmail_(raw) {
  var email = raw.trim().toLowerCase();
  var at = email.indexOf('@');
  if (at < 0) return email;
  var local = email.slice(0, at).split('+')[0];
  var domain = email.slice(at + 1);
  if (domain === 'googlemail.com') domain = 'gmail.com';
  if (domain === 'gmail.com') local = local.replace(/\./g, '');
  return local + '@' + domain;
}

// last 10 digits (so +1 / 1- prefixes do not matter), prefixed with 'p' so
// Google Sheets keeps it as text instead of converting it to a number
function normPhone_(raw) {
  var digits = String(raw).replace(/\D/g, '');
  return digits.length >= 10 ? 'p' + digits.slice(-10) : '';
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
