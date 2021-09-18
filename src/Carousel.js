import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import MediaCard from './MediaCard';

import { Box} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { useState, useContext, useEffect} from 'react'

import SwipeableTemporaryDrawerPlan from './SwipeableTemporaryDrawerPlan'

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

const PlaceDetail = (props) => {
  const {place} = props;
  return(
    <>
    <img src={place == null ? null: place.photos[0].getUrl()} width='100%'/>
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    </>
  )
}

const Carousel = (props) => {
  const {plan} = props
  const [value, setValue] = useState(0);
  const { map, markers} = useContext(AppContext)
  const handleChangeIndex = (index) => {
    setValue(index);
    const spot = plan.spots[index];
    map.setCenter({lat: spot.geometry.location.lat(), lng: spot.geometry.location.lng()})
    console.log(index);
  }
  const handleClick = (spot) => {
    console.log(spot)
    map.setCenter({lat: spot.geometry.location.lat(), lng: spot.geometry.location.lng()})
  }
  useEffect(() => {
    if(markers==null) return;
    markers.spotMarkers.map((marker, id) => {
      marker.addListener('click', ()=>{
        setValue(id);
      })
    })
  }, [markers])
  return(
    <>
    <SwipeableViews enableMouseEvents index={value} onChangeIndex={(index) => handleChangeIndex(index)}>
      {
        plan == null ?
          [0, 1, 2].map(() => (
            <Box p={2}>
              <SwipeableTemporaryDrawerPlan anchor='bottom'contents={<MediaCard/>} drawer={<PlaceDetail/>}/>
            </Box>
          ))
        :
          plan.spots.map((place) => (
            <Box p={2} onClick={() => handleClick(place)}>
              <SwipeableTemporaryDrawerPlan anchor='bottom' contents={<MediaCard place={place} />} drawer={<PlaceDetail place={place}/>}/>
            </Box>
          ))
      }
    </SwipeableViews>
    </>
  )
};

export default Carousel;
