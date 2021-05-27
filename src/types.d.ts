interface createJWTInput {
  iss: string; // CLIENT_ID
  sub: string; // SF USERNAME
  aud: string; // SF URL
  key: string; // Private Key
}

interface getAccessTokenInput {
  jwt: string; // Signed JWT
  url: string; // Salesforce URL
}

interface jwtPayloadInterface {
  iss: string; // CLIENT_ID
  sub: string; // SF USERNAME
  aud: string; // SF URL
  exp: number; // Expired in Unix Timestamp
}


export {
  jwtPayloadInterface,
  createJWTInput,
  getAccessTokenInput
}