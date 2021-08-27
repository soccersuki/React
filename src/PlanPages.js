import { useState, useRef, useEffect, useContext, createContext } from 'react'

import {
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";

import { Loader } from "@googlemaps/js-api-loader"

import Map from './Map';
import EditPage from './EditPage';
import ButtonAppBar from './ButtonAppBar';
import CustomizedTimeline from './CustomizedTimeline'
import AddPage from './AddPage';

import {
  Button,
  Box,
} from '@material-ui/core'

import {
  findPlace,
  findPlaces,
  makePlan,
  showMarker,
} from './funcs';

export const PlanContext = createContext();

export default function PlanPages(props){
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);
  const [plan, setPlan] = useState(null);
  const value = {
    google, setGoogle,
    map, setMap,
    plan, setPlan,
  }

  return(
    <PlanContext.Provider value={value}>
      <ButtonAppBar />
      <Map google={google}/>
      <Switch>
        <Route path='/plan/edit'>
          <EditPage />
        </Route>
        <Route path='/plan/add'>
          <AddPage />
        </Route>
        <Route path='/plan'>
          <PlanPage />
        </Route>
      </Switch>
    </PlanContext.Provider>
  )
}

function PlanPage(){
  const history = useHistory();
  const handleClick = () => {
    history.push('/plan/edit');
  }
  var plan = usePlan();
  return(
    <>
      <CustomizedTimeline plan={plan}/>
      <Box display='flex' justifyContent='center' my={5}>
        <Button type="submit" variant="contained" onClick={handleClick}>EDIT</Button>
      </Box>
    </>
  )
}

const useGoogle = () => {
  // const [google, setGoogle] = useState(null);
  const {setGoogle} = useContext(PlanContext);
  useEffect(() => {
    const API_KEY = "AIzaSyCkNip5D4glIDSddF__OlVzY1ovG5yVf7g";
    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly",
      libraries: ["places"],
    });
    loader.load().then((google) => {
      setGoogle(google);
    })
  })
}

const usePlan = (props) => {
  useGoogle();
  const {google, map, plan, setPlan} = useContext(PlanContext);

  useEffect(async () => {
    console.log('usePlan')
    if(google == null || map == null) return;

    var regionName = '大阪', originName = '大阪駅', destinationName = '萱嶋駅';
    var region, spots;
    if(plan == null){
      region = await findPlace(google, map, regionName);
      spots = await findPlaces(google, map, '観光', region[0].geometry.location);
      spots = spots.slice(0, 5);
    }
    else{
      region = plan.region;
      spots = plan.newSpots;
    }

    const newPlan = await makePlan(google, originName, destinationName, region, spots);
    newPlan.newSpots = [...newPlan.spots];

    showMarker(google, map, newPlan)
    setPlan(newPlan);

    console.log(region);
    console.log(spots);
    console.log(newPlan);
  }, [google, map])
  return plan;
}
