import { Switch, Route, } from "react-router-dom";
import Map from './Map';
import EditPage from './EditPage';
import AddPage from './AddPage';
import ItineraryPage from './ItineraryPage';
import { Box, Zoom, } from '@material-ui/core'
import SimpleTabs from './SimpleTabs'

export default function PlanPage(props){
  return(
    <>
      <Map/>
      <SimpleTabs />
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
