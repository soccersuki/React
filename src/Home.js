import { useState, } from 'react'
import Map from './Map';
import { useGoogle } from './funcs';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Chip, Fab} from '@material-ui/core'

import MediaCard from './MediaCard';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import MyComponent from './Carousel'
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import SwipeableTemporaryDrawerPlan from './SwipeableTemporaryDrawerPlan'
import TextForm from './TextForm'

import ListIcon from '@material-ui/icons/List';

import { usePlan } from './funcs'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));

export default function Home(){
  const classes = useStyles();
  const [value, setValue] = useState(0);
  useGoogle();
  const plan = usePlan();
  const handleClick = () => {
    console.log('click')
  }
  return(
    <>
    <Box className={classes.root}>
      <Map/>
      <Box style={{position: 'absolute', width: '100%', top: 0}}>
        <Box p={5}>
          <TextForm fullWidth={true}/>
          <Chip label="PLAN" variant="outlined" onClick={handleClick}/>
          <Chip label="人気のエリア" variant="outlined" onClick={handleClick}/>
          <Chip label="レストラン" variant="outlined" onClick={handleClick}/>
        </Box>
      </Box>
      <Box style={{position: 'absolute', width: '100%', backgroundColor: 'red', bottom: 0}}>
        <Box display='flex' justifyContent='center'height='100%'>
          <Box width='100%'>
            <MyComponent plan={plan}/>
          </Box>
        </Box>
      </Box>
      <Box style={{position: 'absolute', width: '100%', bottom: 400}}>
        <Box display="flex" justifyContent="flex-end">
          <SwipeableTemporaryDrawerPlan />
        </Box>

      </Box>
    </Box>
    </>
  );
}
