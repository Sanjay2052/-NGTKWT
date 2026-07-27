/**
 * NGTKWT - Google Apps Script Backend for Google Sheets & Google Drive Integration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open Google Sheets (create a new sheet titled "NGTKWT Submissions").
 * 2. Go to Extensions -> Apps Script.
 * 3. Delete any default code and paste this entire code block into Code.gs.
 * 4. Create a folder in Google Drive named "NGTKWT Candidate CVs".
 * 5. Replace FOLDER_ID below with your Google Drive folder ID (from the URL).
 * 6. Click Deploy -> New deployment -> Select type "Web app".
 * 7. Set "Who has access" to "Anyone".
 * 8. Click Deploy and copy the Web App URL.
 * 9. Paste the URL into `src/config/googleConfig.js` in your React project!
 */

const DRIVE_FOLDER_ID = "YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE"; // Replace with your Drive Folder ID

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === 'employer') {
      // 1. Save Employer Requisition to Google Sheet tab "Employers"
      let sheet = ss.getSheetByName("Employers");
      if (!sheet) {
        sheet = ss.insertSheet("Employers");
        sheet.appendRow(["ID", "Date", "Company Name", "Contact Person", "Email", "Phone", "Country", "Job Title", "Workers Needed", "Category", "Location", "Message"]);
        sheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#0B1E36").setFontColor("#FFFFFF");
      }
      sheet.appendRow([
        data.id,
        data.date,
        data.companyName,
        data.contactPerson,
        data.email,
        data.phone,
        data.country,
        data.jobTitle,
        data.workersNeeded,
        data.jobCategory,
        data.projectLocation,
        data.message
      ]);

    } else if (data.type === 'worker') {
      // 2. Save Candidate CV file to Google Drive
      let cvDriveUrl = "No CV Uploaded";
      
      if (data.cv && data.cv.data) {
        try {
          const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
          const base64Data = data.cv.data.split(",")[1];
          const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), data.cv.type, `${data.fullName.replace(/\s+/g, "_")}_CV.${data.cv.name.split('.').pop()}`);
          const file = folder.createFile(blob);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          cvDriveUrl = file.getUrl();
        } catch (fileErr) {
          cvDriveUrl = "Drive Save Error: " + fileErr.toString();
        }
      }

      // 3. Save Candidate Details & Google Drive CV Link to Google Sheet tab "Candidates"
      let sheet = ss.getSheetByName("Candidates");
      if (!sheet) {
        sheet = ss.insertSheet("Candidates");
        sheet.appendRow(["ID", "Date", "Full Name", "Email", "Phone", "Nationality", "Position Applying For", "Experience", "Certifications", "Google Drive CV Link"]);
        sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#0B1E36").setFontColor("#FFFFFF");
      }
      sheet.appendRow([
        data.id,
        data.date,
        data.fullName,
        data.email,
        data.phone,
        data.nationality,
        data.position,
        data.yearsExperience,
        data.certifications,
        cvDriveUrl
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
