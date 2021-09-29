import { useState, useContext } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HouseIcon from '@material-ui/icons/House';
import { TextField, Button, Box, Checkbox, Collapse, Fab } from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {AppContext} from './App'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(10),
  },
}));

function MaterialUIPickers(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        margin="normal"
        id="time-picker"
        label="Time picker"
        value={props.selectedDate}
        onChange={props.handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}


export default function SwitchListSecondary(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(['checkBox']);
  const [regionName, setRegionName] = useState(props.condition.regionName);
  const [originName, setOriginName] = useState(props.condition.originName);
  const [destinationName, setDestinationName] = useState('');
  const date = new Date();
  date.setHours(9)
  date.setMinutes(0)
  const [departureTime, setdepartureTime] = useState(date);

  const { condition, setCondition, } = useContext(AppContext);

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
  const handleDateChange = (date) => {
    setdepartureTime(date);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const condition = {
      regionName,
      originName,
      destinationName,
      place: checked.indexOf('place') != -1,
      lunch: checked.indexOf('lunch') != -1,
      dinner: checked.indexOf('dinner') != -1,
      departureTime: departureTime.getHours() * 3600 + departureTime.getMinutes() * 60,
      status: props.condition.status,
    };
    if(checked.indexOf('checkBox') != -1) condition.destinationName = originName;
    setCondition({...condition})
  }

  return (
    <form onSubmit={handleSubmit}>
      <List>
        <ListItem>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <TextField label="エリア"required  onChange={handleChangeRegionName} value={regionName}/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <HouseIcon />
          </ListItemIcon>
          <TextField label='出発'required onChange={handleChangeOriginName} value={originName}/>
        </ListItem>
        <ListItem>
          <Checkbox
            checked={checked.indexOf('checkBox') !== -1}
            onChange={handleToggle('checkBox')}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <ListItemText primary={'出発地点と到着地点が同じ'} />
        </ListItem>
        <Collapse in={checked.indexOf('checkBox') == -1}>
          <ListItem>
            <ListItemIcon>
              <HouseIcon />
            </ListItemIcon>
            <TextField label='到着'variant="filled" onChange={handleChangeDestinationName} value={destinationName}/>
          </ListItem>
        </Collapse>
        <ListItem>
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="スポットを自動で追加" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle('place')}
              checked={checked.indexOf('place') !== -1}
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
              onChange={handleToggle('lunch')}
              checked={checked.indexOf('lunch') !== -1}
              inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="夕食を自動で追加" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle('dinner')}
              checked={checked.indexOf('dinner') !== -1}
              inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <MaterialUIPickers selectedDate={departureTime} handleDateChange={handleDateChange}/>
        </ListItem>
      </List>
      <Box  width='100%'>
        <Box display='flex' justifyContent='center'>
          <Fab color='primary'variant="extended" type='submit'>
          <NavigationIcon />
            Navigate
          </Fab>
        </Box>
      </Box>

    </form>
  );
}
