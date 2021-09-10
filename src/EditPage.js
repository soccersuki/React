import { useContext, useState, } from 'react';
import { useHistory, } from 'react-router-dom';

import SwitchListSecondary from './SwitchListSecondary';
import TitlebarImageList from './TitlebarImageList';
import{ AppContext, } from './App';
import { Button, Box, Divider, Fab, } from '@material-ui/core'
import NavigationIcon from '@material-ui/icons/Navigation';

export default function EditPage(props){
  const {setValue} = props;
  const history = useHistory();
  const {plan, setPlan, markers, setMarkers, condition, setCondition} = useContext(AppContext);
  const handleClickAdd = () => {
    setValue(2);
  }
  const handleClickCancel = (i) => {
    plan.newSpots.splice(i, 1);
    setPlan({...plan});
    markers.spotMarkers[i].setMap(null);
    markers.spotMarkers.splice(i, 1);
    setMarkers({...markers});
  }
  const handleSubmit = (condition) => {
    setCondition({...condition, status: 'new'});
    setValue(0);
  }
  const handleClickInfo = (i) => {

  }
  return(
    <>
      <Box>
        <Box my={5} mx={1}>
          <TitlebarImageList onClickInfo={props.onClickPlace} onClickAdd={handleClickAdd} onClickCancel={handleClickCancel} spots={plan.newSpots}/>
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
