import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Zoom, Slide, } from '@material-ui/core';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { useState, } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: window.innerHeight,
    backgroundColor: 'pink',
  },
}));
export default function FirstPage(props){
  const classes = useStyles();
  const [display, setDisplay] = useState(true);
  const [direction, setDirection] = useState('up');
  const handleEnter = () => {
    setTimeout(() => {
      setDirection('down')
      setDisplay(false)
    }, 1000)
  }
  return(
    <Box className={classes.root} justifyContent="center" alignItems="center" display="flex">
      <Zoom in={display} direction={direction} timeout={300} onEnter={handleEnter} onExited={() => props.setFirstPage(false)}>
      <Box mx='auto'>
        <Box display="flex" justifyContent="center">
          <LoyaltyIcon style={{ color: 'white', fontSize: 200 }}/>
        </Box>
      </Box>
      </Zoom>
    </Box>
  )
}
