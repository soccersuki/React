import { useState, useContext, useEffect ,} from 'react'
import Map from './Map';
import { useGoogle } from './customHooks';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Chip, Fab, Zoom, Typography, } from '@material-ui/core'



import Carousel from './Carousel'


import CustomizedTimeline from './CustomizedTimeline';
import MySpeedDial from './MySpeedDial'
import { usePlan, } from './funcs'
import { addMarkers, } from './markerFuncs';
import MyDrawer from './MyDrawer'

import ScrollDialog from './ScrollDialog'

import {AppContext} from './App'

import SwitchListSecondary from './SwitchListSecondary'

import { findPlaces } from './googleMapAPI';

import Top from './Top';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
  },
}));





function Action(props){
  const [openDrawer, setOpenDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [condition, setCondition] = useState({regionName: '大阪', originName: '大阪駅'});
  const toggleDrawer = (anchor, open) => {
    setOpenDrawer({ ...openDrawer, [anchor]: open });
  };
  const handleOpen = (status) => {
    condition.status = status;
    setCondition({...condition});
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return(
    <>
      <MyDrawer drawer={<CustomizedTimeline />} toggleDrawer={toggleDrawer} state={openDrawer} anchor={'right'}/>
      <ScrollDialog handleOpen={handleOpen} handleClose={handleClose} open={openDialog} content={<SwitchListSecondary condition={condition}/>}/>
      <MySpeedDial toggleDrawer={toggleDrawer} handleOpen={handleOpen}/>
    </>
  )
}

function Bottom(props){
  const { google, map, plan, } = useContext(AppContext)
  const { chipIndex, places, } = props;

  if(places == null) return null;

  return(
    <Zoom in={props.display}>
      <Box display='flex' justifyContent='center'>
        <Box width='100%'>
          <Carousel chipIndex={chipIndex} setChipIndex={props.setChipIndex} places={places} markers={props.markers} setMarkers={props.setMarkers}/>
        </Box>
      </Box>
    </Zoom>
  )
}

export default function Home(){
  const classes = useStyles();
  const types = [
    {name: 'plan', jpName: 'プラン', query: ''},
    {name: 'popularRegion', jpName: '人気のエリア', query: '観光'},
    {name: 'restrant', jpName: 'レストラン', query: 'レストラン'},
    {name: 'park', jpName: '公園', query: '公園'},
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
    var markers;
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
      if(chipIndex == 0) markers = addMarkers(google, map, places, plan.origin, plan.destination)
      else markers = addMarkers(google, map, places)
      setMarkers(markers);
      map.panTo({lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng()})

      setDisplay(true);
    })()

    return () => {
      setDisplay(false);
      if(markers != null){
        markers.markers.map((marker) => marker.setMap(null));
        if(markers.originMarker != null) markers.originMarker.setMap(null);
        if(markers.destinationMarker != null) markers.destinationMarker.setMap(null);
      }
    }
  }, [chipIndex, plan])

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
