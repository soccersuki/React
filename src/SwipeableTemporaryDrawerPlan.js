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
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawerPlan(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const {place} = props;
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {props.drawer}
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={props.anchor}
        open={state[props.anchor]}
        onClose={toggleDrawer(props.anchor, false)}
        onOpen={toggleDrawer(props.anchor, true)}
      >
        {list(props.anchor)}
      </SwipeableDrawer>
      <Box onClick={toggleDrawer(props.anchor, true)}>
        {props.contents}
      </Box>

    </div>
  );
}
