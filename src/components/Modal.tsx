import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";

interface ModalProps {
  children: any;
  shown: boolean;
  close: () => void;
  backgroundColor?: string;
  position?: string;
  display?: string;
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
      display: ({ display }: any): string => display,
      justifyContent: ({ position }: any): string => position,
      alignItems: ({ position }: any): string => position,
      backgroundColor: ({ backgroundColor }: any): string => backgroundColor,
    },
  })
);
const Modal: React.FC<ModalProps> = ({
  children,
  shown,
  close,
  backgroundColor,
  position,
  display
}) => {
  const props = {
    backgroundColor,
    position,
    display
  };
  const classes = useStyle(props);
  return shown ? (
    <div
      className={classes.modalBackdrop}
      onClick={() => {
        close();
      }}
    >
      <div
        className={classes.modalContent}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
