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
import { TextField, Button, Box, Checkbox, Collapse, Fab, FormControlLabel, Typography, Avatar, } from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MultipleSelect from './MultipleSelect'
import MaterialUIPickers from './MaterialUIPickers'

import {AppContext} from './App'

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

export default function SwitchListSecondary(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(['checkBox']);
  const [regionName, setRegionName] = useState(props.condition.regionName);
  const [originName, setOriginName] = useState(props.condition.originName);
  const [destinationName, setDestinationName] = useState('');
  const departureDate = new Date();
  const arrivalDate = new Date();
  departureDate.setHours(9)
  departureDate.setMinutes(0)
  arrivalDate.setHours(21)
  arrivalDate.setMinutes(0)
  const [departureTime, setDepartureTime] = useState(departureDate);
  const [arrivalTime, setArrivalTime] = useState(arrivalDate);
  const [querys, setQuerys] = useState([])

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
  const handleDepartureDateChange = (date) => {
    setDepartureTime(date);
  };
  const handleArrivalDateChange = (date) => {
    setArrivalTime(date);
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
      arrivalTime: arrivalTime.getHours() * 3600 + arrivalTime.getMinutes() * 60,
      querys,
      status: props.condition.status,
    };
    if(checked.indexOf('checkBox') != -1) condition.destinationName = originName;
    setCondition({...condition})
  }

  return (
    <>
    <Box width='100%'>
      <Box display="flex" justifyContent="center" my={1}>
        <Avatar>
          <NavigationIcon />
        </Avatar>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography variant='h5'>{props.title}</Typography>
      </Box>
    </Box>
    <Box  color='text.secondary'>
    <form onSubmit={handleSubmit}>
      <List>
        <ListItem disableGutters>
          <TextField label="エリア" fullWidth variant='outlined' required  onChange={handleChangeRegionName} value={regionName}/>
        </ListItem>
        <ListItem disableGutters>
          <TextField label='出発' fullWidth variant='outlined' required onChange={handleChangeOriginName} value={originName}/>
        </ListItem>
        <ListItem disableGutters>
          <FormControlLabel
            control={<Checkbox checked={checked.indexOf('checkBox') !== -1} onChange={handleToggle('checkBox')} name="checkedA" />}
            label={<Typography variant='body2'>出発地点と到着地点が同じ</Typography>}
          />
        </ListItem>
        <Collapse in={checked.indexOf('checkBox') == -1}>
          <ListItem disableGutters>
            <TextField label='到着' fullWidth variant='outlined'onChange={handleChangeDestinationName} value={destinationName}/>
          </ListItem>
        </Collapse>
        <ListItem disableGutters>
          <MaterialUIPickers label='出発時間' selectedDate={departureTime} handleDateChange={handleDepartureDateChange}/>
        </ListItem>
        <ListItem disableGutters>
          <MaterialUIPickers label='到着時間' selectedDate={arrivalTime} handleDateChange={handleArrivalDateChange}/>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText id="switch-list-label-bluetooth" primary={<Typography variant='body2'>スポットを自動で追加</Typography>} />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle('place')}
              checked={checked.indexOf('place') !== -1}
              inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText id="switch-list-label-bluetooth" primary={<Typography variant='body2'>昼食を自動で追加</Typography>} />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle('lunch')}
              checked={checked.indexOf('lunch') !== -1}
              inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText id="switch-list-label-bluetooth" primary={<Typography variant='body2'>夕食を自動で追加</Typography>} />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle('dinner')}
              checked={checked.indexOf('dinner') !== -1}
              inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem disableGutters>
          <MultipleSelect label='その他' state={querys} setState={setQuerys}/>
        </ListItem>
        <ListItem disableGutters>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
            startIcon={<NavigationIcon />}
            type='submit'
          >
            Plan
          </Button>
        </ListItem>
      </List>
    </form>
    </Box>
    </>
  );
}
