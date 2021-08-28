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
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { TextField, Button, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  form: {
  }
}));

export default function SwitchListSecondary(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(['wifi']);
  const [regionName, setRegionName] = useState(props.regionName);
  const [originName, setOriginName] = useState('大阪駅');
  const [destinationName, setDestinationName] = useState('萱嶋駅');

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

  const handleChangeRegionName = (e) => {
    setRegionName(e.target.value);
  }

  const handleChangeOriginName = (e) => {
    setOriginName(e.target.value);
  }
  const handleChangeDestinationName = (e) => {
    setDestinationName(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const meal = false;
    if(checked.indexOf('meal') != -1) meal = true;
    const condition = {regionName, originName, destinationName, meal};
    props.onSubmit(condition);
  }

  return (
    <form onSubmit={handleSubmit}>
      <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
        <ListItem>
          <ListItemText primary="エリア"/>
          <TextField required variant="filled" onChange={handleChangeRegionName} value={regionName}/>
        </ListItem>
        <ListItem>
          <ListItemText primary="出発"/>
          <TextField required variant="filled" onChange={handleChangeOriginName} value={originName}/>
        </ListItem>
        <ListItem>
          <ListItemText primary="到着"/>
          <TextField variant="filled" onChange={handleChangeDestinationName} value={destinationName}/>
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
        <ListItem>
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="昼食を自動で追加" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle('meal')}
              checked={checked.indexOf('meal') !== -1}
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
