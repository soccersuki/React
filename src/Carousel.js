import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import MediaCard from './MediaCard';

import { Box, } from '@material-ui/core';

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
  return(
    <SwipeableViews enableMouseEvents>
      {
        plan == null ?
          [0, 1, 2].map(() => (
            <Box p={2}>
              <MediaCard />
            </Box>
          ))
        :
          plan.spots.map((place) => (
            <Box p={2}>
              <MediaCard place={place}/>
            </Box>
          ))
    }


    </SwipeableViews>
  )
};

export default MyComponent;
