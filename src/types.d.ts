/**
 *
 * JSON Web Token necessary input
 * @param {string} iss - Client ID / Consumer Key
 * @param {string} sub - Salesforce USERNAME
 * @param {string} aud - Salesforce login URL
 * @param {string} key - Private Key usually comes from privatekey.pem
 * 
 */
interface createJWTInput {
  iss: string;
  sub: string;
  aud: string;
  key: string;
}

/**
 *
 * JSON Web Token Components
 * @param {string} iss - Client ID / Consumer Key
 * @param {string} sub - Salesforce USERNAME
 * @param {string} aud - Salesforce login URL
 * @param {string} exp - Expired Time in Unix Timestamp
 * 
 */
interface jwtPayloadInterface {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
}

/**
 *
 * In order to get access token url and Signed JWT is needed
 * @param {string} jwt - Signed JWT
 * @param {string} url - Salesforce login URL
 * 
 */
interface getAccessTokenInput {
  jwt: string;
  url: string;
}



export {
  jwtPayloadInterface,
  createJWTInput,
  getAccessTokenInput
}