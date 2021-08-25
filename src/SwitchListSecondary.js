import React from 'react';
import { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import { TextField, Button, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: '50vw',
  }
}));

export default function SwitchListSecondary(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(['wifi']);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleChangeOrigin = (e) => {
    setOrigin(e.target.value);
  }
  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const condition = {origin, destination};
    props.onSubmit(condition);
  }

  return (
    <form onSubmit={handleSubmit}>
      <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
        <ListItem>
          <ListItemText primary="出発"/>
          <TextField required variant="filled" onChange={handleChangeOrigin}/>
        </ListItem>
        <ListItem>
          <ListItemText primary="到着"/>
          <TextField variant="filled" onChange={handleChangeDestination}/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle('wifi')}
              checked={checked.indexOf('wifi') !== -1}
              inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BluetoothIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle('bluetooth')}
              checked={checked.indexOf('bluetooth') !== -1}
              inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Box display='flex' justifyContent='center'>
        <Button type="submit" variant="contained">PLAN!</Button>
      </Box>
    </form>
  );
}
