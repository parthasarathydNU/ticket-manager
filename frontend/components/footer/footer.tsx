/**
 * File Name: theme.js
 * Author: Dhruv Parthasarathy
 * File Created: 
 * Last Modified: Dec, 8th, Thu
 * 
 * About: 
 * This file contains the footer component of the app
 * This is a static component that is present all through the application
 */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import styles from './_footer.module.scss';

export default function FooterComponent() {
  return (
    <div className={styles.positioner}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" 
       sx={{
        bgcolor : '#FFFFFF',
        color : '#12344d'
      }} >
        <Toolbar className={styles.wrapper}>
          Designed with ♥ by Aravind, Dhruv, Divya and Geetha
        </Toolbar>
      </AppBar>
    </Box>
    </div>

  );
}