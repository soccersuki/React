import { Switch, Route, } from "react-router-dom";
import Map from './Map';
import SimpleTabs from './SimpleTabs'
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer';

import { usePlan } from './funcs';

export default function PlanPage(props){
  usePlan();
  return(
    <>
      <Map/>
      <SwipeableTemporaryDrawer />
    </>
  )
}
