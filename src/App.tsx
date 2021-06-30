import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import { Router } from "@reach/router";

import { Route } from "./components/Route";
import LandingPage from "./routes/LandingPage";
import theme from "./styles/theme";
import NavBar from "./components/NavBar";

import "./styles/globalStyle.css";

const App = (): React.ReactElement => (
  <>
    <NavBar />
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Router basepath={`${process.env.PUBLIC_URL}/`}>
        <Route path="/" component={LandingPage} />
      </Router>
    </ThemeProvider>
  </>
);

export default App;
