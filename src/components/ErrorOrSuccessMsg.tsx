import React from "react";
import { Snackbar, createStyles, makeStyles } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useTranslation } from "react-i18next";

import Modal from "./Modal";
import useShowModalMessage from "../hooks/useShowModalMessage";

interface ErrorOrSuccessProps {
  response: any;
}

const useStyles = makeStyles(() =>
  createStyles({
    snackbar: { height: "100%" },
  })
);

const ErrorOrSuccessMsg: React.FC<ErrorOrSuccessProps> = ({
  response,
}): JSX.Element => {
  const [{ showSuccess, handleCloseSuccess }] = useShowModalMessage({
    response,
  });
  const classes = useStyles();
  const { t } = useTranslation();

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <>
      {showSuccess === "success" && (
        <Snackbar
          open={showSuccess === "success"}
          autoHideDuration={4000}
          onClose={handleCloseSuccess}
          className={classes.snackbar}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert severity="success">
            {t("components.errors.submissionSuccessFul")}
          </Alert>
        </Snackbar>
      )}
      {showSuccess === "errorFail" && (
        <Snackbar
          open={showSuccess === "errorFail"}
          autoHideDuration={4000}
          onClose={handleCloseSuccess}
          className={classes.snackbar}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert severity="error">
            {t("components.errors.submissionErrorFailed")}
          </Alert>
        </Snackbar>
      )}
      <Modal
        shown={showSuccess === "fail"}
        close={handleCloseSuccess}
        backgroundColor="white"
      >
        {t("components.errors.submissionFailed")}
      </Modal>
    </>
  );
};

export default ErrorOrSuccessMsg;
