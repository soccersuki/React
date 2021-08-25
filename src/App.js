import { useState, useRef, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";

import { Loader } from "@googlemaps/js-api-loader"

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';

import HomePage from './HomePage';
import ConditionPage from './ConditionPage';
import PlanPage from './PlanPage';
import EditPage from './EditPage';
import AddPage from './AddPage';

export default function App() {
  return(
    <Router>
      <Switch>
        <Route path="/condition">
          <ConditionPage />
        </Route>
        <Route path="/plan">
          <PlanPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
}

const Prefectures = () => {
  var prefectures = ['大阪', '東京', '北海道', '福岡'];
  const handleChange = (e) => {
    console.log(e.target.value);
  }
  return(
    <Box my={10} mx={5}>
      <h2>都道府県から選ぶ</h2>
      <Select onChange={handleChange}>
        {prefectures.map(prefecture => <MenuItem value={prefecture}>{prefecture}</MenuItem>)}
      </Select>
    </Box>
  )
}

const Form = (props) =>{
  const [region, setRegion] = useState('大阪');
  const [origin, setOrigin] = useState('大阪駅');
  const [destination, setDestination] = useState('萱嶋駅');
  const history = useHistory();
  const handleChangeOrigin = (e) => {
    setOrigin(e.target.value);
  }
  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  }
  const handleChangeRegion = (e) => {
    setRegion(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(props.path, {region: region, origin: origin, destination: destination});
  }

  return(
    <form onSubmit={handleSubmit}>
      <div>
        Region: <input type='text' onChange={handleChangeRegion} value={region}/>
      </div>
      <div>
        Origin: <input type='text' onChange={handleChangeOrigin} value={origin}/>
      </div>
      <div>
        Destination: <input type='text' onChange={handleChangeDestination} value={destination}/>
      </div>
      <input type='submit' />
    </form>
  )
}

const Legs = (props) => {
  if(props.plan == null || props.legs == null) return(null);
  var {plan, legs} = props;
  var l = [];
  for(var i = 0; i < plan.length; i++){
    var cmp = (<li>
                 <p>{plan[i].arrivalTime.text}, {plan[i].name}</p>
                 <p>stay time: {plan[i].stayTime / 60}min</p>
                 {i < legs.length ? <p>transit: {legs[i].duration.value / 60}min</p> : null}
              </li>);
    l.push(cmp)
  }
  return(
    <>
      <ul>{l}</ul>
    </>
  )
}

const API_KEY = "AIzaSyCkNip5D4glIDSddF__OlVzY1ovG5yVf7g";
const initialConfig = {
  zoom: 12,
  center: { lat: 35.6432027, lng: 139.6729435 }
}
// var google, map;
//
// function Plan(){
//   const [plan, setPlan] = useState(null);
//   const [legs, setLegs] = useState(null);
//   const mapContainerRef = useRef(null);
//   const location = useLocation();
//   var regionName = location.state.region, originName = location.state.origin, destinationName = location.state.destination;
//   useEffect(async () => {
//     const loader = new Loader({
//       apiKey: API_KEY,
//       version: "weekly",
//       libraries: ["places"],
//     });
//     google = await loader.load().then((google) => {
//       return google;
//     })
//
//     map = new google.maps.Map(mapContainerRef.current, initialConfig);
//
//     var region = await findPlace(regionName);
//
//     var places = await findPlaces('観光', region[0].geometry.location);
//
//     var waypts = places.slice(0, 5).map(place => {
//       return {
//         location: place.formatted_address,
//         stopover: true,
//       }
//     });
//     // waypts = waypts.slice(0, 5);
//     var direction = await drivingDirection(originName, destinationName, waypts);
//     console.log(direction);
//
//     var legs = direction.routes[0].legs;
//     var points = getPoints(direction, places);
//     [points, legs] = await insertLunch(points, legs);
//     legs.map(leg => {
//       leg.duration.value *= 2;
//     })
//     var plan = getPlan(points, legs);
//     setPlan(plan);
//     setLegs(legs);
//     for(var i = 0; i < plan.length; i++){
//       new google.maps.Marker({
//         position: {
//           lat: plan[i].geometry.location.lat(),
//           lng: plan[i].geometry.location.lng(),
//         },
//         label: String(i),
//         map: map,
//       });
//     }
//     map.setCenter({lat: plan[0].geometry.location.lat(), lng: plan[0].geometry.location.lng()});
//
//   }, []);
//
//   return(
//     <>
//       <Legs plan={plan} legs={legs}/>
//       <div ref={mapContainerRef} style={{height: "100vh"}}>I can use the DOM with react ref</div>
//     </>
//   )
// }
//
// const getPoints = (direction, places) => {
//   var points = direction.routes[0].waypoint_order.map(i => {
//     var point = places[i];
//     point.stayTime = 1 * 3600;
//     return point;
//   });
//   var origin = {
//     name: direction.request.origin.query,
//     geometry: {
//       location: direction.routes[0].legs[0].start_location,
//     },
//     stayTime: 0,
//   };
//   var destination = {
//     name: direction.request.destination.query,
//     geometry: {
//       location: direction.routes[0].legs.slice(-1)[0].end_location,
//     },
//     stayTime: 0,
//   };
//   points.unshift(origin);
//   points.push(destination);
//   return points;
// }
//
// const insertLunch = async (points, legs) => {
//   var time = 9 * 3600;
//   var p = [], l = [];
//   var gotLunch = false;
//   for(var i = 0; i < points.length; i++){
//     p.push(points[i]);
//     time += points[i].stayTime;
//     if(time >= 12 * 3600 && gotLunch == false){
//       var [lunchPlace] = await findPlace('昼食', points[i].geometry.location);
//       lunchPlace.stayTime = 3600;
//       console.log(lunchPlace);
//       var go = await drivingDirection(points[i].formatted_address, lunchPlace.formatted_address);
//       var goLeg = go.routes[0].legs[0];
//       var back = await drivingDirection(lunchPlace.formatted_address, points[i+1].formatted_address);
//       var backLeg = back.routes[0].legs[0];
//       p.push(lunchPlace);
//       l.push(goLeg);
//       l.push(backLeg);
//       time += (goLeg.duration.value + backLeg.duration.value) * 2;
//       gotLunch = true;
//     }
//     else{
//       if(i < legs.length){
//         time += legs[i].duration.value * 2;
//         l.push(legs[i]);
//       }
//     }
//   }
//   return [p, l];
// }
//
// const getPlan = (points, legs) => {
//   var time = 9 * 3600;
//   for(var i = 0; i < points.length; i++){
//     points[i].arrivalTime = {
//       text: getTimeStr(time),
//       value: time,
//     };
//     if(i < legs.length){
//       time += points[i].stayTime + legs[i].duration.value;
//     }
//   }
//   return points;
// }
//
// const findPlace = async (query, location) => {
//   var service = new google.maps.places.PlacesService(map);
//   var request = {
//     query: query,
//     fields: ['name', 'geometry', 'formatted_address'],
//   };
//   if(location != null){
//     request.locationBias = {lat: location.lat(), lng: location.lng()};
//   }
//   var place = await new Promise(resolve => {
//     service.findPlaceFromQuery(request, function(results, status) {
//       if (status === google.maps.places.PlacesServiceStatus.OK) {
//         resolve(results);
//       }
//     });
//   });
//   return place;
// }
//
// const findPlaces = async (query, location) => {
//   var service = new google.maps.places.PlacesService(map);
//   var request = {
//     location: new google.maps.LatLng(location.lat(), location.lng()),
//     radius: '5000',
//     query: '観光',
//   }
//   var places = await new Promise(resolve => {
//     service.textSearch(request, (results, status) => {
//       if (status == google.maps.places.PlacesServiceStatus.OK) {
//         resolve(results);
//       }
//     })
//   })
//   return places;
// }
//
// const drivingDirection = async (origin, destination, waypoints) => {
//   const directionsService = new google.maps.DirectionsService();
//   // const directionsRenderer = new google.maps.DirectionsRenderer({suppressPolylines: true});
//   // directionsRenderer.setMap(map);
//   var request = {
//     origin,
//     destination,
//     travelMode: google.maps.TravelMode.DRIVING,
//   };
//   if(waypoints != null){
//     request.waypoints = waypoints;
//     request.optimizeWaypoints = true;
//   }
//
//   var direction = await directionsService
//     .route(request)
//     .then((response) => {
//       // directionsRenderer.setDirections(response);
//       return response;
//     })
//     .catch((e) => console.log("Directions request failed due to " + e));
//   return direction
// }
//
// function getTimeStr(sum){
//   var h = Math.floor(sum / 3600);
//   var m = Math.floor((sum % 3600) / 60);
//   return `${('00' + h).slice(-2)}:${('00' + m).slice(-2)}`;
// }
