import { useContext, useState, } from 'react';
import { useHistory, } from 'react-router-dom';

import SwitchListSecondary from './SwitchListSecondary';
import TitlebarImageList from './TitlebarImageList';
import{ AppContext, } from './App';
import { Button, Box, Divider, Fab, } from '@material-ui/core'
import NavigationIcon from '@material-ui/icons/Navigation';


export default function EditPage(props){
  const history = useHistory();
  const {plan, setPlan, markers, setMarkers, condition, setCondition} = useContext(AppContext);
  const handleClickAdd = () => {
    history.push('/plan/add', condition);
  }
  const handleClickCancel = (i) => {
    plan.newSpots.splice(i, 1);
    markers.spotMarkers[i].setMap(null);
    markers.spotMarkers.splice(i, 1);
    setMarkers({...markers});
    setPlan({...plan});
  }
  const handleClickReturn = () => {
    setCondition({...condition, status: 'cancel'});
    history.push('/plan');
  }
  const handleSubmit = (condition) => {
    setCondition({...condition, status: 'new'});
    history.push('/plan');
  }
  return(
    <>
      <Box>
        <Box my={5} mx={1}>
          <TitlebarImageList onClickAdd={handleClickAdd} onClickCancel={handleClickCancel} spots={plan.newSpots}/>
        </Box>
        <Divider variant='middle'/>
        <Box my={5} mx={1}>
          <SwitchListSecondary onSubmit={handleSubmit} condition={condition}/>
        </Box>
        <Divider variant='middle'/>
      </Box>
    </>
  )
}
