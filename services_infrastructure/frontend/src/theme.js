import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Lexend Deca"
  },
  palette: {
    primary: {
      main: '#000000',
      light: '#333333',
      dark: '#000000',
      contrastText: "#fff"
    },
    secondary: {
      main: "#90caf9",
      light: "#a6d4fa",
      dark: "#648dae",
      contrastText: "#fff",
    },
  },
  drawerWidth: 256,
});

export default theme