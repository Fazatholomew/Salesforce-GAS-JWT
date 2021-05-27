import {createJwt, getAccessToken} from './src/index';

/**
 *
 * Main function which can be run through trigger or debug in
 * Google Apps Script
 * 
 */

const run = () => {
  // This is example only. Please follow the steps to provide credentials:
  //

  // Retrieve credential from Property Service
  // https://developers.google.com/apps-script/reference/properties/
  const {
    iss,
    sub,
    aud,
    key,
  } = PropertiesService.getScriptProperties().getProperties();

  // Sign JWT using PublicPrivate keys
  const jwt: string = createJwt({
    iss,
    sub,
    aud,
    key,
  });

  // Retrieve Access Token from Salesforce
  const response = getAccessToken({
    jwt,
    url: aud,
  });

  // Output Access Token
  console.log(response);
};

export {
  run,
}