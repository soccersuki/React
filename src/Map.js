import { useState, useRef, useEffect, useContext } from 'react'

import {useMap} from './funcs';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

export default function Map(props){
  const classes = useStyles();
  const mapContainerRef = useRef(null);
  useMap(mapContainerRef)
  const h = window.innerHeight
  console.log(h)
  return(
    <>
      <div ref={mapContainerRef} className={classes.root} style={{height: '100%'}}>I can use the DOM with react ref</div>
    </>
  )
}
