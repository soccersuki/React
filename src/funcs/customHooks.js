import { AppContext } from '../App'
import { useEffect, useContext, } from 'react'
import { Loader } from "@googlemaps/js-api-loader"
import { findPlace, findPlaces, } from './googleMapAPI';
import { makePlan, insertLunch, } from './planFuncs';

export const useGoogle = () => {
  const {google, setGoogle} = useContext(AppContext);
  useEffect(() => {
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
}

export const usePlan = (setChipIndex) => {
  const {google, map, plan, setPlan, condition, } = useContext(AppContext);

  useEffect(async () => {
    if(google == null || map == null || condition == null) return;

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
    }

    const newPlan = await makePlan(google, map, originName, destinationName, places);
    if(meal) await insertLunch(google, map, newPlan);
    setPlan({...newPlan});

    console.log(newPlan);
  }, [google, map, condition])
}
