import {
  useEffect,
  useContext,
  useState,
} from 'react';
import {
  useHistory,
} from 'react-router-dom';

import ButtonAppBar from './ButtonAppBar';
import Map from './Map';
import SwitchListSecondary from './SwitchListSecondary';
import TitlebarImageList from './TitlebarImageList';
import{
  makePlan,
  PlanContext,
} from './PlanPages';

import {
  Button,
  Box,
} from '@material-ui/core'

export default function EditPage(props){
  const history = useHistory();
  const {plan, setPlan} = useContext(PlanContext);
  const handleClickAdd = () => {
    history.push('/plan/add');
  }
  const handleClickCancel = (i) => {
    plan.newSpots.splice(i, 1);
    setPlan({...plan});
    console.log(i);
    console.log(plan);
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
      <Box mx={5}>
        <TitlebarImageList onClickAdd={handleClickAdd} onClickCancel={handleClickCancel} spots={plan.newSpots}/>
        <SwitchListSecondary onSubmit={handleSubmit}/>
        <Button type="submit" variant="contained" onClick={handleClickReturn}>辞める</Button>
      </Box>
    </>
  )
}
