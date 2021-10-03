import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import ScheduleIcon from '@material-ui/icons/Schedule';
import UpdateIcon from '@material-ui/icons/Update';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    height: 240,
  },
  speedDial: {
    position: 'absolute',
  },
}));

const actions = [
  { icon: <ScheduleIcon />, name: 'Timeline' },
  { icon: <NewReleasesIcon />, name: 'New' },
  { icon: <UpdateIcon />, name: 'Update' },
];

export default function MySpeedDial(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (id) => () => {
    handleClose();
    if(id == 0) props.toggleDrawer('bottom', true)
    else if(id == 1) props.handleOpenD('new');
    else if(id == 2) props.handleOpenD('update');
  }
  const handleOpen = () => {
    setOpen(true);
  };

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
