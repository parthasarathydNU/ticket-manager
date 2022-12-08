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
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button> */}
          Designed with ♥ by Aravind, Dhruv, Divya and Geetha
        </Toolbar>
      </AppBar>
    </Box>
    </div>

  );
}