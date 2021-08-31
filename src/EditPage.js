import {
  useEffect,
  useContext,
  useState,
} from 'react';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';

import ButtonAppBar from './ButtonAppBar';
import Map from './Map';
import SwitchListSecondary from './SwitchListSecondary';
import TitlebarImageList from './TitlebarImageList';
import{
  AppContext,
} from './App';

import {
  Button,
  Box,
} from '@material-ui/core'

export default function EditPage(props){
  const history = useHistory();
  const location = useLocation();
  const {plan, setPlan, markers, setMarkers} = useContext(AppContext);
  const condition = location.state;
  console.log(condition)
  const handleClickAdd = () => {
    history.push('/plan/add', condition);
  }
  const handleClickCancel = (i) => {
    plan.newSpots.splice(i, 1);
    markers.spotMarkers[i].setMap(null);
    markers.spotMarkers.splice(i, 1);
    setMarkers({...markers});
    setPlan({...plan});
    console.log(i);
    console.log(plan);
    console.log(markers)
  }
  const handleClickReturn = () => {
    history.push('/plan', {status: 'cancel'});
  }
  const handleSubmit = (condition) => {
    history.push('/plan', {...condition, status: 'new'});
  }
  useEffect(() => {
    console.log('edit');
  }, [])
  return(
    <>
      <Box>
        <TitlebarImageList onClickAdd={handleClickAdd} onClickCancel={handleClickCancel} spots={plan.newSpots}/>
        <SwitchListSecondary onSubmit={handleSubmit} condition={condition}/>
        <Button type="submit" variant="contained" onClick={handleClickReturn}>辞める</Button>
      </Box>
    </>
  )
}
