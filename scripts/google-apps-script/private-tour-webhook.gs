/**
 * StoryScout — Private Tour form → Google Sheet
 *
 * SETUP (important — follow every step):
 *
 * 1. Open your Google Sheet "StoryScout - Private tours details"
 * 2. Copy the Sheet ID from the URL:
 *    https://docs.google.com/spreadsheets/d/COPY_THIS_PART/edit
 * 3. Paste it into SPREADSHEET_ID below
 * 4. Extensions → Apps Script → paste this entire file → Save
 * 5. Run authorizeSetup_ once (Run menu) and approve permissions
 * 6. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone   ← must be "Anyone", not "Only myself"
 * 7. Copy the Web app URL → Render env GOOGLE_SHEET_WEBHOOK_URL
 *
 * TEST: open the Web app URL in an incognito browser tab.
 * You should see: {"ok":true,"message":"StoryScout webhook is live"}
 */

// Paste your Sheet ID here (from the spreadsheet URL):
var SPREADSHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";

var HEADERS = [
  "Submitted At",
  "Full Name",
  "Email",
  "Contact Number",
  "City & State",
  "Male Adults",
  "Female Adults",
  "Kids 0-5",
  "Kids 6-12",
  "Others",
  "Primary Destination",
  "Alternative Destination",
  "Trip Start Date",
  "Number of Days",
  "Flexible Dates",
  "Travel Style",
  "Transport Needed",
  "Transport Type",
  "Budget",
  "Accommodation",
  "Room Type",
  "Meals",
  "Food Preference",
  "Special Requirements",
  "Preferred Call Back Time",
  "How Did You Hear",
];

function getTargetSheet_() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID === "PASTE_YOUR_SHEET_ID_HERE") {
    throw new Error(
      "Set SPREADSHEET_ID at the top of the script to your Google Sheet ID",
    );
  }
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
}

function doGet() {
  return jsonResponse_({ ok: true, message: "StoryScout webhook is live" });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Missing POST body");
    }

    var sheet = getTargetSheet_();
    ensureHeaders_(sheet);

    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.fullName || "",
      data.email || "",
      data.contactNumber || "",
      data.cityState || "",
      data.maleAdults || "",
      data.femaleAdults || "",
      data.kids0to5 || "",
      data.kids6to12 || "",
      data.others || "",
      data.primaryDestination || "",
      data.alternativeDestination || "",
      data.tripStartDate || "",
      data.numberOfDays || "",
      data.flexibleDates || "",
      data.travelStyle || "",
      data.transportNeeded || "",
      data.transportType || "",
      data.budget || "",
      data.accommodation || "",
      data.roomType || "",
      data.meals || "",
      data.foodPreference || "",
      data.specialRequirements || "",
      data.preferredCallBackTime || "",
      data.howDidYouHear || "",
    ]);

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

/** Run once from the Apps Script editor to authorize and add headers. */
function authorizeSetup_() {
  var sheet = getTargetSheet_();
  ensureHeaders_(sheet);
  Logger.log("Setup complete. Headers ready on: " + sheet.getName());
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    return;
  }
  var firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  if (firstRow[0] !== HEADERS[0]) {
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
