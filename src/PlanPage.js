import { Switch, Route, } from "react-router-dom";
import Map from './Map';
import EditPage from './EditPage';
import AddPage from './AddPage';
import ItineraryPage from './ItineraryPage';
import { Box, Zoom, } from '@material-ui/core'

export default function PlanPage(props){
  return(
    <>
      <Zoom in={true} mountOnEnter >
        <Box>
          <Map/>
        </Box>
      </Zoom>
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
