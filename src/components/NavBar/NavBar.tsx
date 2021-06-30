import React, { useState } from "react";
import {
  makeStyles,
  createStyles,
  AppBar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Menu, Close } from "@material-ui/icons";

import useLocation from "../../hooks/useLocation";
import usePageValues from "../../hooks/usePageValues";
import useDirectNavigation from "../../hooks/useDirectNavigation";
import LogoIcon from "../../assets/logoicon.svg";
import MenuExpansion from "./MenuExpantion";
import { on } from "process";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      backgroundColor: "#343F56",
      color: theme.palette.secondary.contrastText,
      "&.MuiAccordion-rounded": {
        borderRadius: 0,
      },
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: "80px",
    },
    menuIcon: {
      color: theme.palette.secondary.contrastText,
    },
    logo: {
      height: "40px",
      width: "40px",
      marginRight: "10px",
    },
    logoContainer: {
      width: "150px",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
    },
    accordionDetail: {
      justifyContent: "flex-end",
      padding: "0",
    },
  })
);

const NavBar: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [{ pageValues }] = usePageValues();
  const location = useLocation();
  const [{ pageContext }, { onClickNavigationButton }] = useDirectNavigation();
  const [menuIcon, setMenuIcon] = useState<boolean>(false);

  const handleMenu = (): void => {
    setMenuIcon(!menuIcon);
  };

  const locationName = location.location.pathname.slice(1);
  const showPageTitle =
    locationName === "/" || !locationName
      ? t("meritTitle")
      : t(`pageValues.${locationName}`);

  return (
    <AppBar>
      <Accordion
        className={classes.container}
        expanded={menuIcon}
        onChange={handleMenu}
      >
        <AccordionSummary
          expandIcon={
            menuIcon ? (
              <Close className={classes.menuIcon} />
            ) : (
              <Menu className={classes.menuIcon} />
            )
          }
        >
          <div className={classes.logoContainer}>
            <CardMedia
              className={classes.logo}
              component="img"
              image={LogoIcon}
            />
            <Typography variant="h5">{showPageTitle}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetail}>
          <MenuExpansion
            showPageTitle={showPageTitle}
            pageValues={pageValues}
            onClickNavigationButton={onClickNavigationButton}
          />
        </AccordionDetails>
      </Accordion>
    </AppBar>
  );
};
export default NavBar;
