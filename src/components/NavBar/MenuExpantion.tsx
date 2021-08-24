import React from "react";
import { useTranslation } from "react-i18next";
import { ExitToApp } from "@material-ui/icons";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { Link } from "@reach/router";

import { PageValues } from "../../types/types";

interface MenuExpansionProps {
  showPageTitle: string;
  pageValues: PageValues;
  onClickNavigationButton: (key: string) => void;
  logOut: () => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    linkContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    list: {
      width: "100%",
      padding: "0",
    },
    itemIcon: {
      minWidth: "0",
      color: theme.palette.secondary.contrastText,
      marginRight: "10px",
    },
    itemText: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      textDecoration: "none",
      fontFamily: "Arial",
      textAlign: "right",
      color: "white",
      fontSize: "1rem",
    },

    divider: {
      backgroundColor: theme.palette.secondary.contrastText,
    },
  })
);

const MenuExpansion: React.FC<MenuExpansionProps> = ({
  showPageTitle,
  pageValues,
  onClickNavigationButton,
  logOut,
}): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <List className={classes.list}>
        {showPageTitle !== t("meritTitle") && (
          <>
            {Object.keys(pageValues).map((key: string, index: number) => (
              <ListItem button key={index} className={classes.linkContainer}>
                {/* <ListItemText
                  className={classes.itemText}
                  primary={pageValues[key]}
                  onClick={() => onClickNavigationButton(key)}
                /> */}
                <Link
                  to={key}
                  className={classes.itemText}
                  onClick={() => onClickNavigationButton(key)}
                >
                  {pageValues[key]}
                </Link>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </>
        )}
        <ListItem button onClick={() => logOut()}>
          <ListItemIcon className={classes.itemIcon}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText
            className={classes.itemText}
            primary={t("pageValues.logOut")}
            onClick={() => logOut()}
          />
        </ListItem>
      </List>
    </>
  );
};

export default MenuExpansion;
