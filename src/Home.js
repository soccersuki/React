import { useState, useContext, useEffect ,} from 'react'
import Map from './Map';
import {AppContext} from './MyContext'
import Top from './Top';
import Bottom from './Bottom';
import MySpeedDial from './MySpeedDial'

import { useGoogle } from './funcs/customHooks';
import { addMarkers, } from './funcs/markerFuncs';
import { findPlaces } from './funcs/googleMapAPI';

import { Box } from '@mui/material'

import FaceIcon from '@mui/icons-material/Face';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import NatureIcon from '@mui/icons-material/Nature';
import PetsIcon from '@mui/icons-material/Pets';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import RestaurantIcon from '@mui/icons-material/Restaurant';

import MySnackbar from './MySnackbar';
import MyDialog from './MyDialog'
import MyDrawer from './MyDrawer'
import ConditionPage from './ConditionPage'
import PlaceDetail from './PlaceDetail'

const types = [
  {name: 'plan', japanese: 'プラン', query: '', icon: <FaceIcon />, iconCode: '\ue87c'},
  {name: 'touristAttractions', japanese: '観光スポット', query: '観光スポット', icon: <EmojiPeopleIcon />, iconCode: '\uea1d'},
  {name: 'restrant', japanese: 'レストラン', query: 'レストラン', icon: <RestaurantIcon />, iconCode: '\ue56c'},
  {name: 'park', japanese: '公園', query: '公園', icon: <NatureIcon />,iconCode: '\ue406'},
  {name: 'cafe', japanese: 'カフェ', query: 'カフェ', icon: <LocalCafeIcon />,iconCode: '\ue541'},
  {name: 'amusementPark', japanese: '遊園地', query: '遊園地', icon: <PetsIcon />,iconCode: '\ue91d'},
]

export default function Home(){
  const [chipIndex, setChipIndex] = useState(0);
  const { google, map, plan, setPlan, snackbarState, dialogState, drawerState} = useContext(AppContext)
  const [places, setPlaces] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [display, setDisplay] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleClick = async (id) => {
    setChipIndex(id);
    var places;
    if(id == 0) places = plan?.places;
    else places = await findPlaces(google, map, types[id].query);
    setPlaces(places);
  }
  const handleSubmit = async (text) => {
    setChipIndex(-1);
    var places = await findPlaces(google, map, text);
    setPlaces(places);
  }

  useEffect(() => {
    snackbarState.handleOpen('プランを新規作成しましょう')
    dialogState.handleOpen('new')
    drawerState.toggle('bottom', true, <ConditionPage />);
  }, [])

  useEffect(() => {
    if(plan == null) return;
    var places
    if(chipIndex == 0) places = plan?.places;
    setPlaces(places)
    dialogState.handleClose()
    snackbarState.handleOpen('プランが完成しました')
  }, [plan])

  useEffect(() => {
    if(places == null) return;
    setCarouselIndex(0);
    setDisplay(true);

    var markers;
    if(chipIndex == 0) markers = addMarkers(google, map, plan?.places, types[chipIndex], plan?.origin, plan?.destination)
    else markers = addMarkers(google, map, places, chipIndex == -1 ? types[1] : types[chipIndex])
    markers.markers.map((marker, id) => {
      marker.addListener('click', ()=>{
        for(var i = 0; i < places.length; i++){
          if(places[i].name == marker.title){
            setCarouselIndex(i)
            break;
          }
        }
      })
    })
    setMarkers(markers)
    map.panTo({lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng()})

    return () => {
      setDisplay(false);
      if(markers != null){
        markers.markers.map((marker) => marker.setMap(null));
        if(markers.originMarker != null) markers.originMarker.setMap(null);
        if(markers.destinationMarker != null) markers.destinationMarker.setMap(null);
      }
    }
  }, [places])

  const deletePlace = (id) => {
    markers.markers[id]?.setMap(null);
    markers.markers.splice(id, 1);
    setMarkers(markers)
    places.splice(id, 1);
    setPlaces(places);
    if(id < places.length) map.panTo({lat: places[id].geometry.location.lat(), lng: places[id].geometry.location.lng()})
  }
  const handleClickDelete = (plan, place, id) => {
    if(id != null) deletePlace(id);
    setPlan(plan);
    plan.changed = true;
    snackbarState.handleOpen('削除しました')
    drawerState.toggle('bottom', false)
    console.log(plan)
  }
  const handleClickAdd = (plan, place, id) => {
    place.type = 'plan'
    place.label = 'new';
    plan.places.push(place);
    plan.changed = true;
    if(id != null) deletePlace(id);
    setPlan(plan);
    snackbarState.handleOpen('追加しました')
    drawerState.toggle('bottom', false)
  }
  const handleClickPOI = (event) => {
    if(event.placeId){
      drawerState.toggle('bottom', true, <PlaceDetail place={{place_id: event.placeId}} handleClickAdd={handleClickAdd} handleClickDelete={handleClickDelete}/>);
    }
  }

  return(
    <Box sx={{width: '100%', position: 'relative',}}>
      <div style={{height: window.innerHeight}}>
        <Map handleClickPOI={handleClickPOI}/>
      </div>
      <Box style={{position: 'absolute', width: '100%', top: 20}}>
        <Top onClick={handleClick} chipIndex={chipIndex} types={types} onSubmit={handleSubmit}/>
      </Box>
      <Box style={{position: 'absolute', width: '100%', bottom: 20}}>
        <Bottom carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex} places={places} display={display} handleClickAdd={handleClickAdd} handleClickDelete={handleClickDelete}/>
      </Box>
      <Box style={{position: 'absolute', bottom: 20, right: 70}}>
        <MySpeedDial />
      </Box>
      <MySnackbar {...snackbarState}/>
      <MyDrawer {...drawerState}/>
    </Box>
  );
}
