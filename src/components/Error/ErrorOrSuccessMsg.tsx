import React from "react";
import {
  Snackbar,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useTranslation } from "react-i18next";

import Modal from "../Modal";
import useShowModalMessage from "../../hooks/useShowModalMessage";

interface ErrorOrSuccessProps {
  response: any;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& > *": {
        "& .MuiAlert-filledSuccess": {
          color: "#FFFFFF",
          border: "2px solid #387C6D",
          backgroundColor: "#387C6D",
        },
        "& .MuiAlert-filledError": {
          color: "#FFFFFF",
          border: "2px solid #ff9966",
          backgroundColor: "#ff9966",
        },
      },
    },
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
  const isSuccesMessage = showSuccess === "success";
  const isFailedMessage = showSuccess === "errorFail";

  const showMessageType = showSuccess === "success" ? "success" : "error";

  const replacementMessage = (): string => {
    if (isSuccesMessage && !response.ErrorMessage)
      return t("components.errors.submissionSuccessFul");
    else if (isFailedMessage && !response.ErrorMessage) {
      return t("components.errors.submissionErrorFailed");
    } else {
      return `${response.ErrorMessage} ${
        response.WorkOrderId ? response.WorkOrderId : ""
      }`;
    }
  };
  return (
    <div className={classes.root}>
      {(isSuccesMessage || isFailedMessage) && (
        <Snackbar
          open={isSuccesMessage || isFailedMessage}
          autoHideDuration={3000}
          onClose={handleCloseSuccess}
          className={classes.snackbar}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert severity={showMessageType}>{replacementMessage()}</Alert>
        </Snackbar>
      )}

      <Modal
        shown={showSuccess === "fail"}
        close={handleCloseSuccess}
        backgroundColor="white"
      >
        <Typography> {t("components.errors.submissionFailed")}</Typography>
      </Modal>
    </div>
  );
};

export default ErrorOrSuccessMsg;
