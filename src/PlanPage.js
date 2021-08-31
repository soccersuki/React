import {
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";

import Map from './Map';
import EditPage from './EditPage';
import ButtonAppBar from './ButtonAppBar';
import CustomizedTimeline from './CustomizedTimeline'
import AddPage from './AddPage';
import ItineraryPage from './ItineraryPage';

import {
  Button,
  Box,
} from '@material-ui/core'

export default function PlanPage(props){
  return(
    <>
      <ButtonAppBar />
      <Map/>
      <Switch>
        <Route path='/plan/edit'>
          <EditPage />
        </Route>
        <Route path='/plan/add'>
          <AddPage />
        </Route>
        <Route path='/plan'>
          <ItineraryPage />
        </Route>
      </Switch>
    </>
  )
}
