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

import MyDrawer from './MyDrawer'

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
      <Box onClick={handleClick}><MediaCard place={place} /></Box>
      <MyDrawer drawer={<PlaceDetail place={place}/>} toggleDrawer={toggleDrawer} state={openDrawer} anchor={'bottom'}/>
    </Box>
  )
}

const Carousel = (props) => {
  const { places, carouselIndex, markers, setMarkers} = props
  const [value, setValue] = useState(0);
  const { map } = useContext(AppContext)
  const handleChangeIndex = (index) => {
    setValue(index);
    const place = places[index];
    map.setCenter({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
    console.log(index);
  }
  useEffect(() => {

    if(places == null) return;
    markers.markers.map((marker, id) => {
      marker.addListener('click', ()=>{
        setValue(id);
      })
    })
    setMarkers(markers)
  }, [markers])
  return(
    <>
    <SwipeableViews enableMouseEvents index={value} onChangeIndex={(index) => handleChangeIndex(index)}>
      {
        places == null ?
          [0, 1, 2].map(() => (
            <PlaceCard />
          ))
        :
          places.map((place) => (
            <PlaceCard place={place}/>
          ))
      }
    </SwipeableViews>
    </>
  )
};

export default Carousel;
