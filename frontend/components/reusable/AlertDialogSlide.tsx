import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: theme.palette.secondary.main,
        '& h2': {
            backgroundColor: '#12344d',
            color : 'white'
        }
    },
    vSpace: {
      margin: theme.spacing(2, 0)
    },

    
  }));


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({open,getAlertOutput, title, description}:{description: String, title:String, open:boolean, getAlertOutput:Function}) {
  // const [open, setOpen] = React.useState(false);



  const classes = useStyles();

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className={classes.root}
      >
        <DialogTitle>{"Update Ticket"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {open=false; getAlertOutput(false)}}>Cancel</Button>
          <Button onClick={() => {open=false; getAlertOutput(true)}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}