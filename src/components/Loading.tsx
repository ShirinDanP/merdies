import { Typography, makeStyles, createStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: "300px",
      display: "flex",
      justifyContent: "center",
    },
  })
);
export const Loading = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Typography variant="h6" className={classes.container}>
      {t("components.loading")}
    </Typography>
  );
};
