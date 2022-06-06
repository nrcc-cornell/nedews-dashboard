import React from 'react';
import ReactDOM from 'react-dom';
import 'es6-shim';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import App from './App';
import './Dews.css'

document.title = 'Northeast DEWS'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)