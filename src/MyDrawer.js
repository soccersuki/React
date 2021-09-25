import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import imgOsaka from './images/img_osaka.jpg';
import { Box, Fab, } from '@material-ui/core'
import SimpleTabs from './SimpleTabs';

import MyComponent from './Carousel'
import MediaCard from './MediaCard'

import ListIcon from '@material-ui/icons/List';

import CustomizedTimeline from './CustomizedTimeline'

const useStyles = makeStyles({
  root: {
    width: 'auto',
    height: '70%'
  }
});

export default function MyDrawer(props) {
  const classes = useStyles();

  const handleOpen = () => {
    props.toggleDrawer(props.anchor, true)
  }
  const handleClose = () => {
    console.log('open')
    props.toggleDrawer(props.anchor, false);
  }

  const content = (anchor) => (
    <div
      className={classes.root}
      role="presentation"
      onClick={handleClose}
      onKeyDown={handleClose}
    >
      {props.drawer}
    </div>
  );
  return (
    <div>
      <SwipeableDrawer
        anchor={props.anchor}
        open={props.state[props.anchor]}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        {content(props.anchor)}
      </SwipeableDrawer>
    </div>
  );
}
