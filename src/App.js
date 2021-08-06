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

function Home() {
  return(
    <>
      <h2>Home</h2>

    </>
  );
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

const API_KEY = "AIzaSyCkNip5D4glIDSddF__OlVzY1ovG5yVf7g";
const initialConfig = {
  zoom: 12,
  center: { lat: 35.6432027, lng: 139.6729435 }
}

const useDirection = ({ google, map, origin, destination, waypts }) => {
  useEffect(() => {
    if (!google || !map || !waypts) {
      return
    }
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({suppressPolylines: true});

    directionsRenderer.setMap(map);
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
      })
      .catch((e) => window.alert("Directions request failed due to " + e));
  }, [google, map, waypts])
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
        // console.log(results[0].geometry)
        // console.log(results[0].geometry.location.lat())
        var request = {
          location: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
          radius: '5000',
          query: '観光',
        }
        service.textSearch(request, (results, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            const waypts = results.map((place) => {
              return {location: place.formatted_address, stopover: true,}
            })
            setPlaces(waypts);
          }
        });
      }
    });
    // var place = new google.maps.LatLng(34.702044413318625, 135.49532845470955);

    // var request = {
    //   location: place,
    //   radius: '500',
    //   query: '観光'
    // };

    // var service = new google.maps.places.PlacesService(map);
    // service.textSearch(request, (results, status) => {
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     console.log(results);
    //     const waypts = results.map((place) => {
    //       return {location: place.formatted_address, stopover: true,}
    //     })
    //     setPlaces(waypts);
    //   }
    // });
  }, [google, map])
  return places
}

function Result() {
  const location = useLocation();
  const google = useGoogle(API_KEY);
  const mapContainerRef = useRef(null);

  const map = useMap({ google, mapContainerRef, initialConfig });
  var place = location.state.place, origin = location.state.origin, destination = location.state.destination;
  var waypts = usePlace({ google, map, place});
  useDirection({ google, map, origin, destination, waypts })
  return(
    <>
      <h2>Result</h2>
      <p>{location.state.place}</p>
      <p>{location.state.origin}</p>
      <p>{location.state.destination}</p>
      <div ref={mapContainerRef} style={{height: "100vh"}}>I can use the DOM with react ref</div>
    </>
  )
}
export default App;
