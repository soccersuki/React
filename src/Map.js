import { useState, useRef, useEffect, useContext } from 'react'

import {useMap} from './funcs';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '30vh',
  },
}));

export default function Map(props){
  const mapContainerRef = useRef(null);
  useMap(mapContainerRef)
  return(
    <>
      <div ref={mapContainerRef} style={{height: "30vh"}}>I can use the DOM with react ref</div>
    </>
  )
}
