import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import MediaCard from './MediaCard';

import { Box, } from '@material-ui/core';

import { useState, useContext, } from 'react'

import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'

import { AppContext, } from './App'

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
};

const MyComponent = (props) => {
  const {plan} = props
  // const [value, setValue] = useState(1);
  const { map, value, setValue, } = useContext(AppContext)
  const handleChangeIndex = (index) => {
    setValue(index);
    console.log(index);
  }
  const handleClick = (spot) => {
    console.log(spot)
    map.setCenter({lat: spot.geometry.location.lat(), lng: spot.geometry.location.lng()})
  }
  return(
    <>
    <SwipeableViews enableMouseEvents index={value} onChangeIndex={(index) => handleChangeIndex(index)}>
      {
        plan == null ?
          [0, 1, 2].map(() => (
            <Box p={2}>
              <MediaCard />
            </Box>
          ))
        :
          plan.spots.map((place) => (
            <Box p={2} onClick={() => handleClick(place)}>
              <SwipeableTemporaryDrawer place={place}/>
            </Box>
          ))
      }
    </SwipeableViews>
    </>
  )
};

export default MyComponent;
