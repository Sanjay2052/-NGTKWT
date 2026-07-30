// Google Apps Script Webhook Configuration
export const GOOGLE_SCRIPT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbx7QjxgId1kzVrBr4DfuTtg1Csi2fz8Bbou5W4_uXtwpvaQstfpAhHMmKAPDymbMLNJ-A/exec"; 

/**
 * Send submission data to Google Apps Script (Google Sheets & Google Drive)
 */
export async function sendToGoogleSheets(payload) {
  if (!GOOGLE_SCRIPT_WEBHOOK_URL) {
    console.log("Google Sheets Webhook URL not set. Data stored in local Admin Portal.");
    return false;
  }

  try {
    await fetch(GOOGLE_SCRIPT_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.error("Error sending to Google Sheets/Drive:", error);
    return false;
  }
}
