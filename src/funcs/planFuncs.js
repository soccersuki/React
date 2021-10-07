import { findPlace, findPlaces, drivingDirection, } from './googleMapAPI'

export async function makePlan(google, map, plan, condition){
  var {regionName, originName, destinationName, lunch, dinner, departureTime, arrivalTime, status} = condition;
  if(arrivalTime == null) arrivalTime = 21 * 3600
  var [origin] = await findPlace(google, map, originName);
  var [destination] = await findPlace(google, map, destinationName);
  var places = await getPlaces(google, map, plan, departureTime, arrivalTime, lunch, dinner, status, regionName);
  var waypts = places.map(place => {
    return{
      location: place.formatted_address,
      stopover: true,
    }
  });
  var direction = await drivingDirection(google, originName, destinationName, waypts);
  direction.routes[0].legs.map(leg => { setDuration(leg, leg.duration.value * 2)});

  places = direction.routes[0].waypoint_order.map(i => places[i]);

  setDuration(origin, 0);
  setDuration(destination, 0);
  places.map(place => setDuration(place, 3600));

  var itinerary = [origin, ...places, destination];
  setTime(itinerary, direction.routes[0].legs, departureTime)

  if(lunch) await insertPlace(google, map, itinerary, direction.routes[0].legs, places, 12 * 3600, '昼食', departureTime);
  if(dinner) await insertPlace(google, map, itinerary, direction.routes[0].legs, places, 18 * 3600, '夕食', departureTime);

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  places.map((place, i) => {
    place.type = 'plan';
    place.label = alphabet[i];
  })
  return {places, origin, destination, itinerary, legs: direction.routes[0].legs};
}

async function getPlaces(google, map, plan, departureTime, arrivalTime, lunch, dinner, status, regionName){
  var duration = (arrivalTime - departureTime);
  if(lunch) duration -= 3600;
  if(dinner) duration -= 3600;
  var num = duration / (75 * 60)

  var places = []
  if(status != 'new') places = plan.places;
  const allPlaces = await findPlaces(google, map, regionName + ' 観光');
  places = places.concat(allPlaces.slice(0, num - places.length))
  return places;
}

const setDuration = (place, value) => {
  place.duration = {
    value: Math.floor(value),
    text: getDurationStr(value),
  }
}

const getItinerary = (places, origin, destination, legs, departureTime) => {
  var itinerary = places.slice();
  itinerary.unshift(origin);
  itinerary.push(destination);
  return itinerary;
}

export const setTime = (itinerary, legs, departureTime) => {
  var time = departureTime;
  for(var i = 0; i < itinerary.length; i++){
    itinerary[i].arrivalTime = {
      text: getTimeStr(time),
      value: time,
    };
    time += itinerary[i].duration.value;
    itinerary[i].departureTime = {
      text: getTimeStr(time),
      value: time,
    }
    if(i < legs.length){
      time += legs[i].duration.value;
    }
  }
}

export const insertPlace = async (google, map, itinerary, legs, places, time, query, departureTime) => {
  for(var i = 0; i < itinerary.length - 1; i++){
    if(itinerary[i].departureTime.value >= time){
      var [lunch] = await findPlace(google, map, query, itinerary[i].geometry.location);
      lunch.duration = {
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
      itinerary.splice(i+1, 0, lunch);
      legs.splice(i, 1, goLeg, backLeg);
      places.splice(i+1, 0, lunch);
      break;
    }
  }
  setTime(itinerary, legs, departureTime);
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
