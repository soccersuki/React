export function showMarker(google, map, itinerary){
  for(var i = 0; i < itinerary.length; i++){
    new google.maps.Marker({
      position: {
        lat: itinerary[i].geometry.location.lat(),
        lng: itinerary[i].geometry.location.lng(),
      },
      label: String(i),
      map: map,
    });
  }
  map.setCenter({lat: itinerary[0].geometry.location.lat(), lng: itinerary[0].geometry.location.lng()});
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
  // [plan, legs] = await insertLunch(google, map, plan, legs);
  await insertLunch(google, map, itinerary, legs);
  console.log('makePlan');
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

const insertLunch = async (google, map, itinerary, legs) => {
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
        itinerary[j].arrivalTime.value += duration;
        itinerary[j].arrivalTime.text = getTimeStr(itinerary[j].arrivalTime.value)
        itinerary[j].departureTime.value += duration;
        itinerary[j].departureTime.text = getTimeStr(itinerary[j].departureTime.value);
      }
      itinerary.splice(i, 0, lunch);
      legs.splice(i, 1, goLeg, backLeg);
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
    query,
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
