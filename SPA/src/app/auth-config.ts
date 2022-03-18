/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

import { LogLevel, Configuration, BrowserCacheLocation, AuthenticationScheme } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: '4b98f617-a30c-4fd6-a368-1dfa1a3cc4c2', // This is the ONLY mandatory field that you need to supply.
    authority: 'https://login.microsoftonline.com/c9915188-51f3-45d6-a2e7-02865e330e8e', // Defaults to "https://login.microsoftonline.com/common"
    redirectUri: '/', // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage, // Configures cache location. "SessionStorage" is more secure, but "LocalStorage" gives you SSO between tabs.
    storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Error,
      piiLoggingEnabled: false
    }
  }
}

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
  todoListApi: {
    endpoint: "https://localhost:44372/api/todolist",
    
    scopes: ["api://f1985385-7a72-4032-bb15-a9f809695d36/.default"],
  },
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: [...protectedResources.todoListApi.scopes],
  authenticationScheme: AuthenticationScheme.POP,
  resourceRequestMethod: "GET",
  resourceRequestUri: protectedResources.todoListApi.endpoint,
};