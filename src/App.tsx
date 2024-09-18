import {
  IPublicClientApplication,
  InteractionStatus,
  InteractionType,
} from "@azure/msal-browser";
import "./App.css";
import {
  useMsal,
  MsalProvider,
  MsalAuthenticationTemplate,
} from "@azure/msal-react";
import { useEffect, lazy, Suspense } from "react";
import MicrosoftLoginLogoutPanel from "./auth/components/microsoft-loading";
import { BrowserRouter } from "react-router-dom";
import msalConfig from "./auth/authConfig";
import useAuth from "./hooks/use-auth";
import { useLocalStorage } from "./hooks/use-local-storage";
import {Toaster} from "@/components/ui/toaster";

type AppProps = {
  pca: IPublicClientApplication;
};

const AppRoutes = lazy(() => import("./routes/AppRoutes"));

function ErrorComponent() {
  return <p>An Error Occurred!</p>;
}

function LoadingComponent() {
  return <p>Authentication in progress...</p>;
}

function WrappedApp() {
  const { instance, accounts, inProgress } = useMsal();

  const { login, logout } = useAuth();

  useEffect(() => {
    if (accounts.length > 0) {
      const activeAccount = instance.getActiveAccount();

      if (activeAccount && inProgress === InteractionStatus.None) {
        const expirationTime = activeAccount?.idTokenClaims?.exp;
        const now = Math.floor(Date.now() / 1000);

        if (expirationTime && expirationTime < now) {
          //Maybe use instance.logout() instead?
          instance.loginRedirect();
        }
      }
    }
  }, [accounts, inProgress]);

  useEffect(() => {
    if (accounts.length > 0 && inProgress === InteractionStatus.None) {
      const activeAccount = instance.getActiveAccount();
      if (activeAccount) {
        login();
      }
    }
  }, [accounts, inProgress, instance]);

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={msalConfig.graph}
      errorComponent={ErrorComponent}
      loadingComponent={MicrosoftLoginLogoutPanel}
    >
      <AuthenticatedDashboard />
    </MsalAuthenticationTemplate>
  );
}

function AuthenticatedDashboard() {
  const { listenForUserData } = useLocalStorage();
  const userData = listenForUserData();

  if (!userData) {
    return <MicrosoftLoginLogoutPanel />;
  }
  return (
    <BrowserRouter>
      <Suspense fallback={<MicrosoftLoginLogoutPanel />}>
        <Toaster/>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

function App({ pca }: AppProps) {
  return (
    <MsalProvider instance={pca}>
      <WrappedApp />
    </MsalProvider>
  );
}

export default App;
