import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./components/Main";

// Loading Material UI Themeing
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ListItemSecondaryAction } from '@material-ui/core';

// Building the MUI Theme
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#27486E",
            contrastText: "white"
        },
        secondary: {
            main: "#9EA0A5",
            contrastText: "#000000"
        },
        error:{
            main: "#FF0000",
            contrastText: "white"
        }
    }
});

// Loading the Core React Element
ReactDOM.render(
    <MuiThemeProvider theme = {theme}>
        <Main />
    </MuiThemeProvider>
, document.getElementById('root'));