import { logErrorFunctions } from './error';
import { fetchApi } from './fetch';
import { createJWTInput, getAccessTokenInput, jwtPayloadInterface } from './types';

// Based on tutorial: https://www.labnol.org/code/json-web-token-201128
// https://mannharleen.github.io/2020-03-03-salesforce-jwt/
// openssl pkcs8 -topk8 -inform pem -in private.pem -outform pem -nocrypt -out newPrivate.pem

/**
 *
 * Create JWT Auth for Salesforce Auth
 * @param {createJWTInput} credentials - Necessary credentials to form the JWT
 * @returns {string} - Signed JWT Token
 *
 */

const createJwt = (credentials: createJWTInput): string => {
  try {
    // JWT Header
    const header = {
      alg: 'RS256',
      typ: 'JWT',
    };

    const {
      iss,
      sub,
      aud,
      key,
    } = credentials;

    // Determine expired time
    const expireTime: Date = new Date();
    expireTime.setSeconds(expireTime.getSeconds() + 180);

    // Create JWT payload
    const payload: jwtPayloadInterface = {
      iss,
      sub,
      aud,
      exp: expireTime.valueOf(),
    };

    // Encode payload and header
    const encodedHeader: string = Utilities.base64EncodeWebSafe(JSON.stringify(header)).replace(/=+$/, '');
    const encodedPayload: string = Utilities.base64EncodeWebSafe(JSON.stringify(payload)).replace(/=+$/, '');
    const data = `${encodedHeader}.${encodedPayload}`;

    // Make signature
    const signatureBytes: number[] = Utilities.computeRsaSha256Signature(data, JSON.parse(key));
    const signature: string = Utilities.base64EncodeWebSafe(signatureBytes).replace(/=+$/, '');

    return `${data}.${signature}`;
  } catch (error) {
    logErrorFunctions('createJwt', credentials, '', error);
    return '';
  }
};

/**
 *
 * Do a POST to Saleforce to get Access Token
 * @returns {string} - Access Token
 *
 */

const getAccessToken = ({jwt, url}: getAccessTokenInput) => {
  try {
    // Construct URL to retrieve the access token
    const constructedURL = `https://${url}/services/oauth2/token?grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`;
    return fetchApi(constructedURL, 'post');
  } catch (error) {
    logErrorFunctions('getAccessToken', {jwt, url}, '', error);
    return {};
  }
};

export {
  getAccessToken,
  createJwt,
};