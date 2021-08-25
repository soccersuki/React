import { useState, useRef, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '30vh',
  },
}));

export default function Map(props){
  return(
    <>
      <div ref={props.mapContainerRef} style={{height: "30vh"}}>I can use the DOM with react ref</div>
    </>
  )
}
