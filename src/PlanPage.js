import { Switch, Route, } from "react-router-dom";
import Map from './Map';
import EditPage from './EditPage';
import AddPage from './AddPage';
import ItineraryPage from './ItineraryPage';
import { Box, Zoom, } from '@material-ui/core'
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
