export function addMarkers(google, map, places, origin, destination){
  const labels = 'abcdefghijklmnopqrstuvwxyz';
  const infoWindow = new google.maps.InfoWindow();
  const originMarker = origin == null ? null : addMarker(google, map, infoWindow, origin, labels[25])
  const destinationMarker = destination == null ? null : addMarker(google, map, infoWindow, destination, labels[25])
  const markers = places.map((place, id) => addMarker(google, map, infoWindow, place, labels[id]))
  return {markers, originMarker, destinationMarker}
}

export function addMarker(google, map, infoWindow, place, label){
  const option = {
    position: {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    },
    map: map,
    label: {
      text: label,
      color: 'white',
    },
    title: place.name,
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
  return marker;
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
    const marker = addMarker(google, map, itinerary[i], label[(i-1) % label.length]);
    spotMarkers.push(marker);
  }
  map.setCenter({lat: itinerary[0].geometry.location.lat(), lng: itinerary[0].geometry.location.lng()});
  return {originMarker, destinationMarker, spotMarkers};
}
