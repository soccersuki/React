import { useState, useRef, useEffect, createContext } from 'react'

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

export const PlanContext = createContext();

export default function PlanPage(props){
  const [plan, setPlan] = useState(null);
  const [spots, setSpots] = useState(null);
  const [legs, setLegs] = useState(null);
  const [region, setRegion] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const mapContainerRef = useRef(null);
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);
  const value = {
    plan,
    setPlan,
    spots,
    setSpots,
    legs,
    setLegs,
    region,
    setRegion,
  }
  useEffect(async () => {
    console.log('plan');
    const API_KEY = "AIzaSyCkNip5D4glIDSddF__OlVzY1ovG5yVf7g";
    const initialConfig = {
      zoom: 12,
      center: { lat: 35.6432027, lng: 139.6729435 }
    }
    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly",
      libraries: ["places"],
    });
    const google = await loader.load().then((google) => {
      return google;
    })
    setGoogle(google);

    const map = new google.maps.Map(mapContainerRef.current, initialConfig);
    setMap(map);

    var regionName = '大阪', originName = '大阪駅', destinationName = '萱嶋駅';

    var region = await findPlace(google, map, regionName);
    setRegion(region);

    var places = await findPlaces(google, map, '観光', region[0].geometry.location);

    const [points, plan, legs] = await makePlan(google, region, '大阪駅', '萱嶋駅', places.slice(0, 5));
    setPlan(plan);
    setLegs(legs);
    setSpots(points);
    for(var i = 0; i < plan.length; i++){
      new google.maps.Marker({
        position: {
          lat: plan[i].geometry.location.lat(),
          lng: plan[i].geometry.location.lng(),
        },
        label: String(i),
        map: map,
      });
    }
    map.setCenter({lat: plan[0].geometry.location.lat(), lng: plan[0].geometry.location.lng()});
    console.log(region);
    console.log(places);
    // console.log(direction);
    console.log(plan);
    console.log(legs);
    console.log(points);
  }, []);

  const handleClick = () => {
    history.push('/plan/edit');
  }

  return(
    <PlanContext.Provider value={value}>
      <ButtonAppBar />
      <Map mapContainerRef={mapContainerRef}/>
      <Switch>
        <Route path='/plan/edit'>
          <EditPage plan={plan} spots={spots} region={region} google={google} setPlan={setPlan} setSpots={setSpots} setLegs={setLegs}/>
        </Route>
        <Route path='/plan/add'>
          <AddPage google={google} map={map} plan={plan} spots={spots}/>
        </Route>
        <Route path='/plan'>
          <CustomizedTimeline plan={plan} legs={legs} spots={spots}/>
          <Box display='flex' justifyContent='center'>
            <Button type="submit" variant="contained" onClick={handleClick}>EDIT</Button>
          </Box>
        </Route>
      </Switch>
    </PlanContext.Provider>
  )
}

export async function makePlan(google, region, originName, destinationName, spots){
  var waypts = spots.map(spot => {
    return {
      location: spot.formatted_address,
      stopover: true,
    }
  });
  var direction = await drivingDirection(google, originName, destinationName, waypts);

  var legs = direction.routes[0].legs;
  legs.map(leg => {
    leg.duration.value *= 2;
  })
  var points = getPoints(direction, spots);
  var plan = getPlan(points, legs, direction);
  // [plan, legs] = await insertLunch(google, map, plan, legs);
  console.log('makePlan');
  return [points, plan, legs];
}

const getPoints = (direction, places) => {
  var points = direction.routes[0].waypoint_order.map(i => {
    var point = places[i];
    point.stayTime = 1 * 3600;
    return point;
  });
  return points;
}

const getPlan = (points, legs, direction) => {
  var plan = points.slice();
  var origin = {
    name: direction.request.origin.query,
    geometry: {
      location: direction.routes[0].legs[0].start_location,
    },
    stayTime: 0,
  };
  var destination = {
    name: direction.request.destination.query,
    geometry: {
      location: direction.routes[0].legs.slice(-1)[0].end_location,
    },
    stayTime: 0,
  };
  plan.unshift(origin);
  plan.push(destination);

  var time = 9 * 3600;
  for(var i = 0; i < plan.length; i++){
    plan[i].arrivalTime = {
      text: getTimeStr(time),
      value: time,
    };
    if(i < legs.length){
      time += plan[i].stayTime + legs[i].duration.value;
    }
  }
  return plan;
}

// const insertLunch = async (google, map, points, legs) => {
//   var time = 9 * 3600;
//   var p = [], l = [];
//   var gotLunch = false;
//   for(var i = 0; i < points.length; i++){
//     p.push(points[i]);
//     time += points[i].stayTime;
//     if(time >= 12 * 3600 && gotLunch == false){
//       var [lunchPlace] = await findPlace(google, map, '昼食', points[i].geometry.location);
//       lunchPlace.stayTime = 3600;
//
//       var go = await drivingDirection(google, points[i].formatted_address, lunchPlace.formatted_address);
//       var goLeg = go.routes[0].legs[0];
//       var back = await drivingDirection(google, lunchPlace.formatted_address, points[i+1].formatted_address);
//       var backLeg = back.routes[0].legs[0];
//       goLeg.duration.value *= 2;
//       backLeg.duration.value *= 2;
//       time += goLeg.duration.value;
//       lunchPlace.arrivalTime = {
//         text: getTimeStr(time),
//         value: time,
//       }
//       time += backLeg.duration.value;
//       console.log(lunchPlace);
//       p.push(lunchPlace);
//       l.push(goLeg);
//       l.push(backLeg);
//       time += (goLeg.duration.value + backLeg.duration.value);
//       gotLunch = true;
//     }
//     else{
//       if(i < legs.length){
//         time += legs[i].duration.value;
//         l.push(legs[i]);
//       }
//     }
//   }
//   return [p, l];
// }



const findPlace = async (google, map, query, location) => {
  var service = new google.maps.places.PlacesService(map);
  var request = {
    query: query,
    fields: ['name', 'geometry', 'formatted_address'],
  };
  if(location != null){
    request.locationBias = {lat: location.lat(), lng: location.lng()};
  }
  var place = await new Promise(resolve => {
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      }
    });
  });
  return place;
}

const findPlaces = async (google, map, query, location) => {
  var service = new google.maps.places.PlacesService(map);
  var request = {
    location: new google.maps.LatLng(location.lat(), location.lng()),
    radius: '5000',
    query: '観光',
  }
  var places = await new Promise(resolve => {
    service.textSearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      }
    })
  })
  return places;
}

const drivingDirection = async (google, origin, destination, waypoints) => {
  const directionsService = new google.maps.DirectionsService();
  // const directionsRenderer = new google.maps.DirectionsRenderer({suppressPolylines: true});
  // directionsRenderer.setMap(map);
  var request = {
    origin,
    destination,
    travelMode: google.maps.TravelMode.DRIVING,
  };
  if(waypoints != null){
    request.waypoints = waypoints;
    request.optimizeWaypoints = true;
  }

  var direction = await directionsService
    .route(request)
    .then((response) => {
      // directionsRenderer.setDirections(response);
      return response;
    })
    .catch((e) => console.log("Directions request failed due to " + e));
  return direction
}

function getTimeStr(sum){
  var h = Math.floor(sum / 3600);
  var m = Math.floor((sum % 3600) / 60);
  return `${('00' + h).slice(-2)}:${('00' + m).slice(-2)}`;
}


// export default function PlanPage(props){
//   const history = useHistory();
//   const location = useLocation();
//   const mapContainerRef = useRef(null);
//   const google = useGoogle();
//   const map = useMap(google, mapContainerRef);
//   const region = useFindPlace(google, map, 'Osaka, Japan');
//   const places = useFindPlaces(google, map, '観光', region);
//   var waypts;
//   if(places != null){
//     waypts = places.slice(0, 5).map(place => {
//       return {
//         location: place.formatted_address,
//         stopover: true,
//       }
//     });
//   }
//
//   const direction = useDirection(google, '大阪駅', '萱嶋駅', waypts);
//   return(
//     <>
//       <Map mapContainerRef={mapContainerRef}/>
//       <CustomizedTimeline />
//     </>
//   )
// }
//
// const useGoogle = () => {
//   const [google, setGoogle] = useState(null);
//   useEffect(() => {
//     const API_KEY = "AIzaSyCkNip5D4glIDSddF__OlVzY1ovG5yVf7g";
//     const loader = new Loader({
//       apiKey: API_KEY,
//       version: "weekly",
//       libraries: ["places"],
//     });
//     loader.load().then((google) => {
//       setGoogle(google);
//     })
//   })
//   return google;
// }
//
// const useMap = (google, mapContainerRef) => {
//   const [map, setMap] = useState(null);
//   useEffect(() => {
//     if(google == null || mapContainerRef == null) return;
//     const initialConfig = {
//       zoom: 12,
//       center: { lat: 35.6432027, lng: 139.6729435 }
//     }
//     const map = new google.maps.Map(mapContainerRef.current, initialConfig);
//     setMap(map);
//   }, [google, mapContainerRef]);
//   return map;
// }
//
// const useFindPlace = (google, map, query, location) => {
//   const [place, setPlace] = useState(null);
//   useEffect(() => {
//     if(google == null || map == null) return;
//     var service = new google.maps.places.PlacesService(map);
//     var request = {
//       query: query,
//       fields: ['name', 'geometry', 'formatted_address'],
//     };
//     if(location != null){
//       request.locationBias = {lat: location.lat(), lng: location.lng()};
//     }
//     service.findPlaceFromQuery(request, function(results, status) {
//       if (status === google.maps.places.PlacesServiceStatus.OK) {
//         setPlace(results);
//       }
//     });
//   }, [google, map])
//   return place;
// }
//
// const useFindPlaces = (google, map, query, region) => {
//   const [places, setPlaces] = useState(null);
//   useEffect(() => {
//     if(google == null || region == null || map == null) return;
//     var service = new google.maps.places.PlacesService(map);
//     var request = {
//       location: new google.maps.LatLng(region[0].geometry.location.lat(), region[0].geometry.location.lng()),
//       radius: '5000',
//       query: '観光',
//     }
//     service.textSearch(request, (results, status) => {
//       if (status == google.maps.places.PlacesServiceStatus.OK) {
//         setPlaces(results);
//         console.log(results)
//       }
//     })
//   }, [google, map, region]);
//   return places;
// }
//
// const useDirection = (google, origin, destination, waypoints) => {
//   const [direction, setDirection] = useState(null);
//   useEffect(() => {
//     if(google == null || waypoints == null) return;
//     const directionsService = new google.maps.DirectionsService();
//     // const directionsRenderer = new google.maps.DirectionsRenderer({suppressPolylines: true});
//     // directionsRenderer.setMap(map);
//     var request = {
//       origin,
//       destination,
//       travelMode: google.maps.TravelMode.DRIVING,
//     };
//     if(waypoints != null){
//       request.waypoints = waypoints;
//       request.optimizeWaypoints = true;
//     }
//
//     directionsService
//       .route(request)
//       .then((response) => {
//         // directionsRenderer.setDirections(response);
//         setDirection(response);
//         console.log(response);
//         // return response;
//       })
//       .catch((e) => console.log("Directions request failed due to " + e));
//   }, [google, waypoints])
//
//   return direction;
// }
