import { logErrorFunctions } from './error';
import { fetchApi } from './fetch';

// Based on tutorial: https://www.labnol.org/code/json-web-token-201128
// https://mannharleen.github.io/2020-03-03-salesforce-jwt/
// openssl pkcs8 -topk8 -inform pem -in private.pem -outform pem -nocrypt -out newPrivate.pem

interface jwtPayloadInterface {
  iss: string; // CLIENT_ID
  sub: string; // SF USERNAME
  aud: string; // SF URL
  exp: number; // Expired in Unix Timestamp
}

/**
 *
 * Create JWT Auth for Salesforce Auth
 * @returns {string} - token
 *
 */

const createJwt = (): string => {
  try {
    // JWT Header
    const header = {
      alg: 'RS256',
      typ: 'JWT',
    };

    // Retrieve credentials using PropertiesService
    const {
      iss,
      sub,
      aud,
      key
    } = PropertiesService.getScriptProperties().getProperties();

    // Determine expired time
    const expireTime: Date = new Date();
    expireTime.setSeconds(expireTime.getSeconds() + 180);

    // Create payload
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
    logErrorFunctions('createJwt', '', '', error);
    return '';
  }
};

/**
 *
 * Do a POST to Saleforce to get Access Token
 * @returns {string} - Access Token
 *
 */

const getAccessToken = () => {
  try {
    const aud = PropertiesService.getScriptProperties().getProperty('aud')
    const jwt: string = createJwt();
    const url = `https://${aud}/services/oauth2/token?grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`;
    return fetchApi(url, 'post');
  } catch (error) {
    logErrorFunctions('getAccessToken', '', '', error);
    return {};
  }
};

export {
  getAccessToken,
};