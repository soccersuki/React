import { Box, Zoom, } from '@mui/material';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { useState, useEffect, useContext, } from 'react';
import {AppContext} from './MyContext'

export default function Splash(props){
  const {google} = useContext(AppContext)
  const [zoom, setZoom] = useState(true);

  useEffect(() => {
    if(google == null) return;
    setTimeout(() => {
      setZoom(false)
    }, 1000)
  }, [google])

  return(
    <Box justifyContent="center" alignItems="center" display="flex"
      sx={{width: '100%', height: window.innerHeight, backgroundColor: 'pink'}}
    >
      <Zoom in={zoom} timeout={300} onExited={() => props.setSplash(false)}>
        <Box mx='auto'>
          <Box display="flex" justifyContent="center">
            <LoyaltyIcon style={{ color: 'white', fontSize: 200 }}/>
          </Box>
        </Box>
      </Zoom>
    </Box>
  )
}
