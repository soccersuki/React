import { useContext, } from 'react';
import { AppContext, } from './App'
import { Box, Zoom, } from '@material-ui/core'
import Carousel from './Carousel'

export default function Bottom(props){
  const { google, map, plan, } = useContext(AppContext)
  const { chipIndex, places, } = props;

  if(places == null) return null;

  return(
    <Zoom in={props.display}>
      <Box display='flex' justifyContent='center'>
        <Box width='100%'>
          <Carousel handleOpenS={props.handleOpenS}chipIndex={chipIndex} setChipIndex={props.setChipIndex} places={places} setPlaces={props.setPlaces}markers={props.markers} setMarkers={props.setMarkers}/>
        </Box>
      </Box>
    </Zoom>
  )
}
