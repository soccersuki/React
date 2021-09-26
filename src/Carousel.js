import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import MediaCard from './MediaCard';

import { Box} from '@material-ui/core';

import { useState, useContext, useEffect} from 'react'

import MyDrawer from './MyDrawer'
import PlaceDetail from './PlaceDetail'

import { AppContext, } from './App'

const styles = {
  slideContainer: {
    padding: 15,
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
};



function PlaceCard(props){
  const {place} = props;
  const [openDrawer, setOpenDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => {
    setOpenDrawer({ ...openDrawer, [anchor]: open });
  };

  const handleClick = () => {
    toggleDrawer('bottom', true)
  }
  return(
    <Box>
      <Box><MediaCard place={place} onClick={handleClick} onClickDelete={props.onClickDelete}/></Box>
      <MyDrawer drawer={<PlaceDetail place={place}/>} toggleDrawer={toggleDrawer} state={openDrawer} anchor={'bottom'}/>
    </Box>
  )
}

const Carousel = (props) => {
  const { places, chipIndex, markers, setMarkers} = props
  const [value, setValue] = useState(0);
  const { map, plan, setPlan, } = useContext(AppContext)
  const handleChangeIndex = (index) => {
    setValue(index);
    map.panTo({lat: places[index].geometry.location.lat(), lng: places[index].geometry.location.lng()})
  }
  const handleClickDelete = (id) => {
    plan.places.splice(id, 1);
    setPlan({...plan});
  }
  useEffect(() => {
    setValue(0);
  }, [chipIndex])

  useEffect(() => {
    if(markers == null) return;
    markers.markers.map((marker, id) => {
      marker.addListener('click', ()=>{
        setValue(id);
      })
    })
    setMarkers(markers)
  }, [markers])

  if(places == null) return;
  return(
    <SwipeableViews enableMouseEvents index={value} onChangeIndex={(index) => handleChangeIndex(index)} style={{padding: '0 30px'}}>
      {places.map((place, id) => (
        <Box px={1}><PlaceCard place={place} onClickDelete={() => handleClickDelete(id)}/></Box>
      ))}
    </SwipeableViews>
  )
};

export default Carousel;
