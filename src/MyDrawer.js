import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '80vh',
  }
});

export default function MyDrawer(props) {
  const classes = useStyles();

  const handleOpen = () => {
    props.toggle(props.anchor, true)
  }
  const handleClose = () => {
    props.toggle(props.anchor, false);
  }
  const content = (anchor) => (
    <div
      className={classes.root}
      role="presentation"
      onKeyDown={handleClose}
    >
      {props.content}
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={props.anchor}
        open={props.open[props.anchor]}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        {content(props.anchor)}
      </SwipeableDrawer>
    </div>
  );
}
