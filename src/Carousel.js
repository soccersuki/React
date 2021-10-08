import SwipeableViews from 'react-swipeable-views';
import MediaCard from './MediaCard';
import { Box } from '@material-ui/core';
import { useState, useContext, useEffect} from 'react'
import { AppContext, } from './MyContext'

export default function Carousel(props){
  const { map, } = useContext(AppContext)
  const { places } = props;
  const handleChangeIndex = (index) => {
    props.setCarouselIndex(index);
    map.panTo({lat: places[index].geometry.location.lat(), lng: places[index].geometry.location.lng()})
  }

  if(places == null) return;
  return(
    <SwipeableViews enableMouseEvents index={props.carouselIndex} onChangeIndex={(index) => handleChangeIndex(index)} style={{padding: '0 30px'}}>
      {places.map((place, id) => (
        <Box px={1}>
          <MediaCard place={place} id={id} handleClickDelete={props.handleClickDelete} handleClickAdd={props.handleClickAdd}/>
        </Box>
      ))}
    </SwipeableViews>
  )
};
