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
} from './PlanPage';

import {
  Button,
} from '@material-ui/core'

export default function EditPage(props){
  const history = useHistory();
  const {spots, plan, legs, region, setPlan, setSpots, setLegs} = useContext(PlanContext);
  const handleClick = () => {
    history.push('/plan/add');
  }
  const handleClickReturn = () => {
    history.push('/plan');
  }
  const handleSubmit = async () => {
    const {google} = props;
    const [spots2, plan2, legs2] = await makePlan(google, region, '大阪駅', '萱嶋駅', spots);
    setPlan(plan2)
    setSpots(spots2)
    setLegs(legs2);
    history.push('/plan');
  }
  useEffect(() => {
    console.log('edit');
  }, [])
  return(
    <>
      <TitlebarImageList onClick={handleClick} spots={props.spots}/>
      <SwitchListSecondary onSubmit={handleSubmit}/>
      <Button type="submit" variant="contained" onClick={handleClickReturn}>辞める</Button>
    </>
  )
}
