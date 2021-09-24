import { AppContext } from './App'
import { useEffect, useContext, } from 'react'
import { Loader } from "@googlemaps/js-api-loader"


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
