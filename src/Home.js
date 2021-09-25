import { useState, useContext, useEffect ,} from 'react'
import Map from './Map';
import { useGoogle } from './customHooks';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Chip, Fab, Zoom, Typography, } from '@material-ui/core'



import Carousel from './Carousel'
import TextForm from './TextForm'

import ButtonAppBar from './ButtonAppBar'

import LoyaltyIcon from '@material-ui/icons/Loyalty';

import CustomizedTimeline from './CustomizedTimeline';
import MySpeedDial from './MySpeedDial'
import { usePlan, } from './funcs'
import { addMarkers, } from './markerFuncs';
import MyDrawer from './MyDrawer'

import ScrollDialog from './ScrollDialog'

import {AppContext} from './App'

import SwitchListSecondary from './SwitchListSecondary'

import { findPlaces } from './googleMapAPI';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));



function Top(props){
  const handleClick = (id) => () => {
    props.onClick(id);
  }
  const chips = props.types.map((type, id) => (
    <Chip label={type.jpName} variant='outlined' onClick={handleClick(id)} style={{margin: 5}} color={props.chipIndex == id ? 'primary': 'default'}/>
  ))
  return(
    <Box mx={5}>
      <Box sx={{ display: 'flex' }} mb={2}>
        <Box style={{flexGrow: 1}}>
          <Box sx={{display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center'}}>
            <LoyaltyIcon color='secondary'fontSize="large"/>
          </Box>
        </Box>
        <Box style={{flexGrow: 1}}>
          <TextForm fullWidth={true} onSubmit={props.onSubmit}/>
        </Box>
      </Box>
      <Box style={{overflowX: 'auto', whiteSpace: 'nowrap'}}>
        {chips}
      </Box>

    </Box>
  )
}

function Action(props){
  const [openDrawer, setOpenDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const toggleDrawer = (anchor, open) => {
    setOpenDrawer({ ...openDrawer, [anchor]: open });
  };
  const handleOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return(
    <>
      <MyDrawer drawer={<CustomizedTimeline />} toggleDrawer={toggleDrawer} state={openDrawer} anchor={'right'}/>
      <ScrollDialog handleOpen={handleOpen} handleClose={handleClose} open={openDialog} content={<SwitchListSecondary condition={{regionName: 'Osaka'}}/>}/>
      <MySpeedDial toggleDrawer={toggleDrawer} handleOpen={handleOpen}/>
    </>
  )
}

function Bottom(props){
  const {plan} = useContext(AppContext)
  // const [markers, setMarkers] = useState(null);
  const { google, map, } = useContext(AppContext)
  const { index, places, } = props;
  // const [display, setDisplay] = useState(false);
  useEffect(()=>{


  }, [places])

  if(places == null) return null;

  return(
    <Zoom in={props.display}>
      <Box display='flex' justifyContent='center'height='100%'>
        <Box width='100%'>
          <Carousel places={places} markers={props.markers} setMarkers={props.setMarkers}/>
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

  useEffect(async () => {
    if(markers != null) {
      markers.markers.map((marker) => marker.setMap(null));
      if(markers.originMarker != null) markers.originMarker.setMap(null);
      if(markers.destinationMarker != null) markers.destinationMarker.setMap(null);
    }
    setDisplay(false);
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
    console.log(chipIndex);
    console.log(places);
    if(places == null) return;
    if(chipIndex == 0) setMarkers(addMarkers(google, map, places, plan.origin, plan.destination));
    else setMarkers(addMarkers(google, map, places))
    map.panTo({lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng()})
    setPlaces(places);
    setDisplay(true);
  }, [chipIndex, plan])

  return(
    <Box className={classes.root}>
      <div style={{height: window.innerHeight}}>
        <Map />
      </div>
      <Box style={{position: 'absolute', width: '100%', top: 20}}>
        <Top onClick={handleClick} chipIndex={chipIndex} types={types} onSubmit={handleSubmit}/>
      </Box>
      <Box style={{position: 'absolute', top: 100, left: 20}}>
        <Action />
      </Box>
      <Box style={{position: 'absolute', width: '100%', bottom: 0}}>
        <Bottom index={chipIndex} types={types} places={places} markers={markers} setMarkers={setMarkers} display={display}/>
      </Box>
    </Box>
  );
}
