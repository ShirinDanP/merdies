import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  TextField,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useMsal } from "@azure/msal-react";
import { navigate } from "@reach/router";

import useReturn from "../../hooks/useReturn";
import RequisitionsList from "./RequisitionList";
import useShowModalMessage from "../../hooks/useShowModalMessage";
import ErrorOrSuccessMsg from "../Error/ErrorOrSuccessMsg";
import Modal from "../Modal";
import Spinner from "../Spinner";

interface RekvisitionProps {
  sessionId: string;
  accessToken: string | null;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& > *": {
        marginTop: "16px",
        "& .Mui-focused": {
          fontWeight: "bold",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#387C6D",
        },
      },
    },

    button: {
      marginTop: "32px",
      color: "#FFFFFF",
      width: "100%",
      "&:hover": {
        backgroundColor: "#4ba692",
      },
      "&:disabled": {
        backgroundColor: "#6FB7A7",
      },
    },
  })
);
const RekvisitionForm: React.FC<RekvisitionProps> = ({
  sessionId,
  accessToken,
}): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const requisitionNr = localStorage.getItem("requisitionNr");
  const [{ utforUttag, getUtforUttagResponse, openModal }] = useReturn({
    sessionId,
    accessToken,
  });
  const [requisitionList, setRequisitionList] = useState([]);
  const [{ isLoading, setIsLoading }] = useShowModalMessage({
    response: getUtforUttagResponse,
  });
  const onAddButtonClick = (): void => {
    navigate(`/${t("pageUrls.returnInv")}`);
  };
  const onDoneMenuclick = (): void => {
    setIsLoading(true);
    utforUttag(false);
  };

  const logout = (): void => {
    setIsLoading(true);
    utforUttag(true);
  };

  const retrievedRequisitionLists = localStorage.getItem(
    "RequisitionList"
  ) as any;
  const requisitionLists = JSON.parse(retrievedRequisitionLists);

  useEffect((): void => {
    const requisitionLists = localStorage.getItem("RequisitionList") as any;
    setRequisitionList(JSON.parse(requisitionLists));
  }, [requisitionLists]);

  return (
    <div>
      <TextField
        id="name"
        label={t("components.rekvisition.rekvisitionNumber")}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={requisitionNr}
        fullWidth
        disabled
      />
      <RequisitionsList
        requisitionLists={requisitionList}
        sessionId={sessionId}
        accessToken={accessToken}
      />
      <Button className={classes.button} onClick={onAddButtonClick}>
        {t("components.rekvisition.buttons.add")}
      </Button>
      <Button className={classes.button} onClick={onDoneMenuclick}>
        {t("components.rekvisition.buttons.done")}
      </Button>
      <Button className={classes.button} onClick={logout}>
        {t("components.rekvisition.buttons.logOut")}
      </Button>
      <Modal
        close={() => console.log()}
        shown={isLoading}
        position="center"
        display="flex"
      >
        <Spinner />
      </Modal>
      {openModal && <ErrorOrSuccessMsg response={getUtforUttagResponse} />}
    </div>
  );
};

export default RekvisitionForm;
