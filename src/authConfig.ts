import { Configuration, PopupRequest } from "@azure/msal-browser";
/* globals CSS_CONFIG */

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: CSS_CONFIG.CLIENTID,
    authority: CSS_CONFIG.AUTHORITY,
    redirectUri: CSS_CONFIG.REDIRECTURI,
    postLogoutRedirectUri: "/MeritWeb/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
  scopes: CSS_CONFIG.SCOPES,
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
