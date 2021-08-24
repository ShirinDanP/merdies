import React, { useEffect } from "react";
import {
  Router,
  createMemorySource,
  createHistory,
  LocationProvider,
  Redirect,
  navigate,
} from "@reach/router";

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
import NavBar from "./components/NavBar/NavBar";

import { CustomNavigationClient } from "./utils/NavigationClient";
import { AuthContextProvider } from "./contexts/authContext";
import "./styles/globalStyle.css";
import { useHistory } from "react-router";

/* globals CSS_CONFIG */

interface AppProps {
  pca: IPublicClientApplication;
}

const App: React.FC<any> = ({ pca }: AppProps): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();

  const location = useLocation();
  const navigationClient = new CustomNavigationClient(history);
  pca.setNavigationClient(navigationClient);

 
  useEffect(() => {
    if (
      window.location.href.split("/").filter(function (item, i, allItems) {
        return i !== allItems.indexOf(item);
      }).length > 0
    ) {
      navigate(
        window.location.href
          .split("/")
          .filter(function (item, i, allItems) {
            return i == allItems.indexOf(item);
          })
          .join("/")
      );
    }
  });
  return (
    <MsalProvider instance={pca}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          {location.location.pathname === "/MeritWeb/" ||
          !location.location.pathname ? null : (
            <NavBar />
          )}
          <Router>
            <Redirect from="/" to="/MeritWeb" noThrow={true} />
            <LandingPage path="MeritWeb" />
            <Inventory path={`${t("pageUrls.inventory")}`} />
            <Return path={`${t("pageUrls.return")}`} />
            <ErrorReport path={`${t("pageUrls.errorReport")}`} />
            <ReturnInv path={`${t("pageUrls.returnInv")}`} />
            <Rekvisition path={`${t("pageUrls.rekvisition")}`} />
          </Router>
        </AuthContextProvider>
      </ThemeProvider>
    </MsalProvider>
  );
};

export default App;
