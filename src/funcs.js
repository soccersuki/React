import {
  useState,
  useEffect,
  useContext
} from 'react';
import { Loader } from "@googlemaps/js-api-loader"
import { AppContext } from './App';

export const usePlan = () => {
  const {google, map, plan, setPlan, markers, setMarkers, condition} = useContext(AppContext);

  useEffect(async () => {
    if(google == null || map == null) return;

    // var regionName = '大阪', originName = '大阪駅', destinationName = '萱嶋駅';
    const {regionName, originName, destinationName, meal, status} = condition;
    if(status == 'cancel'){
      plan.newSpots = [...plan.spots];
      setPlan({...plan});
      var id = plan.spots.length;
      for(var i = id; i < markers.spotMarkers.length; i++){
        markers.spotMarkers[i].setMap(null);
      }
      markers.spotMarkers.splice(i);
      return plan;
    }
    var region = await findPlace(google, map, regionName);
    var origin = await findPlace(google, map, originName);
    var spots;
    if(status == 'first'){
      spots = await findPlaces(google, map, regionName + '観光', origin[0].geometry.location);
      spots = spots.slice(0, 5);
    }
    else if(status == 'new'){
      markers.originMarker.setMap(null);
      markers.destinationMarker.setMap(null);
      markers.spotMarkers.map(marker => {marker.setMap(null)});
      spots = plan.newSpots;
    }

    const newPlan = await makePlan(google, map, originName, destinationName, region, spots);
    if(meal) await insertLunch(google, map, newPlan);
    newPlan.newSpots = [...newPlan.spots];
    setPlan({...newPlan});



    var newMarkers = showMarker(google, map, newPlan.itinerary)
    setMarkers({...newMarkers});

    // console.log(region);
    // console.log(spots);
    console.log(newPlan);
  }, [google, map])
  return plan;
}

export const usePlace = (query, location) => {
  const [place, setPlace] = useState(null);
  const {google, map} = useContext(AppContext);
  useEffect(() => {
    if(google == null || map == null) return;
    var service = new google.maps.places.PlacesService(map);
    var request = {
      query: query,
      fields: ['name', 'geometry', 'formatted_address', 'photos'],
    };
    if(location == null){
      request.locationBias = {north: 45.29328154474485, east: 153.2360484603554, south: 26.151593390188783, west: 126.5636657976794};
    }
    else{
      request.locationBias = {lat: location.lat(), lng: location.lng()};
    }
    console.log(request)
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setPlace(results);
        console.log(results);
      }
    });
  }, [google, map])
  return place;
}

export const useNearbySearch = (region, type, keyword) => {
  const [places, setPlaces] = useState(null);
  const {google, map} = useContext(AppContext);

  useEffect(() => {
    if(google == null || map == null || region == null) return;
    var service = new google.maps.places.PlacesService(map);
    var request = {
      // location: new google.maps.LatLng(region[0].geometry.location.lat(), region[0].geometry.location.lng()),
      // radius: 50000,
      // type,
      query: keyword,
    }
    console.log(region[0].geometry.location.lat(), region[0].geometry.location.lng())
    service.textSearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);

      }
    })
  }, [google, map, region]);
  return places;
}

export const useGoogle = () => {
  // const [google, setGoogle] = useState(null);
  const {google, setGoogle} = useContext(AppContext);
  console.log(google);
  useEffect(() => {
    // if(google != null) return;
    const API_KEY = "AIzaSyCkNip5D4glIDSddF__OlVzY1ovG5yVf7g";
    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly",
      libraries: ["places"],
    });
    loader.load().then((google) => {
      setGoogle(google);
    })
  }, [])
  // return google;
}
export const useMap = (mapContainerRef) => {
  // const [map, setMap] = useState(null);
  const {google, setMap} = useContext(AppContext);
  useEffect(() => {
    console.log('useMap')
    if(google == null || mapContainerRef == null) return;
    const initialConfig = {
      zoom: 12,
      center: { lat: 35.6432027, lng: 139.6729435 }
    }
    const map = new google.maps.Map(mapContainerRef.current, initialConfig);
    setMap(map);
  }, [google, mapContainerRef]);
  // return map;
}

export function showMarker(google, map, itinerary){
  const label = 'abcdefghijklmnopqrstuvwxyz';
  const originOption = {
    position: {
      lat: itinerary[0].geometry.location.lat(),
      lng: itinerary[0].geometry.location.lng(),
    },
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/flag.png",
    },
  }
  const originMarker = new google.maps.Marker(originOption);
  originMarker.setMap(map)
  const destinationOption = {
    position: {
      lat: itinerary.slice(-1)[0].geometry.location.lat(),
      lng: itinerary.slice(-1)[0].geometry.location.lng(),
    },
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/flag.png",
    },
  }
  const destinationMarker = new google.maps.Marker(destinationOption);
  destinationMarker.setMap(map);
  const spotMarkers = [];
  const infoWindow = new google.maps.InfoWindow();
  for(var i = 1; i < itinerary.length-1; i++){
    const option = {
      position: {
        lat: itinerary[i].geometry.location.lat(),
        lng: itinerary[i].geometry.location.lng(),
      },
      map: map,
      label: {
        text: label[(i-1) % label.length],
        color: 'white',
      },
      title: itinerary[i].name,
      optimized: false,
      animation: google.maps.Animation.DROP,
    }
    const marker = new google.maps.Marker(option);
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
    marker.setMap(map)
    spotMarkers.push(marker);
  }
  map.setCenter({lat: itinerary[0].geometry.location.lat(), lng: itinerary[0].geometry.location.lng()});
  return {originMarker, destinationMarker, spotMarkers};
}

export async function makePlan(google, map, originName, destinationName, region, spots){
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
    leg.duration.newText = getDurationStr(leg.duration.value);
  })
  var newSpots = updateSpots(direction, spots);
  var itinerary = getItinerary(newSpots, legs, direction);
  return {spots: newSpots, itinerary, legs};
}

const updateSpots = (direction, spots) => {
  var newSpots = direction.routes[0].waypoint_order.map(i => {
    var spot = spots[i];
    spot.stayTime = {
      value: 1 * 3600,
      text: getDurationStr(1 * 3600),
    };
    return spot;
  });
  return newSpots;
}

const getItinerary = (spots, legs, direction) => {
  var itinerary = spots.slice();
  var origin = {
    name: direction.request.origin.query,
    geometry: {
      location: direction.routes[0].legs[0].start_location,
    },
    stayTime: {
      value: 0,
      text: getDurationStr(0),
    }
  };
  var destination = {
    name: direction.request.destination.query,
    geometry: {
      location: direction.routes[0].legs.slice(-1)[0].end_location,
    },
    stayTime: {
      value: 0,
      text: getDurationStr(0),
    }
  };
  itinerary.unshift(origin);
  itinerary.push(destination);

  var time = 9 * 3600;
  for(var i = 0; i < itinerary.length; i++){
    itinerary[i].arrivalTime = {
      text: getTimeStr(time),
      value: time,
    };
    time += itinerary[i].stayTime.value;
    itinerary[i].departureTime = {
      text: getTimeStr(time),
      value: time,
    }
    if(i < legs.length){
      time += legs[i].duration.value;
    }
  }
  return itinerary;
}

const insertLunch = async (google, map, plan) => {
  const {itinerary, legs, spots} = plan;
  for(var i = 0; i < itinerary.length - 1; i++){
    if(itinerary[i].departureTime.value >= 12 * 3600){
      var [lunch] = await findPlace(google, map, '昼食', itinerary[i].geometry.location);
      lunch.stayTime = {
        value: 3600,
        text: getDurationStr(3600),
      }
      var goDirection = await drivingDirection(google, itinerary[i].formatted_address, lunch.formatted_address);
      var goLeg = goDirection.routes[0].legs[0];
      var backDirection = await drivingDirection(google, lunch.formatted_address, itinerary[i+1].formatted_address);
      var backLeg = backDirection.routes[0].legs[0];
      goLeg.duration.value *= 2;
      goLeg.duration.newText = getDurationStr(goLeg.duration.value);
      backLeg.duration.value *= 2;
      backLeg.duration.newText = getDurationStr(backLeg.duration.value);
      var time = itinerary[i].departureTime.value + goLeg.duration.value;
      var duration = goLeg.duration.value + lunch.stayTime.value + backLeg.duration.value;
      lunch.arrivalTime = {
        value: time,
        text: getTimeStr(time),
      }
      time += lunch.stayTime.value;
      lunch.departureTime = {
        value: time,
        text: getTimeStr(time),
      }
      time += backLeg.duration.value;
      for(var j = i + 1; j < itinerary.length; j++){
        itinerary[j].arrivalTime.value += duration - legs[i].duration.value;
        itinerary[j].arrivalTime.text = getTimeStr(itinerary[j].arrivalTime.value)
        itinerary[j].departureTime.value += duration - legs[i].duration.value;
        itinerary[j].departureTime.text = getTimeStr(itinerary[j].departureTime.value);
      }
      itinerary.splice(i+1, 0, lunch);
      legs.splice(i, 1, goLeg, backLeg);
      spots.splice(i+1, 0, lunch);
      break;
    }
  }
}

export const findPlace = async (google, map, query, location) => {
  var service = new google.maps.places.PlacesService(map);
  var request = {
    query: query,
    fields: ['name', 'geometry', 'formatted_address', 'photos'],
  };
  if(location == null){
    request.locationBias = {north: 45.29328154474485, east: 153.2360484603554, south: 26.151593390188783, west: 126.5636657976794};
  }
  else{
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
    query,
  }
  if(location == null){
    request.bounds = {north: 45.29328154474485, east: 153.2360484603554, south: 26.151593390188783, west: 126.5636657976794};
  }
  else{
    request.location = {lat: location.lat(), lng: location.lng()};
    request.radius = 50000;
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

function getTimeStr(time){
  var h = Math.floor(time / 3600);
  var m = Math.floor((time % 3600) / 60);
  return `${('00' + h).slice(-2)}:${('00' + m).slice(-2)}`;
}
function getDurationStr(time){
  var h = Math.floor(time / 3600);
  var m = Math.floor((time % 3600) / 60);
  var str = '';
  if(h > 0) str += `${h}hour`;
  if((m == 0 && h == 0) || m > 0){
    str += `${m}min`;
  }
  return str;
}
