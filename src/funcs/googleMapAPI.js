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
    // request.bounds = {north: 45.29328154474485, east: 153.2360484603554, south: 26.151593390188783, west: 126.5636657976794};
    request.bounds = map.getBounds();
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

export const getDetail = async (google, map, placeId) => {
  var request = {
    placeId,
  };

  const service = new google.maps.places.PlacesService(map);
  const place = await new Promise(resolve => {
    service.getDetails(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      }
    });
  })
  return place;
}

export const drivingDirection = async (google, origin, destination, waypoints) => {
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
