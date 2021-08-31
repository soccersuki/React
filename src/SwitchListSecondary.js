import { useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { TextField, Button, Box, Checkbox, Collapse } from '@material-ui/core';

export default function SwitchListSecondary(props) {
  const [checked, setChecked] = useState(['checkBox']);
  const [regionName, setRegionName] = useState(props.condition.regionName);
  const [originName, setOriginName] = useState(props.condition.originName);
  const [destinationName, setDestinationName] = useState('');

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
    var meal = checked.indexOf('meal');
    const condition = {
      regionName,
      originName,
      destinationName,
      meal,
    };
    if(checked.indexOf('checkBox') != -1) condition.destinationName = originName;
    props.onSubmit(condition);
  }

  return (
    <form onSubmit={handleSubmit}>
      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItem>
          <ListItemText primary="エリア"/>
          <TextField required variant="filled" onChange={handleChangeRegionName} value={regionName}/>
        </ListItem>
        <ListItem>
          <ListItemText primary="出発"/>
          <TextField required variant="filled" onChange={handleChangeOriginName} value={originName}/>
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
            <ListItemText primary="到着"/>
            <TextField variant="filled" onChange={handleChangeDestinationName} value={destinationName}/>
          </ListItem>
        </Collapse>
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
