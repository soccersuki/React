import { useState, useRef, useEffect, useContext } from 'react'

import {
  PlanContext,
} from './PlanPages';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '30vh',
  },
}));

export default function Map(props){
  const mapContainerRef = useRef(null);
  useMap(mapContainerRef)
  return(
    <>
      <div ref={mapContainerRef} style={{height: "30vh"}}>I can use the DOM with react ref</div>
    </>
  )
}

const useMap = (mapContainerRef) => {
  // const [map, setMap] = useState(null);
  const {google, setMap} = useContext(PlanContext);
  useEffect(() => {
    console.log('useMap')
    if(google == null || mapContainerRef == null) return;
    const initialConfig = {
      zoom: 12,
      center: { lat: 35.6432027, lng: 139.6729435 }
    }
    const map = new google.maps.Map(mapContainerRef.current, initialConfig);
    setMap(map);
  }, [google, mapContainerRef]);
  // return map;
}
