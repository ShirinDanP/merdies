import React from "react";
import { Button, makeStyles, createStyles } from "@material-ui/core";

import useDirectNavigation from "../hooks/useDirectNavigation";
import usePageValues from "../hooks/usePageValues";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      marginTop: "140px",
      display: "flex",
      flexDirection: "column",
    },
    button: {
      marginTop: "30px",
      textTransform: "none",
      color: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#4ba692",
      },
    },
  })
);

const LandingPage: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [{ pageValues }] = usePageValues();
  const [{ pageContext }, { onClickNavigationButton }] = useDirectNavigation();

  return (
    <div className={classes.container}>
      {Object.keys(pageValues).map((key: string, index: number) => (
        <Button
          key={index}
          className={classes.button}
          onClick={() => onClickNavigationButton(key)}
        >
          {pageValues[key]}
        </Button>
      ))}
    </div>
  );
};

export default LandingPage;
