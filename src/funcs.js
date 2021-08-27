export function showMarker(google, map, plan){
  for(var i = 0; i < plan.itinerary.length; i++){
    new google.maps.Marker({
      position: {
        lat: plan.itinerary[i].geometry.location.lat(),
        lng: plan.itinerary[i].geometry.location.lng(),
      },
      label: String(i),
      map: map,
    });
  }
  map.setCenter({lat: plan.itinerary[0].geometry.location.lat(), lng: plan.itinerary[0].geometry.location.lng()});
}

export async function makePlan(google, originName, destinationName, region, spots){
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
  var itinerary = getPlan(points, legs, direction);
  // [plan, legs] = await insertLunch(google, map, plan, legs);
  console.log('makePlan');
  return {spots: points, itinerary, legs};
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

export const findPlace = async (google, map, query, location) => {
  var service = new google.maps.places.PlacesService(map);
  var request = {
    query: query,
    fields: ['name', 'geometry', 'formatted_address', 'photos'],
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

export const findPlaces = async (google, map, query, location) => {
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
