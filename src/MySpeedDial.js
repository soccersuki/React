import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import ScheduleIcon from '@material-ui/icons/Schedule';
import UpdateIcon from '@material-ui/icons/Update';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

import CustomizedTimeline from './CustomizedTimeline'
import { useContext, } from 'react';
import { AppContext } from './MyContext'

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    height: 180,
  },
  speedDial: {
    position: 'absolute',
  },
}));

const actions = [
  { icon: <ScheduleIcon />, name: 'Timeline' },
  { icon: <NewReleasesIcon />, name: 'New' },
];

export default function MySpeedDial(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { dialogState, drawerState, } = useContext(AppContext)
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClick = (id) => () => {
    if(id == 0) drawerState.toggle('bottom', true, <CustomizedTimeline />)
    else if(id == 1) dialogState.handleOpen('new');
  }

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={'up'}
        >
          {actions.map((action, id) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClick(id)}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
}
