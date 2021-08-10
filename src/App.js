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



function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/place">Place</Link>
            </li>
            <li>
              <Link to="/origin-and-destination">OriginAndDestination</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/place">
            <Place />
          </Route>
          <Route path="/origin-and-destination">
            <OriginAndDestination />
          </Route>
          <Route path="/result">
            <Result />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const FormPlace = (props) => {
  const [text, setText] = useState('');
  const history = useHistory();
  const handleChange = (e) => {
    setText(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(props.path, {text: text});
  }

  return(
    <form onSubmit={handleSubmit}>
      <p>{text}</p>
      <input type='text' onChange={handleChange}/>
      <input type='submit' />
    </form>
  )
}

const FormOAndD = (props) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const history = useHistory();
  const handleChangeOrigin = (e) => {
    setOrigin(e.target.value);
  }
  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(props.path, {place: props.place, origin: origin, destination: destination});
  }

  return(
    <form onSubmit={handleSubmit}>
      <div><p>Origin: {origin}</p>
      <input type='text' onChange={handleChangeOrigin}/>
      </div>
      <div><p>Destination: {destination}</p>
      <input type='text' onChange={handleChangeDestination}/>
      </div>
      <input type='submit' />
    </form>
  )
}

const API_KEY = "AIzaSyCkNip5D4glIDSddF__OlVzY1ovG5yVf7g";
const initialConfig = {
  zoom: 12,
  center: { lat: 35.6432027, lng: 139.6729435 }
}

var google, map;

function Home() {
  const mapContainerRef = useRef(null);
  useEffect(async () => {
    const loader = new Loader({
      apiKey: "AIzaSyCkNip5D4glIDSddF__OlVzY1ovG5yVf7g",
      version: "weekly",
      libraries: ["places"],
    });
    google = await loader.load().then((google) => {
      return google;
    })
    map = new google.maps.Map(mapContainerRef.current, initialConfig);
    var regionQuery = '大阪';
    var service = new google.maps.places.PlacesService(map);
    var request = {
      query: regionQuery,
      fields: ['name', 'geometry'],
    };
    var region = await new Promise(resolve => {
      service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        }
      });
    });
    request = {
      location: new google.maps.LatLng(region[0].geometry.location.lat(), region[0].geometry.location.lng()),
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
    console.log(places);

    const directionsService = new google.maps.DirectionsService();
    // const directionsRenderer = new google.maps.DirectionsRenderer({suppressPolylines: true});
    // directionsRenderer.setMap(map);
    var waypts = places.map(place => {
      return {
        location: place.formatted_address,
        stopover: true,
      }
    });
    waypts = waypts.slice(0, 5)
    var origin = '大阪駅';
    var destination = '萱嶋駅';

    var direction = await directionsService
      .route({
        origin: origin,
        destination: destination,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        // directionsRenderer.setDirections(response);
        return response;
      })
      .catch((e) => window.alert("Directions request failed due to " + e));

    console.log(direction);

    var legs = direction.routes[0].legs;
    var points = getPoints(direction, places);
    console.log(legs);
    console.log(points);
    var plan = await getPlan(points, legs);
    console.log(plan);
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
  });
  return(
    <>
      <h2>Home</h2>
      <div ref={mapContainerRef} style={{height: "100vh"}}>I can use the DOM with react ref</div>
    </>
  );
}

const getPoints = (direction, places) => {
  var waypts = places.slice(0, 5);
  var points = direction.routes[0].waypoint_order.map(i => waypts[i]);
  var origin = {
    name: direction.request.origin.query,
    geometry: {
      location: direction.routes[0].legs[0].start_location,
    }
  };
  var destination = {
    name: direction.request.destination.query,
    geometry: {
      location: direction.routes[0].legs.slice(-1)[0].end_location,
    }
  };
  points.unshift(origin);
  points.push(destination);
  return points;
}

const getPlan = async (points, legs) => {
  var sum = 9 * 3600;
  var p = [], l = [];
  var gotLunch = false;
  for(var i = 0; i < points.length; i++){
    p.push(points[i]);
    var stayingTime = 3600;
    sum += stayingTime;
    if(sum >= 12 * 3600 && gotLunch == false){
      var [lunchPlace] = await findPlace('昼食', points[i].geometry.location);
      console.log(lunchPlace);
      var nowToLunch = await drivingDirection(points[i].formatted_address, lunchPlace.formatted_address);
      var leg1 = nowToLunch.routes[0].legs[0];
      var lunchToNext = await drivingDirection(lunchPlace.formatted_address, points[i+1].formatted_address);
      var leg2 = lunchToNext.routes[0].legs[0];
      p.push(lunchPlace);
      l.push(leg1);
      l.push(leg2);
      sum += leg1.duration.value + leg2.duration.value;
      gotLunch = true;
    }
    else{
      if(i < legs.length){
        sum += legs[i].duration.value;
        l.push(legs[i]);
      }
    }
  }
  var plan = [];
  sum = 9 * 3600;
  for(var i = 0; i < p.length; i++){
    var stayingTime = 1800;
    var spot = {
      name: p[i].name,
      formatted_address: p[i].formatted_address,
      geometry: p[i].geometry,
      arrivalTime: {
        text: getTimeStr(sum),
        value: sum,
      },
      stayingTime,
    }
    plan.push(spot);
    if(i < l.length){
      sum += stayingTime + l[i].duration.value;
    }
  }
  return plan;
}

const findPlace = async (query, location) => {
  var service = new google.maps.places.PlacesService(map);
  var request = {
    query: query,
    fields: ['name', 'geometry', 'formatted_address'],
    locationBias: {lat: location.lat(), lng: location.lng()},
  };
  var place = await new Promise(resolve => {
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      }
    });
  });
  return place;
}

const drivingDirection = async (origin, destination) => {
  const directionsService = new google.maps.DirectionsService();
  // const directionsRenderer = new google.maps.DirectionsRenderer({suppressPolylines: true});
  // directionsRenderer.setMap(map);
  var direction = await directionsService
    .route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    })
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

function Place() {
  return(
    <>
      <h2>Place</h2>
      <FormPlace path='/origin-and-destination'/>
    </>
  );
}

function OriginAndDestination() {
  const location = useLocation();
  return(
    <>
      <h2>OriginAndDestination</h2>
      <p>{location.state.text}</p>
      <FormOAndD path='/result' place={location.state.text}/>
    </>
  );
}

const useGoogle = (apiKey) => {
  const [google, setGoogle] = useState(null);
  const loader = new Loader({
    apiKey: "AIzaSyCkNip5D4glIDSddF__OlVzY1ovG5yVf7g",
    version: "weekly",
    libraries: ["places"],
  });
  useEffect(() => {
    loader.load().then((google) => {
      setGoogle(google)
    })
  }, []) // useEffectの第二引数を[]にすることで、初回1回目だけ実行される
  return google
}

const useMap = ({ google, mapContainerRef, initialConfig }) => {
  const [map, setMap] = useState(null)
  useEffect(() => {
    // googleMapかmapContainerRefが初期化されてなければ何もしない
    if (!google || !mapContainerRef.current) {
      return
    }
    const map = new google.maps.Map(mapContainerRef.current, initialConfig)
    setMap(map)
  }, [google, mapContainerRef])
  return map
}


const useDirection = ({ google, map, origin, destination, places }) => {
  const [direction, setDirection] = useState(null);
  useEffect(() => {
    if (!google || !map || !places) {
      return
    }
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({suppressPolylines: true});

    directionsRenderer.setMap(map);
    var waypts = places.map(place => {
      return {
        location: place.formatted_address,
        stopover: true,
      }
    });
    waypts = waypts.slice(0, 5)

    directionsService
      .route({
        origin: origin,
        destination: destination,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        console.log(response)
        setDirection(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + e));
  }, [google, map, places])
  return direction;
}

const usePlace = ({ google, map, place }) =>{
  const [places, setPlaces] = useState(null);
  useEffect(() => {
    if (!google || !map) {
      return
    }
    var service = new google.maps.places.PlacesService(map);
    var request = {
      query: place,
      fields: ['name', 'geometry'],
    };
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var request = {
          location: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
          radius: '5000',
          query: '観光',
        }
        service.textSearch(request, (results, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            setPlaces(results);
          }
        });
      }
    });
  }, [google, map])
  return places
}

const Legs = (props) => {
  if(props.direction == null) return(null);
  var points = getPoints(props.direction, props.places);
  var legs = props.direction.routes[0].legs;
  var sum = 9 * 3600;
  var startList = props.route.map(leg => {
    var time = sum;
    sum += 3600 + leg.duration.value;
    return(
      <li>
        <p>{getTimeStr(time)}, {leg.start_address}</p>
        <p>stay for 1 hour</p>
        <p>transit: {leg.duration.text}</p>
      </li>
    )
  });

  startList.push(<li>
                   <p>{getTimeStr(sum)}, {props.route.slice(-1)[0].end_address}</p>
                 </li>
               );
  return(
    <>
      <ul>{startList}</ul>
    </>
  )
}




function Result() {
  const location = useLocation();
  const google = useGoogle(API_KEY);
  const mapContainerRef = useRef(null);

  const map = useMap({ google, mapContainerRef, initialConfig });
  var place = location.state.place, origin = location.state.origin, destination = location.state.destination;
  var places = usePlace({ google, map, place});
  var direction = useDirection({ google, map, origin, destination, places })
  return(
    <>
      <h2>Result</h2>
      <p>{location.state.place}</p>
      <p>{location.state.origin}</p>
      <p>{location.state.destination}</p>
      <Legs direction={direction} places={places}/>
      <div ref={mapContainerRef} style={{height: "100vh"}}>I can use the DOM with react ref</div>
    </>
  )
}
export default App;
