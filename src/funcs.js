import { useState, useEffect, useContext } from 'react';
import { AppContext } from './App';

import { findPlace, findPlaces, drivingDirection, } from './googleMapAPI'

export const usePlan = (setChipIndex) => {
  const {google, map, plan, setPlan, condition, } = useContext(AppContext);

  useEffect(async () => {
    if(google == null || map == null || condition == null) return;

    // if(markers != null){
    //   markers.originMarker.setMap(null);
    //   markers.destinationMarker.setMap(null);
    //   markers.placeMarkers.map(marker => {marker.setMap(null)});
    // }

    // const condition = {
    //   regionName: '大阪',
    //   originName: '大阪駅',
    //   destinationName: '萱嶋駅',
    //   meal: false,
    //   status: 'first',
    // }
    const {regionName, originName, destinationName, meal, status} = condition;
    const origin = await findPlace(google, map, originName);
    const destination = await findPlace(google, map, destinationName);
    var places;
    if(status == 'new'){
      places = await findPlaces(google, map, regionName + ' 観光');
      places = places.slice(0, 5);
    }
    else{
      places = plan.places;
      // setPlan(null);
    }

    const newPlan = await makePlan(google, map, originName, destinationName, places);
    if(meal) await insertLunch(google, map, newPlan);
    // newPlan.newplaces = [...newPlan.places];
    setPlan({...newPlan});
    setChipIndex(0)

    console.log(newPlan);
  }, [google, map, condition])
}

export async function makePlan(google, map, originName, destinationName, places){
  var waypts = places.map(place => {
    return {
      location: place.formatted_address,
      stopover: true,
    }
  });
  const origin = await findPlace(google, map, originName);
  const destination = await findPlace(google, map, destinationName);
  var direction = await drivingDirection(google, originName, destinationName, waypts);
  var legs = direction.routes[0].legs;
  legs.map(leg => {
    leg.duration.value *= 2;
    leg.duration.newText = getDurationStr(leg.duration.value);
  })
  places = updatePlaces(direction, places, origin, destination);
  var itinerary = getItinerary(places, origin, destination, legs, direction);
  return {places, origin, destination, itinerary, legs};
}

const updatePlaces = (direction, places, origin, destination) => {
  origin.stayTime = {
    value: 0,
    text: getDurationStr(0),
  }
  destination.stayTime = {
    value: 0,
    text: getDurationStr(0),
  }
  return direction.routes[0].waypoint_order.map(i => {
    var place = places[i];
    place.stayTime = {
      value: 1 * 3600,
      text: getDurationStr(1 * 3600),
    };
    return place;
  });
}

const getItinerary = (places, origin, destination, legs, direction) => {
  var itinerary = places.slice();
  // var origin = {
  //   name: direction.request.origin.query,
  //   geometry: {
  //     location: direction.routes[0].legs[0].start_location,
  //   },
  //   stayTime: {
  //     value: 0,
  //     text: getDurationStr(0),
  //   }
  // };
  // var destination = {
  //   name: direction.request.destination.query,
  //   geometry: {
  //     location: direction.routes[0].legs.slice(-1)[0].end_location,
  //   },
  //   stayTime: {
  //     value: 0,
  //     text: getDurationStr(0),
  //   }
  // };
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
  const {itinerary, legs, places} = plan;
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
      places.splice(i+1, 0, lunch);
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
