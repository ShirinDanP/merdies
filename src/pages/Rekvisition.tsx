import React from "react";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { makeStyles, createStyles } from "@material-ui/core";

import { Loading } from "../components/Loading";
import { ErrorComponent } from "../components/Error/ErrorComponent";
import { loginRequest } from "../authConfig";
import NavBar from "../components/NavBar/NavBar";
import RekvisitionForm from "../components/RekvisitionForm/RekvisitionForm";
import { useAuthContext } from "../contexts/authContext";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: "120px",
    },
  })
);

const Rekvisition: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const { accessToken, sessionId } = useAuthContext();

  const authRequest = {
    ...loginRequest,
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      <div className={classes.container}>
        <RekvisitionForm sessionId={sessionId} accessToken={accessToken} />
      </div>
    </MsalAuthenticationTemplate>
  );
};

export default Rekvisition;
