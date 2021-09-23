import { useState, useRef, useEffect, useContext } from 'react'

import { AppContext } from './App'


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

export default function Map(props){
  const classes = useStyles();
  const {google, setMap} = useContext(AppContext);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if(google == null || mapContainerRef == null) return;
    const initialConfig = {
      zoom: 15,
      center: { lat: 35.6432027, lng: 139.6729435 },
      disableDefaultUI: true,
    }
    const map = new google.maps.Map(mapContainerRef.current, initialConfig);
    setMap(map);
  }, [google, mapContainerRef]);

  return(
    <>
      <div ref={mapContainerRef} className={classes.root} style={{height: '100%'}}>I can use the DOM with react ref</div>
    </>
  )
}
