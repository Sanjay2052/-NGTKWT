/**
 * NGTKWT - Google Apps Script Backend for Google Sheets & Google Drive Integration
 */

const SPREADSHEET_ID = "1crnOlxr4m2BztPW9gQYrZq0Irmdcaf40oODH81Uj4Cpk";
const DRIVE_FOLDER_ID = "1emVIbHoKHlaeuwEqK4p93ll2s-IZO__x";

function getSpreadsheet() {
  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {}
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getDriveFolder() {
  if (DRIVE_FOLDER_ID && DRIVE_FOLDER_ID !== "YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE") {
    try {
      const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      if (folder) return folder;
    } catch (e) {
      // Fallback if folder ID is invalid or deleted
    }
  }

  // Auto-fallback: Find or create "NGTKWT Candidate CVs" folder automatically
  const folders = DriveApp.getFoldersByName("NGTKWT Candidate CVs");
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder("NGTKWT Candidate Documents");
}

function getSubFolder(parentFolder, folderName) {
  const folders = parentFolder.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  const newFolder = parentFolder.createFolder(folderName);
  try { newFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) {}
  return newFolder;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = getSpreadsheet();

    const kuwaitDate = data.date || Utilities.formatDate(new Date(), "Asia/Kuwait", "MMM dd, yyyy, hh:mm:ss a");
    var formattedPhone = (data.phone || "").toString().trim();
    if (formattedPhone.indexOf("+") === 0 && formattedPhone.indexOf("'") !== 0) {
      formattedPhone = "'" + formattedPhone;
    }

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
        kuwaitDate,
        data.companyName,
        data.contactPerson,
        data.email,
        formattedPhone,
        data.country,
        data.jobTitle,
        data.workersNeeded,
        data.jobCategory,
        data.projectLocation,
        data.message
      ]);

    } else if (data.type === 'worker') {
      const mainFolder = getDriveFolder();
      const resumeFolder = getSubFolder(mainFolder, "NGTKWT Employee Resume");
      const certFolder = getSubFolder(mainFolder, "NGTKWT Employee Certificate");

      // 2. Save Candidate CV file to "NGTKWT Employee Resume" subfolder
      let cvDriveUrl = "No CV Uploaded";
      if (data.cv && data.cv.data) {
        try {
          let rawData = data.cv.data;
          if (rawData.indexOf(",") > -1) {
            rawData = rawData.split(",")[1];
          }
          const blob = Utilities.newBlob(
            Utilities.base64Decode(rawData), 
            data.cv.type || 'application/pdf', 
            `${data.fullName.replace(/\s+/g, "_")}_CV.${data.cv.name ? data.cv.name.split('.').pop() : 'pdf'}`
          );
          const file = resumeFolder.createFile(blob);
          cvDriveUrl = file.getUrl();
          try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (sErr) {}
        } catch (fileErr) {
          cvDriveUrl = "Drive CV Save Error: " + fileErr.toString();
        }
      }

      // 3. Save Candidate Certificate Document to "NGTKWT Employee Certificate" subfolder
      let certDriveUrl = "No Certificate Uploaded";
      if (data.certDoc && data.certDoc.data) {
        try {
          let rawData = data.certDoc.data;
          if (rawData.indexOf(",") > -1) {
            rawData = rawData.split(",")[1];
          }
          const blob = Utilities.newBlob(
            Utilities.base64Decode(rawData), 
            data.certDoc.type || 'application/pdf', 
            `${data.fullName.replace(/\s+/g, "_")}_Cert.${data.certDoc.name ? data.certDoc.name.split('.').pop() : 'pdf'}`
          );
          const file = certFolder.createFile(blob);
          certDriveUrl = file.getUrl();
          try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (sErr) {}
        } catch (fileErr) {
          certDriveUrl = "Drive Cert Save Error: " + fileErr.toString();
        }
      }

      // 4. Save Candidate Details & Google Drive Links to Google Sheet tab "Candidates"
      let sheet = ss.getSheetByName("Candidates");
      if (!sheet) {
        sheet = ss.insertSheet("Candidates");
        sheet.appendRow(["ID", "Date", "Full Name", "Email", "Phone", "Nationality", "Position Applying For", "Experience", "Certifications", "Google Drive CV Link", "Google Drive Certificate Link"]);
        sheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#0B1E36").setFontColor("#FFFFFF");
      } else {
        // Ensure header in column 11 (Column K) is set to "Google Drive Certificate Link"
        let headerCell = sheet.getRange(1, 11);
        if (!headerCell.getValue() || headerCell.getValue() === "") {
          headerCell.setValue("Google Drive Certificate Link").setFontWeight("bold").setBackground("#0B1E36").setFontColor("#FFFFFF");
        }
      }
      sheet.appendRow([
        data.id,
        kuwaitDate,
        data.fullName,
        data.email,
        formattedPhone,
        data.nationality,
        data.position,
        data.yearsExperience,
        data.certifications,
        cvDriveUrl,
        certDriveUrl
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
