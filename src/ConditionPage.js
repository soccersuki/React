import { useState, useContext, useEffect } from 'react'
import { TextField, Button, Box, Collapse, Typography, Avatar, Grid, List, ListItem, ListItemSecondaryAction, ListItemText, Switch, Checkbox, ListItemIcon, ListItemButton} from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


import MultipleSelect from './MultipleSelect'
import MaterialUIPickers from './MaterialUIPickers'

import {AppContext} from './MyContext'

import {makePlan} from './funcs/planFuncs'

export default function SwitchListSecondary(props) {
  const [checked, setChecked] = useState(['new']);
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

  useEffect(() => {
    if(dialogState.status == 'update'){
      handleToggle('new')()
    }
  }, [])

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
    setCondition({...condition})
    const newPlan = await makePlan(google, map, plan, condition);
    setPlan({...newPlan});
  }

  return (
    <>
      <Box width='100%'>
        <Box display="flex" justifyContent="center">
          <Typography variant='h5'></Typography>
        </Box>
        <KeyboardArrowDownIcon />
      </Box>
      <Box color='text.secondary'>
        <form onSubmit={handleSubmit}>
          <List dense={false}>
            <ListItem disableGutters>
              <TextField label={<Typography component='body2'variant='body2'>エリア</Typography>} fullWidth margin='dense' required  onChange={handleChangeRegionName} value={regionName}/>
            </ListItem>
            <ListItem disableGutters>
              <Grid container spacing={2}>
              <Grid item xs={6}>
              <TextField label={<Typography component='body2'variant='body2'>出発</Typography>} fullWidth margin='dense' required onChange={handleChangeOriginName} value={originName} />
              </Grid>
              <Grid item xs={6}>
              <TextField label={<Typography component='body2'variant='body2'>到着</Typography>} fullWidth margin='dense'onChange={handleChangeDestinationName} value={destinationName} />
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
                  <MaterialUIPickers label={<Typography component='body2'variant='body2'>出発時間</Typography>} selectedDate={departureTime} handleDateChange={handleDepartureDateChange}/>
                </Grid>
                <Grid item xs={6}>
                  <MaterialUIPickers label={<Typography component='body2'variant='body2'>到着時間</Typography>} selectedDate={arrivalTime} handleDateChange={handleArrivalDateChange}/>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText primary={<Typography variant='body2'>新規作成</Typography>} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle('new')}
                  checked={checked.indexOf('new') !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={checked.indexOf('new') == -1}>
              <ListItem disableGutters>
                <ListItemText primary={<Typography variant='body2'>スポットを自動で追加</Typography>} />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={handleToggle('place')}
                    checked={checked.indexOf('place') !== -1}
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </Collapse>
            <ListItem>
              <ListItemButton onClick={handleToggle('lunch')} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf('lunch') !== -1}
                  />
                </ListItemIcon>
                <ListItemText primary={'昼食を自動で追加'}/>
              </ListItemButton>
            </ListItem>

            <ListItem disableGutters>
              <ListItemText primary={<Typography variant='body2'>昼食を自動で追加</Typography>} />
              <Switch
                edge="end"
                onChange={handleToggle('lunch')}
                checked={checked.indexOf('lunch') !== -1}
                color="primary"
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText primary={<Typography variant='body2'>夕食を自動で追加</Typography>} />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={handleToggle('dinner')}
                  checked={checked.indexOf('dinner') !== -1}
                  color="primary"
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem disableGutters>
              <MultipleSelect label={<Typography component='body2'variant='body2'>その他</Typography>} state={querys} setState={setQuerys}/>
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            fullWidth
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
