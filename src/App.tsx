import * as React from "react";
import { useHistory, BrowserRouter } from "react-router-dom";
import { Router } from "@reach/router";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { IPublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useIsAuthenticated } from "@azure/msal-react";
import { useTranslation } from "react-i18next";

import LandingPage from "./pages/LandingPage";
import theme from "./styles/theme";
import Inventory from "./pages/Inventory";
import Return from "./pages/Return";
import ReportFailure from "./pages/ReportFailure";
import { Route } from "./components/Route";
import { CustomNavigationClient } from "./utils/NavigationClient";

import "./styles/globalStyle.css";

interface AppProps {
  pca: IPublicClientApplication;
}

const App: React.FC<any> = ({ pca }: AppProps): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const navigationClient = new CustomNavigationClient(history);
  pca.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={pca}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router>
            <Route path="/" component={LandingPage} />
            <Route path={`/${t("pageUrls.inventory")}`} component={Inventory} />
            <Route path={`/${t("pageUrls.return")}`} component={Return} />
            <Route
              path={`/${t("pageUrls.falseReport")}`}
              component={ReportFailure}
            />
          </Router>
        </BrowserRouter>
      </ThemeProvider>
    </MsalProvider>
  );
};

export default App;
