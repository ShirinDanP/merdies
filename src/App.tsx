import React, { useEffect } from "react";
import { useHistory, BrowserRouter, Switch } from "react-router-dom";
import { Router } from "@reach/router";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { IPublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { useTranslation } from "react-i18next";

import useLocation from "../src/hooks/useLocation";
import LandingPage from "./pages/LandingPage";
import theme from "./styles/theme";
import Inventory from "./pages/Inventory";
import Return from "./pages/Return";
import ErrorReport from "./pages/ErrorReport";
import ReturnInv from "./pages/ReturnInv";
import Rekvisition from "./pages/Rekvisition";
import { Route } from "./components/Route";
import NavBar from "./components/NavBar/NavBar";

import { CustomNavigationClient } from "./utils/NavigationClient";
import { AuthContextProvider } from "./contexts/authContext";
import "./styles/globalStyle.css";

interface AppProps {
  pca: IPublicClientApplication;
}

const App: React.FC<any> = ({ pca }: AppProps): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const navigationClient = new CustomNavigationClient(history);
  pca.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={pca}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <BrowserRouter>
            {location.location.pathname === "/" ||
            !location.location.pathname ? null : (
              <NavBar />
            )}
            <Router>
              <Route path="/" component={LandingPage} />
              <Route
                path={`/${t("pageUrls.inventory")}`}
                component={Inventory}
              />
              <Route path={`/${t("pageUrls.return")}`} component={Return} />
              <Route
                path={`/${t("pageUrls.errorReport")}`}
                component={ErrorReport}
              />
              <Route
                path={`/${t("pageUrls.returnInv")}`}
                component={ReturnInv}
              />
              <Route
                path={`/${t("pageUrls.rekvisition")}`}
                component={Rekvisition}
              />
            </Router>
          </BrowserRouter>
        </AuthContextProvider>
      </ThemeProvider>
    </MsalProvider>
  );
};

export default App;
