import { SPREADSHEET_ID } from "./constants";

/**
 *
 * Append error and save to the Spreadsheet
 * @param {any[]} errorDetails - Formated Error information to save.
 *
 */
const logErrorToSheet = (errorDetails: any[]) => {
  const sheet: GoogleAppsScript.Spreadsheet.Spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  sheet.getSheetByName('Logs').appendRow(errorDetails);
};

/**
 *
 * Format error that is caused by a simple function.
 * @param {string} functionName - Function that throws the error.
 * @param {any} input - Input value of the function.
 * @param {any} output - Output potential of the function if any.
 * @param {any} error - The actual error.
 */
const logErrorFunctions = (functionName: string, input: any = '', output: any = '', error: any) => {
  try {
    const currentTimeStamp = new Date();
    const checkError = error ? error : 'Error contains nothing';
    logErrorToSheet([currentTimeStamp, functionName, input, output, checkError.message, checkError, checkError.stack]);
  } catch (e) {
    // If this is not in Google Apps Script environtment, throw regular error
    throw error;
  }
};

export {
  logErrorFunctions,
}