import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";

interface ModalProps {
  children: any;
  shown: boolean;
  close: () => void;
  backgroundColor: string;
}

const useStyle = makeStyles(() =>
  createStyles({
    modalBackdrop: {
      position: "fixed",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2,
    },
    modalContent: {
      width: "100%",
      minHeight: "200px",
      padding: "25px",
      backgroundColor: ({ backgroundColor }: any): string => backgroundColor,
    },
  })
);
const Modal: React.FC<ModalProps> = ({
  children,
  shown,
  close,
  backgroundColor,
}) => {
  const props = {
    backgroundColor: backgroundColor,
  };
  const classes = useStyle(props);
  return shown ? (
    <div
      className={classes.modalBackdrop}
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
    >
      <div
        className={classes.modalContent}
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
