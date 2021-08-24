import React, { useState, useEffect } from "react";
import {
  Button,
  makeStyles,
  createStyles,
  Typography,
} from "@material-ui/core";
import {
  useMsal,
  useAccount,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "@reach/router";

import useDirectNavigation from "../hooks/useDirectNavigation";
import usePageValues from "../hooks/usePageValues";
import Login from "./Login";
import NavBar from "../components/NavBar/NavBar";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: "140px",
      display: "flex",
      flexDirection: "column",
    },
    button: {
      marginTop: "30px",
      color: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#4ba692",
      },
    },
  })
);

const LandingPage: React.FC<RouteComponentProps> = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [{ pageValues }] = usePageValues();
  const [{ pageContext }, { onClickNavigationButton }] = useDirectNavigation();
  const [name, setName] = useState("");
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  useEffect(() => {
    if (account && account.name) {
      setName(account.name.split(" ")[0]);
    }
  }, [account]);

  return (
    <>
      {account ? (
        <>
          <NavBar />
          <div className={classes.container}>
            {name && (
              <Typography variant="h5">
                {`${t("components.landingPage.welcome")}, ${name}`}
              </Typography>
            )}
            {Object.keys(pageValues).map((value: string, index: number) => (
              <Button
                key={index}
                className={classes.button}
                onClick={() => onClickNavigationButton(value)}
              >
                {pageValues[value]}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default LandingPage;
