import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch, useSelector } from 'react-redux';

import { openLeftDrawer, setCurrentView } from '../../store/slice/appSlice'
import Link from 'next/link';


import { returnUrl } from '../../utils/routingUtils';

export default function TemporaryDrawer() {

  //   const [state, setState] = React.useState({
  //     top: false,
  //     left: false,
  //     bottom: false,
  //     right: false,
  //   });

  const leftDrawerState = useSelector(state => state.app.leftDrawerOpen)
  const dispatch = useDispatch()


  const toggleDrawer = (anchor, open) => (event) => {
    dispatch(openLeftDrawer());
  };

  const handleCurrentViewChange = (text) => {
    dispatch(setCurrentView(text));

  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      
    >
      <List key={anchor}>
        {['Dashboard', 'Ticket Management'].map((text, index) => (
          <Link  scroll={false} key={index} href={`/${returnUrl(text)}`} 
          
          >
          <ListItem key={text} disablePadding 
          sx={{
            color : 'white',
            textDecoration:'none'
          }}
          >

            <ListItemButton onClick={() => handleCurrentViewChange(text)}>

              <ListItemIcon sx={{color : 'white'}}>
                {index % 2 === 0 ? <InboxIcon  /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText   sx={{textDecoration:'none'}} primary={text} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <Link to={`/${text}`}><ListItemText primary={text} /></Link>
              
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <Drawer
      anchor={"left"}
      open={leftDrawerState}
      onClose={toggleDrawer("left", false)}
      PaperProps={{
        sx: {
          backgroundColor: '#12344d',
          color: 'white',
          textDecoration: 'none'
        }
      }}
    >
      {list("left")}
    </Drawer>
    // <div>
    //   {['left', 'right', 'top', 'bottom'].map((anchor) => (
    //     <React.Fragment key={anchor}>
    //       <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
    //     </React.Fragment>
    //   ))}
    // </div>
  );
}