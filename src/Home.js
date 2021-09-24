import { useState, useContext, useEffect ,} from 'react'
import Map from './Map';
import { useGoogle } from './customHooks';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Chip, Fab, Zoom, Typography, } from '@material-ui/core'

import MediaCard from './MediaCard';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';


import Carousel from './Carousel'
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import SwipeableTemporaryDrawerPlan from './SwipeableTemporaryDrawerPlan'
import TextForm from './TextForm'

import ButtonAppBar from './ButtonAppBar'

import ListIcon from '@material-ui/icons/List';

import LoyaltyIcon from '@material-ui/icons/Loyalty';

import CustomizedTimeline from './CustomizedTimeline';
import MySpeedDial from './MySpeedDial'
import { usePlan, addMarker } from './funcs'

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
  const [markers, setMarkers] = useState([]);
  const { google, map, } = useContext(AppContext)
  const { index, places, } = props;
  const [display, setDisplay] = useState(false);
  useEffect(()=>{
    setDisplay(false);
    markers.map((marker) => marker.setMap(null))
    if(places == null) return;

    setTimeout(()=>{
      setDisplay(true);
      setMarkers(places.map((place, id) => addMarker(google, map, place, id)));
    }, 1000)

  }, [places])

  if(places == null) return null;

  return(
    <Zoom in={display}>
      <Box display='flex' justifyContent='center'height='100%'>
        <Box width='100%'>
          <Carousel places={places} markers={markers} setMarkers={setMarkers}/>
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

  useGoogle();
  usePlan();
  const handleClick = async (id) => {
    setChipIndex(id);
    var places;
    if(id == 0){
      places = plan == null ? null : plan.spots;
    }
    else{
      places = await findPlaces(google, map, types[id].query);
    }
    setPlaces(places);
  }
  const handleSubmit = async (text) => {
    setChipIndex(-1);
    const places = await findPlaces(google, map, text);
    setPlaces(places);
  }

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
        <Bottom index={chipIndex} types={types} places={places}/>
      </Box>
    </Box>
  );
}
