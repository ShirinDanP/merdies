import React from "react";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { TextField, createStyles, makeStyles } from "@material-ui/core";

import { Loading } from "../components/Loading";
import { ErrorComponent } from "../components/Error/ErrorComponent";
import { loginRequest } from "../authConfig";
import ReturnForm from "../components/ReturnForm/ReturnForm";
import { useAuthContext } from "../contexts/authContext";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: "120px",
    },
  })
);

const Return: React.FC = (): JSX.Element => {
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
        <ReturnForm sessionId={sessionId} accessToken={accessToken} />
      </div>
    </MsalAuthenticationTemplate>
  );
};

export default Return;
