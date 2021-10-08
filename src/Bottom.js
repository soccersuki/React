import { Box, Zoom, } from '@material-ui/core'
import Carousel from './Carousel'

export default function Bottom(props){
  if(props.places == null) return null;

  return(
    <Zoom in={props.display}>
      <Box display='flex' justifyContent='center'>
        <Box width='100%'>
          <Carousel {...props}/>
        </Box>
      </Box>
    </Zoom>
  )
}
