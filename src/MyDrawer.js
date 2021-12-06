import React from 'react';
import {Box, SwipeableDrawer} from '@mui/material/';


export default function MyDrawer(props) {
  const handleOpen = () => {
    props.toggle(props.anchor, true)
  }
  const handleClose = () => {
    props.toggle(props.anchor, false);
  }
  const content = (anchor) => (
    <Box sx={{width: '100%', height: '100vh'}}>
      {props.content}
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor={props.anchor}
      open={props.open[props.anchor]}
      onClose={handleClose}
      onOpen={handleOpen}
    >
      {content(props.anchor)}
    </SwipeableDrawer>
  );
}
