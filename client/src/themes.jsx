import { createMuiTheme } from '@material-ui/core/styles';

export const Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#B2EBF2',
      main: '#00BCD4',
      dark: '#0097A7',
      contrastText: '#FFFFFF',
      accentColor: '#00BCD4',
      primaryText: '#212121',
      secondaryText: '#757575',
      dividerColor: '#BDBDBD'
    },
    market: {
      open: '#2ecc71',
      closed: '#e74c3c'
    }
  },
});