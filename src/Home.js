import { useState, } from 'react'
import Map from './Map';
import { useGoogle } from './funcs';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, } from '@material-ui/core'

import MediaCard from './MediaCard';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));

export default function Home(){
  const classes = useStyles();
  const [value, setValue] = useState(0);
  useGoogle();
  const handleClickRight = () => {
    setValue(value + 1);
  }
  const handleClickLeft = () => {
    setValue(value - 1);
  }
  return(
    <>
    <Box className={classes.root}>
      <Map/>
      <Box style={{position: 'absolute', width: '100%', height: 300, backgroundColor: 'red', bottom: 10}}>
      <Box display='flex' justifyContent='center'height='100%'>
        <IconButton onClick={handleClickLeft}><ArrowLeftIcon /></IconButton>
        <Box width='80%'>
          {[0, 1, 2].map((index) => (
            <Box hidden={value !== index}>
            {value === index && (
              <MediaCard value={value} index={index}/>
            )}
            </Box>
          ))}

        </Box>

        <IconButton onClick={handleClickRight}><ArrowRightIcon /></IconButton>
      </Box>
      </Box>
    </Box>
    </>
  );
}
