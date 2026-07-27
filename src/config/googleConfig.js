// Google Apps Script Webhook Configuration
// Paste your Google Apps Script Web App URL here after deploying your script.
export const GOOGLE_SCRIPT_WEBHOOK_URL = ""; 

/**
 * Send submission data to Google Apps Script (Google Sheets & Google Drive)
 */
export async function sendToGoogleSheets(payload) {
  if (!GOOGLE_SCRIPT_WEBHOOK_URL) {
    console.log("Google Sheets Webhook URL not set. Data stored in local Admin Portal.");
    return false;
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors", // Allows cross-origin post to Google Apps Script Web App
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.error("Error sending to Google Sheets/Drive:", error);
    return false;
  }
}
