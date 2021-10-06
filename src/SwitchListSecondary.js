import { useState, useContext, useEffect } from 'react'
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
import { TextField, Button, Box, Checkbox, Collapse, Fab, FormControlLabel, Typography, Avatar, Grid, } from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MultipleSelect from './MultipleSelect'
import MaterialUIPickers from './MaterialUIPickers'

import {AppContext} from './MyContext'

import {makePlan} from './funcs/planFuncs'

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

export default function SwitchListSecondary(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(['checkBox', 'new']);
  const [regionName, setRegionName] = useState('大阪');
  const [originName, setOriginName] = useState('大阪駅');
  const [destinationName, setDestinationName] = useState('大阪駅');
  const departureDate = new Date();
  const arrivalDate = new Date();
  departureDate.setHours(9)
  departureDate.setMinutes(0)
  arrivalDate.setHours(21)
  arrivalDate.setMinutes(0)
  const [departureTime, setDepartureTime] = useState(departureDate);
  const [arrivalTime, setArrivalTime] = useState(arrivalDate);
  const [querys, setQuerys] = useState([])

  const { google, map, plan, setPlan, condition, setCondition, snackbarState, dialogState} = useContext(AppContext);



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
  useEffect(() => {
    if(dialogState.status == 'update'){
      handleToggle('new')()
    }
  }, [])
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
  const handleSubmit = async (e) => {
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
      status: checked.indexOf('new') != -1 ? 'new' : 'update',
    };
    if(checked.indexOf('checkBox') != -1) condition.destinationName = originName;
    console.log(condition)
    setCondition({...condition})
    dialogState.handleClose()
    const newPlan = await makePlan(google, map, plan, condition);
    setPlan({...newPlan});
    console.log(newPlan);
    props.setCnt(props.cnt + 1)
    snackbarState.handleOpen('プランが完成しました')
  }

  return (
    <>
    <Box width='100%'>
      <Box display="flex" justifyContent="center">
        <Typography variant='h5'></Typography>
      </Box>
    </Box>
    <Box color='text.secondary'>
    <form onSubmit={handleSubmit}>
      <List dense={false}>
        <ListItem disableGutters>
          <TextField label="エリア" fullWidth margin='dense' required  onChange={handleChangeRegionName} value={regionName}/>
        </ListItem>
        <ListItem disableGutters>
          <Grid container spacing={2}>
          <Grid item xs={6}>
          <TextField label='出発' fullWidth margin='dense' required onChange={handleChangeOriginName} value={originName} />
          </Grid>
          <Grid item xs={6}>
          <TextField label='到着' fullWidth margin='dense'onChange={handleChangeDestinationName} value={destinationName} />
          </Grid>
          </Grid>
        </ListItem>
        <Collapse in={checked.indexOf('checkBox') == -1}>
          <ListItem disableGutters>
          </ListItem>
        </Collapse>
        <ListItem disableGutters>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MaterialUIPickers label='出発時間' selectedDate={departureTime} handleDateChange={handleDepartureDateChange}/>
            </Grid>
            <Grid item xs={6}>
              <MaterialUIPickers label='到着時間' selectedDate={arrivalTime} handleDateChange={handleArrivalDateChange}/>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText id="switch-list-label-bluetooth" primary={<Typography variant='body2'>新規作成</Typography>} />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle('new')}
              checked={checked.indexOf('new') !== -1}
              inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
              color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={checked.indexOf('new') == -1}>
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
        </Collapse>


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
      </List>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.button}
        startIcon={<NavigationIcon />}
        type='submit'
        style={{marginTop: 20}}
      >
        Plan
      </Button>
    </form>
    </Box>
    </>
  );
}
