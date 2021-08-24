import React from "react";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { TextField, createStyles, makeStyles } from "@material-ui/core";
import NavBar from "../components/NavBar/NavBar";

import { Loading } from "../components/Loading";
import { ErrorComponent } from "../components/Error/ErrorComponent";
import { loginRequest } from "../authConfig";
import ReturnForm from "../components/ReturnForm/ReturnForm";
import { useAuthContext } from "../contexts/authContext";
import useUserName from "../hooks/useUserName";
import { RouteComponentProps } from "@reach/router";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: "120px",
    },
  })
);

const Return: React.FC<RouteComponentProps> = (): JSX.Element => {
  const classes = useStyles();

  const { accessToken, sessionId } = useAuthContext();
  const [
    {
      clickedOnUser,
      isUserNameValid,
      newSessionId,
      clickOnUser,
      onPersonalNumberchange,
    },
  ] = useUserName({
    accessToken,
  });

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
      {/* <NavBar clickOnUser={() => clickOnUser()} clickedOnUser={clickedOnUser} /> */}
      <div className={classes.container}>
        <ReturnForm
          sessionId={sessionId}
          accessToken={accessToken}
          isUserNameValid={isUserNameValid}
          onPersonalNumberchange={(
            event: React.FormEvent<HTMLInputElement> | any
          ) => onPersonalNumberchange(event)}
          newSessionId={newSessionId}
          clickedOnUser={clickedOnUser}
        />
      </div>
    </MsalAuthenticationTemplate>
  );
};

export default Return;
