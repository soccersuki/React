import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Box, Avatar, Typography, } from '@material-ui/core'
import NavigationIcon from '@material-ui/icons/Navigation';

import indigo from '@material-ui/core/colors/indigo';

export default function ScrollDialog(props) {
  const handleClose = () => {
    props.handleClose();
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (props.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle style={{backgroundColor: indigo[500]}}>
          <Box display="flex">
            <Avatar>
              <NavigationIcon />
            </Avatar>
            <Typography variant='h4' style={{color: 'white', marginLeft: 10}}>Plan</Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers={'paper' === 'paper'} >
          {props.content}
        </DialogContent>
      </Dialog>
    </div>
  );
}
