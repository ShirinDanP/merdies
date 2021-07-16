import { useState, useEffect } from "react";
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../authConfig";

/* globals CSS_CONFIG */

interface UseAccessTokenState {
  accessToken: string | null;
}

const useAccessToken = (): [UseAccessTokenState] => {
  const { instance, inProgress } = useMsal();
  const msalInstance = new PublicClientApplication(msalConfig);
  const accounts = msalInstance.getAllAccounts();

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const accessTokenRequest = {
    scopes: CSS_CONFIG.SCOPES,
    account: msalInstance.getAccountByUsername(accounts[0].username),
    forceRefresh: false,
  };
  console.log("accounts", accounts);

  useEffect(() => {
    if (!accessToken && inProgress === InteractionStatus.None) {
      instance
        .acquireTokenSilent(accessTokenRequest as any)
        .then((accessTokenResponse) => {
          let token = accessTokenResponse.accessToken;
          setAccessToken(token as any);
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect(accessTokenRequest as any);
          }
          console.log(error);
        });
    }
  }, [instance, accounts, inProgress, accessToken]);

  return [{ accessToken }];
};

export default useAccessToken;
