import { logErrorFunctions } from './error';

/**
 *
 * Use GAS URLFETCHAPP to fetch HTTP request
 * @param {string} url - URL
 * @param {GoogleAppsScript.URL_Fetch.HttpMethod} method - HTTP Method
 * @param {object} headers - The Header of the request
 * @param {object} body - Body of the request
 * @returns {object} - object parsed from JSON response
 *
 */
const fetchApi = (url: string, method: GoogleAppsScript.URL_Fetch.HttpMethod = 'get', headers = {}, body = {}) => {
  try {
    const response: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(url, {
      headers,
      payload: body,
      method,
      muteHttpExceptions: true
    });
    if (response.getResponseCode() > 299) {
      // Error in doing the fetch
      // Add Email trigger
      logErrorFunctions('fetchApi', { url, method, headers, body }, '', response.getContentText());
      return {};
    }
    return JSON.parse(response.getContentText());
  } catch (error) {
    logErrorFunctions('fetchApi', { url, method, headers, body }, '', error);
    return {};
  }
}

export {
  fetchApi,
}
