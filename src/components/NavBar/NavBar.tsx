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
  Button,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import {
  Menu,
  Close,
  PersonAddDisabledSharp,
  PersonAddSharp,
} from "@material-ui/icons";
import { useMsal } from "@azure/msal-react";

import useLocation from "../../hooks/useLocation";
import usePageValues from "../../hooks/usePageValues";
import useDirectNavigation from "../../hooks/useDirectNavigation";
import useUserName from "../../hooks/useUserName";
import LogoIcon from "../../assets/logoicon.svg";
import MenuExpansion from "./MenuExpantion";
import { useAuthContext } from "../../contexts/authContext";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      backgroundColor: "#343F56",
      color: theme.palette.secondary.contrastText,
      "&.MuiAccordion-rounded": {
        borderRadius: 0,
      },
      padding: "5px",
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: "75px",
    },
    menuIcon: {
      color: theme.palette.secondary.contrastText,
    },
    logo: {
      width: "50px",
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
    accordionSummary: {
      height: "75px",
    },
    button: {
      display: "contents",
      backgroundColor: "none",
    },
    titleContent: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "80%",
      alignSelf: "center",
    },
  })
);
interface NavBarProps {
  clickOnUser?: () => void;
  clickedOnUser?: boolean;
}
const NavBar: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [{ pageValues }] = usePageValues();
  const location = useLocation();
  const [menuIcon, setMenuIcon] = useState<boolean>(false);
  const { instance } = useMsal();
  const [{ pageContext }, { onClickNavigationButton }] = useDirectNavigation();

  const handleMenu = (): void => {
    setMenuIcon(!menuIcon);
  };

  const locationName = location.location.pathname.slice(1);
  const showPageTitle =
    locationName === "/" || !locationName
      ? t("meritTitle")
      : t(`pageValues.${locationName}`);
  const { accessToken, sessionId } = useAuthContext();
  const [{ clickedOnUser, clickOnUser }] = useUserName({
    accessToken,
  });
  const navigateAndCloseMenu = (value: string): void => {
    setMenuIcon(false);
    onClickNavigationButton(value);
  };
  return (
    <AppBar>
      <Accordion
        className={classes.container}
        onClick={handleMenu}
        expanded={menuIcon}
      >
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={
            menuIcon ? (
              <Close className={classes.menuIcon} />
            ) : (
              <Menu className={classes.menuIcon} />
            )
          }
        >
          <div
            className={classes.logoContainer}
            onClick={(event) => event.stopPropagation()}
          >
            <CardMedia
              className={classes.logo}
              component="img"
              image={LogoIcon}
            />
            <Typography variant="h5">{showPageTitle}</Typography>
            <div className={classes.titleContent}>
              {window.location.pathname === "/MeritWeb/return" ||
              window.location.pathname === "/MeritWeb/uttag" ? (
                <Button className={classes.button} onClick={clickOnUser}>
                  {clickedOnUser ? (
                    <PersonAddSharp className={classes.menuIcon} />
                  ) : (
                    <PersonAddDisabledSharp className={classes.menuIcon} />
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        </AccordionSummary>

        <AccordionDetails className={classes.accordionDetail}>
          <MenuExpansion
            showPageTitle={showPageTitle}
            pageValues={pageValues}
            onClickNavigationButton={(value) => navigateAndCloseMenu(value)}
            logOut={() => instance.logoutRedirect()}
          />
        </AccordionDetails>
      </Accordion>
    </AppBar>
  );
};
export default NavBar;
