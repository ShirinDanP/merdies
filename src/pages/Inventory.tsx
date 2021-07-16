import React from "react";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { createStyles, makeStyles } from "@material-ui/core";

import { Loading } from "../components/Loading";
import { ErrorComponent } from "../components/ErrorComponent";
import { loginRequest } from "../authConfig";
import NavBar from "../components/NavBar/NavBar";
import InventoryForm from "../components/InventoryForm";

import useSessionId from "../hooks/useSessionId";
import useAccessToken from "../hooks/useAccessToken";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: "120px",
    },
  })
);

const Inventory: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [{ accessToken }] = useAccessToken();
  const [{ sessionId }] = useSessionId(accessToken || "");

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
      <NavBar />
      <div className={classes.container}>
        <InventoryForm sessionId={sessionId} accessToken={accessToken} />
      </div>
    </MsalAuthenticationTemplate>
  );
};

export default Inventory;