import { LogLevel, InteractionType } from "@azure/msal-browser";
// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: `${import.meta.env.VITE_AZURE_REACT_CLIENT_ID}`,
    authority: `${import.meta.env.VITE_AZURE_AUTHORITY_URL}`,
    redirectUri: "/",
    postLogoutRedirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: isIE || isEdge || isFirefox,
  },
  system: {
    allowNativeBroker: false, // Disables WAM Broker
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        // switch (level) {
        //   case LogLevel.Error:
        //     console.error(message);
        //     return;
        //   case LogLevel.Info:
        //     console.info(message);
        //     return;
        //   case LogLevel.Verbose:
        //     console.debug(message);
        //     return;
        //   case LogLevel.Warning:
        //     console.warn(message);
        //     return;
        //   default:
        //     return;
        // }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
//const loginRequest = {
//    scopes: ["User.Read"]
//};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
//const tokenRequest = {
//    scopes: ["User.Read", "Mail.Read"],
//    forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
//};

const graphConfig = {
  scopes: ["User.Read"],
  urls: {
    getMe: "https://graph.microsoft.com/v1.0/me",
  },
};

const apiConfig = {
  scopes: [import.meta.env.VITE_AUTH_SCOPE],
  urls: {
    getMe: "/api/Me",
  },
};

const loginMode = InteractionType.Redirect; // Redirect or Popup

const authConfig = {
  msal: msalConfig,
  graph: graphConfig,
  api: apiConfig,
  loginMode: loginMode,
};
export default authConfig;
