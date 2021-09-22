import { useState, useContext, useEffect ,} from 'react'
import Map from './Map';
import { useGoogle } from './funcs';
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
          <TextForm fullWidth={true}/>
        </Box>
      </Box>
      {chips}
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

function TabPanel(props) {
  const { children, value, index, places, markers, setMarkers, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Zoom in={value == index}>
          {children}
        </Zoom>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Bottom(props){
  const {plan} = useContext(AppContext)
  const [markers, setMarkers] = useState([]);
  const { google, map, } = useContext(AppContext)
  const {index} = props;
  const [places, setPlaces] = useState(null);
  useEffect(()=>{
    var places;
    if(index == 0 && plan != null) places = plan.spots;
    else if(index >= 1){
      places = null;
    }
    if(places == null) return;
    setPlaces(places)
    markers.map((marker) => marker.setMap(null))
    setMarkers(places.map((place, id) => addMarker(google, map, place, id)))
  }, [index])

  return(
    <>
    <Box display='flex' justifyContent='center'height='100%'>
      <Box width='100%'>
        <Carousel places={places} id={id}/>
      </Box>
    </Box>
    </>
  )
}

export default function Home(){
  const classes = useStyles();
  const types = [
    {name: 'plan', jpName: 'プラン'},
    {name: 'popularRegion', jpName: '人気のエリア'},
    {name: 'restrant', jpName: 'レストラン'},
    {name: 'park', jpName: '公園'},
  ]
  const [chipIndex, setChipIndex] = useState(0);

  useGoogle();
  usePlan();
  const handleClick = (id) => {
    setChipIndex(id);
  }

  return(
    <Box className={classes.root}>
      <div style={{height: window.innerHeight}}>
        <Map />
      </div>
      <Box style={{position: 'absolute', width: '100%', top: 20}}>
        <Top onClick={handleClick} chipIndex={chipIndex} types={types}/>
      </Box>
      <Box style={{position: 'absolute', top: 100, left: 20}}>
        <Action />
      </Box>
      <Box style={{position: 'absolute', width: '100%', bottom: 0}}>
        <Bottom index={chipIndex} types={types}/>
      </Box>
    </Box>
  );
}
