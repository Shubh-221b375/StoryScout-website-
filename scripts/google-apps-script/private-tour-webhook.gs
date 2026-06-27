/**
 * StoryScout — Private Tour form → Google Sheet
 *
 * Setup:
 * 1. Create a Google Sheet with headers in row 1 (see HEADERS below).
 * 2. Extensions → Apps Script → paste this file → Save.
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web app URL into Render/.env as GOOGLE_SHEET_WEBHOOK_URL
 */

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

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
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
