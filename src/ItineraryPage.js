import { useContext, useState, useEffect } from 'react'
import { useHistory, } from "react-router-dom";
import { Box, Button, CircularProgress, Fab } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import CustomizedTimeline from './CustomizedTimeline';
import { usePlan, showMarker, } from './funcs';
import { AppContext } from './App';

export default function ItineraryPage(){
  // const classes = useStyles();
  const history = useHistory();
  const {plan, map} = useContext(AppContext);
  const handleClick = (spot) => {
    map.setCenter({lat: spot.geometry.location.lat(), lng: spot.geometry.location.lng()})
  }
  return(
    <Box>
      <CustomizedTimeline onClick={handleClick}/>
    </Box>
  )
}
