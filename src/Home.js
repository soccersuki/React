import { useState, useContext, useEffect ,} from 'react'
import Map from './Map';
import {AppContext} from './App'
import Top from './Top';
import Bottom from './Bottom';
import Action from './Action'

import { useGoogle } from './funcs/customHooks';
import { usePlan, } from './funcs/customHooks'
import { addMarkers, } from './funcs/markerFuncs';
import { findPlaces } from './funcs/googleMapAPI';

import { makeStyles } from '@material-ui/core/styles';
import { Box, } from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import NatureIcon from '@material-ui/icons/Nature';
import PetsIcon from '@material-ui/icons/Pets';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import RestaurantIcon from '@material-ui/icons/Restaurant';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
  },
}));

export default function Home(){
  const classes = useStyles();
  const types = [
    {name: 'plan', japanese: 'プラン', query: '', icon: <FaceIcon />, iconCode: '\ue87c'},
    {name: 'touristAttractions', japanese: '観光スポット', query: '観光スポット', icon: <EmojiPeopleIcon />, iconCode: '\uea1d'},
    {name: 'restrant', japanese: 'レストラン', query: 'レストラン', icon: <RestaurantIcon />, iconCode: '\ue56c'},
    {name: 'park', japanese: '公園', query: '公園', icon: <NatureIcon />,iconCode: '\ue406'},
    {name: 'cafe', japanese: 'カフェ', query: 'カフェ', icon: <LocalCafeIcon />,iconCode: '\ue541'},
    {name: 'amusementPark', japanese: '遊園地', query: '遊園地', icon: <PetsIcon />,iconCode: '\ue91d'},
  ]
  const [chipIndex, setChipIndex] = useState(0);
  const { google, map, plan } = useContext(AppContext)
  const [places, setPlaces] = useState(null);
  const [text, setText] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [display, setDisplay] = useState(false);

  useGoogle();
  usePlan(setChipIndex);

  const handleClick = async (id) => {
    setChipIndex(id);
  }
  const handleSubmit = async (text) => {
    setText(text)
    setChipIndex(-1);
  }

  useEffect(() => {
    (async() => {
      var places;
      if(chipIndex == 0){
        places = plan == null ? null : plan.places;
      }
      else if(chipIndex == -1){
        places = await findPlaces(google, map, text);
      }
      else{
        places = await findPlaces(google, map, types[chipIndex].query);
      }
      setPlaces(places);
      if(places == null) return;

      setDisplay(true);
    })()

    return () => {
      setDisplay(false);
    }
  }, [chipIndex, plan])

  useEffect(() => {
    if(places == null) return;
    var markers;
    if(chipIndex == 0) markers = addMarkers(google, map, places, types[chipIndex], plan.origin, plan.destination)
    else markers = addMarkers(google, map, places, types[chipIndex])
    setMarkers(markers);
    map.panTo({lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng()})
    return () => {
      if(markers != null){
        markers.markers.map((marker) => marker.setMap(null));
        if(markers.originMarker != null) markers.originMarker.setMap(null);
        if(markers.destinationMarker != null) markers.destinationMarker.setMap(null);
      }
    }
  }, [places])

  return(
    <Box className={classes.root}>
      <div style={{height: window.innerHeight}}>
        <Map />
      </div>
      <Box style={{position: 'absolute', width: '100%', top: 20}}>
        <Top onClick={handleClick} chipIndex={chipIndex} types={types} onSubmit={handleSubmit}/>
      </Box>
      <Box style={{position: 'absolute', width: '100%', bottom: 20}}>
        <Bottom chipIndex={chipIndex} setChipIndex={setChipIndex} types={types} places={places} markers={markers} setMarkers={setMarkers} display={display}/>
      </Box>
      <Box style={{position: 'absolute', bottom: 220, right: 70}}>
        <Action />
      </Box>
    </Box>
  );
}
