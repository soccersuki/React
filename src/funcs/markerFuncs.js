export function addMarkers(google, map, places, type, origin, destination){
  const infoWindow = new google.maps.InfoWindow();
  const originMarker = origin == null ? null : addMarker(google, map, infoWindow, origin, null)
  const destinationMarker = destination == null ? null : addMarker(google, map, infoWindow, destination, null)
  const markers = places?.map((place, id) => {
    const labelText = type.name == 'plan' ? place.label : type.iconCode;
    return addMarker(google, map, infoWindow, place, labelText, type.name == 'plan' ? null : 'Material Icons')
  })
  return {markers, originMarker, destinationMarker}
}

export function addMarker(google, map, infoWindow, place, labelText, fontFamily){
  const label = {
    text: labelText, // codepoint from https://fonts.google.com/icons
    color: "#ffffff",
    fontSize: "14px"
  }
  if(fontFamily != null) label.fontFamily = fontFamily
  const option = {
    position: {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    },
    map: map,
    label: label,
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
