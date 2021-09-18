import { useState, } from 'react'
import Map from './Map';
import { useGoogle } from './funcs';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Chip, Fab, Zoom} from '@material-ui/core'

import MediaCard from './MediaCard';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';

import MyComponent from './Carousel'
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import SwipeableTemporaryDrawerPlan from './SwipeableTemporaryDrawerPlan'
import TextForm from './TextForm'

import ButtonAppBar from './ButtonAppBar'

import ListIcon from '@material-ui/icons/List';

import LoyaltyIcon from '@material-ui/icons/Loyalty';


import { usePlan } from './funcs'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));

export default function Home(){
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [num, setNum] = useState(0);
  const [color, setColor] = useState('default');
  useGoogle();
  // const plan = usePlan();
  var plan
  const handleClick0 = () => {
    setNum(0)
    setColor('primary');
  }
  const handleClick1 = () => {
    setNum(1);
    setColor('default')
  }
  return(
    <Box className={classes.root}>
    <div style={{height: window.innerHeight}}>
    <Map />
    </div>
    <Box style={{position: 'absolute', width: '100%', top: 0}}>
      <Box p={5}>
        <Box sx={{ display: 'flex' }}>
        <Box style={{flexGrow: 1}}>
        <Box sx={{display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center'}}>
        <LoyaltyIcon color='secondary'fontSize="large"/>
        </Box>

        </Box>

        <Box style={{flexGrow: 1}}>
        <TextForm fullWidth={true}/>
        </Box>

        </Box>


        <Chip label="PLAN" variant="outlined" onClick={handleClick0} color={color}/>
        <Chip label="人気のエリア" variant="outlined" onClick={handleClick1}/>
        <Chip label="レストラン" variant="outlined" onClick={handleClick1}/>
      </Box>
    </Box>
    </Box>
  )
  return(
    <>
    <Box className={classes.root}>
      <Map/>
      <Box style={{position: 'absolute', width: '100%', top: 0}}>
        <Box p={5}>
          <TextForm fullWidth={true}/>
          <Chip label="PLAN" variant="outlined" onClick={handleClick0} color={color}/>
          <Chip label="人気のエリア" variant="outlined" onClick={handleClick1}/>
          <Chip label="レストラン" variant="outlined" onClick={handleClick1}/>
        </Box>
      </Box>
      <Box style={{position: 'absolute', width: '100%', backgroundColor: 'red', bottom: 0}}>
        <Zoom in={num==0}>
          <Box>
            <Box display="flex" justifyContent="flex-end">
              <SwipeableTemporaryDrawerPlan />
            </Box>
            <Box display='flex' justifyContent='center'height='100%'>
              <Box width='100%'>
                <MyComponent plan={plan}/>
              </Box>
            </Box>
          </Box>
        </Zoom>
        <>
          <Zoom in={num==1}>
            <Box>hello</Box>
          </Zoom>
        </>

      </Box>
    </Box>
    </>
  );
}
