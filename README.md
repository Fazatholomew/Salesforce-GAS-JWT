<h1 align="center">Welcome to sfjwtauth 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

> Google Apps Script implementation of Salesforce Oauth using JSON Web Token.

## Install

* ### (Option 1) Create New Google Apps Script Project

```sh
git clone
cd sfjwtauth
npm i @google/clasp -g
clasp login
clasp create --title "Salesforce Authentication"
```

* ### (Option 2) Integrate with existing project

Copy the content of src/ folder and paste it in your project. Import the function from src/index.ts just like the example in Code.ts file.

## Usage

1. Get Connected App in Salesforce and Generate Public and Private Keys by following [this tutorial](https://mannharleen.github.io/2020-03-03-salesforce-jwt/).

2. Push your code into Google Apps Script Project

```sh
clasp push
```
3. Generate Private Key that GAS Supports
```sh
openssl pkcs8 -topk8 -inform pem -in private.pem -outform pem -nocrypt -out newPrivate.pem
```
4. Turn the generated private key into single line string
Open the newPrivate.pem with text editor. Remove all new line character. Except the one after BEGIN PRIVATE KEY and before END PRIVATE KEY. For example:
#### Before:
```
-----BEGIN PRIVATE KEY-----
MIICdgIBADANBgkqhkiG9w0BAQEFAASC
AmAwggJcAgEAAoGBALQXzM8zKoBAJbDo
mtQsi36RmQUwRpka7r5Sejwi1BQu3bhB
DKiQnvdkFt2789iQqeGvGoUgS3ifhrqp
nB+IBoczB3V4F4eIademGvdruktmpqt5
ixJUROScfLfBhsQfMyM5htgCaCyeGUTQ
Dk7Xedd0KTN1C5bB1YsBDB0JTD5AgMBA
AECgYAvp7Sch4oPIvpffsssfdyDM+Q==
-----END PRIVATE KEY-----
```
#### After:
```
"-----BEGIN PRIVATE KEY-----\nMIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALQXzM8zKoBAJbDomtQsi36RmQUwRpka7r5Sejwi1BQu3bhBDKiQnvdkFt2789iQqeGvGoUgS3ifhrqp
nB+IBoczB3V4F4eIademGvdruktmpqt5ixJUROScfLfBhsQfMyM5htgCaCyeGUTQDk7Xedd0KTN1C5bB1YsBDB0JTD5AgMBA\nAECgYAvp7Sch4oPIvpffsssfdyDM+Q==-----END PRIVATE KEY-----"
```
5. Save necessary credentials in Property Service in Google Apps Script
As of May 29, 2021, in order to pre populate the Property Service and store our environment variables is by clicking Use Legacy Editor > File > Project Properties > Script Properties. 

| Property       | Value
| :------------- | :----------: 
| aud | login.salesforce.com   
| iss   | Client ID or Consumer Key from Connected App
| key | Private Key from previous step 

<br>

## Author

👤 **Jimmy Hikmatullah**

* Website: https://jimmyganteng.com
* Github: [@FazaTholomew](https://github.com/FazaTholomew)
* LinkedIn: [@faza-jimmy-hikmatullah-48bb54152](https://linkedin.com/in/faza-jimmy-hikmatullah-48bb54152)

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_