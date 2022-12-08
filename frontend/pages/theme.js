/**
 * File Name: theme.js
 * Author: Dhruv Parthasarathy
 * File Created: Dec, 8th, Thu
 * Last Modified: Dec, 8th, Thu
 * 
 * About: 
 * This file contains the base theme of the application
 */
// import {Roboto} from '@next/font/google'
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// export const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['Helvetica', 'Arial', 'sans-serif'],
// });

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      // main: '#556cd6',
      main: '#12344d'
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },

  },
  autocomplete : {
    height : '35px',
    padding : 0
  }
//   typography: {
//     fontFamily: roboto.style.fontFamily,
//   },
});

export default theme;