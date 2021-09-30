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

export const usePlan = (cnt, setCnt) => {
  const {google, map, plan, setPlan, condition, } = useContext(AppContext);

  useEffect(async () => {
    if(google == null || map == null || condition == null) return;

    const newPlan = await makePlan(google, map, plan, condition);
    setPlan({...newPlan});
    console.log(newPlan);
    setCnt(cnt + 1)
  }, [google, map, condition])
}
