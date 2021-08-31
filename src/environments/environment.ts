
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  environmentName:'prod',
  // wss://amigoportal.herokuapp.com',
  APP_BASE_URL:'aiBot.com',//'localhost',
  // completeUrl:'wss://aidjangobot.azurewebsites.net',//'wss://aimlapi.herokuapp.com',
  // API_BASE_URL: 'https://aidjangobot.azurewebsites.net', //'https://aimlapi.herokuapp.com',
  // API_BASE_URL_CHAT:'https://aidjangobot.azurewebsites.net',//'https://aimlapi.herokuapp.com',
  completeUrl:'wss://aimlapi.herokuapp.com',
  API_BASE_URL: 'https://aimlapi.herokuapp.com',
  API_BASE_URL_CHAT:'https://aimlapi.herokuapp.com',
  aidjangoapi:'https://aidjangobot.azurewebsites.net',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.