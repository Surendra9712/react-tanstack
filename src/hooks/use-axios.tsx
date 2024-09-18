import axios from "axios";
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { BASE_URL } from "../api-config";
import authConfig from "../auth/authConfig";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useLocalStorage } from "./use-local-storage";

const ORIGIN_URL = `${window.location.origin}`;

const api = axios.create({
  baseURL: BASE_URL || ORIGIN_URL,
});

function useAxios(requireAuth = false) {
  const { instance, accounts } = useMsal();
  const { api: authApiConfig } = authConfig;
  const { getUserData } = useLocalStorage();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      async (config) => {
        let userData = getUserData();
        if (userData) {
          config.headers["X-User-Data"] = userData;
        }
        if (!requireAuth) {
          return config;
        }
        const activeAccount = instance.getActiveAccount(); // Assume the first account is the active one

        if (activeAccount) {
          const request = {
            scopes: authApiConfig.scopes,
            account: activeAccount,
          };

          try {
            // Try to get the token silently
            const response = await instance.acquireTokenSilent(request);
            config.headers.Authorization = `Bearer ${response.accessToken}`;
          } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
              // Interaction required; trigger a login redirect or popup
              try {
                await instance.loginRedirect(request);
              } catch (err) {
                console.error(err);
              }
            } else {
              // Other errors, possibly network or unknown errors
              console.error(error);
            }
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor when the component using this hook unmounts
    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [instance.getActiveAccount(), accounts, requireAuth]); // Ensure effect re-runs if instance or accounts change

  return api;
}

export default useAxios;
