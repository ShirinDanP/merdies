import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  spacing: [0, 2, 4, 8, 16, 32, 64],
  palette: {
    secondary: {
      main: "#387C6D",
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      backgroundColor: "#387C6D",
      height: "50px",
      fontSize: "16px",
    },
  },
});

theme = responsiveFontSizes(theme);
export default theme;
