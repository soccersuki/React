import {
  useEffect,
  useContext,
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
  const {google, plan, region, setPlan} = useContext(PlanContext);
  const handleClick = () => {
    history.push('/plan/add');
  }
  const handleClickReturn = () => {
    history.push('/plan');
  }
  const handleSubmit = async () => {
    // const [spots2, plan2, legs2] = await makePlan(google, '大阪', '大阪駅', '萱嶋駅', plan.spots);
    const p = null
    setPlan(p);
    // setPlan(plan2)
    // setSpots(spots2)
    // setLegs(legs2);
    history.push('/plan');
  }
  useEffect(() => {
    console.log('edit');
  }, [])
  return(
    <>
      <Box mx={5}>
        <TitlebarImageList onClick={handleClick} spots={props.spots}/>
        <SwitchListSecondary onSubmit={handleSubmit}/>
        <Button type="submit" variant="contained" onClick={handleClickReturn}>辞める</Button>
      </Box>
    </>
  )
}
