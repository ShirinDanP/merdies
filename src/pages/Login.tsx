import React from "react";
import { useTranslation } from "react-i18next";
import {
  makeStyles,
  createStyles,
  Button,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { useMsal } from "@azure/msal-react";
import { RouteComponentProps } from "@reach/router";

import LogoIcon from "../assets/logoicon.svg";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      alignItems: "center",
      height: "70vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    button: {
      marginTop: "40px",
      width: "80%",
      color: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#4ba692",
      },
    },
    logoContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
    },
    logo: {
      marginRight: "10px",
    },
    text: {
      fontWeight: "bold",
    },
  })
);
const Login: React.FC<RouteComponentProps> = (): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { instance } = useMsal();

  const login = () => {
    instance.loginRedirect();
  };

  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <CardMedia className={classes.logo} component="img" image={LogoIcon} />
        <Typography className={classes.text} variant="h4">
          {t("meritTitle")}
        </Typography>
      </div>
      <Button className={classes.button} onClick={() => login()}>
        {t("components.login")}
      </Button>
    </div>
  );
};

export default Login;
