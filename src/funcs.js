import {
  useState,
  useEffect,
  useContext
} from 'react';
import { AppContext } from './App';

import { findPlace, findPlaces, drivingDirection, } from './googleMapAPI'

export const usePlan = () => {
  const {google, map, plan, setPlan, markers, setMarkers, condition, setPlaces} = useContext(AppContext);

  useEffect(async () => {
    if(google == null || map == null || condition == null) return;

    if(markers != null){
      markers.originMarker.setMap(null);
      markers.destinationMarker.setMap(null);
      markers.spotMarkers.map(marker => {marker.setMap(null)});
    }

    // const condition = {
    //   regionName: '大阪',
    //   originName: '大阪駅',
    //   destinationName: '萱嶋駅',
    //   meal: false,
    //   status: 'first',
    // }
    const {regionName, originName, destinationName, meal, status} = condition;
    var spots;
    if(plan == null){
      spots = await findSpots(google, map, regionName, originName);
      setPlaces(spots.slice(5))
      spots = spots.slice(0, 5);
    }
    else{
      spots = plan.newSpots;
      setPlan(null);
    }

    const newPlan = await makePlan(google, map, originName, destinationName, spots);
    if(meal) await insertLunch(google, map, newPlan);
    newPlan.newSpots = [...newPlan.spots];
    setPlan({...newPlan});

    // var newMarkers = showMarker(google, map, newPlan.itinerary)
    // setMarkers({...newMarkers});

    console.log(newPlan);
  }, [google, map, condition])
  return plan;
}

const findSpots = async (google, map, regionName, originName) => {
  var region = await findPlace(google, map, regionName);
  var origin = await findPlace(google, map, originName);
  var spots = await findPlaces(google, map, regionName + '観光', origin[0].geometry.location);
  return spots;
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

export function addMarker(google, map, place, label){
  const infoWindow = new google.maps.InfoWindow();
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

export async function makePlan(google, map, originName, destinationName, spots){
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
