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

import Carousel from './Carousel'
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import SwipeableTemporaryDrawerPlan from './SwipeableTemporaryDrawerPlan'
import TextForm from './TextForm'

import ButtonAppBar from './ButtonAppBar'

import ListIcon from '@material-ui/icons/List';

import LoyaltyIcon from '@material-ui/icons/Loyalty';

import CustomizedTimeline from './CustomizedTimeline';
import SpeedDials from './SpeedDials'
import { usePlan } from './funcs'

import DrawerSpeedDial from './DrawerSpeedDial'

import ScrollDialog from './ScrollDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));

export default function Home(){
  const classes = useStyles();
  const [chipIndex, setChipIndex] = useState(0);
  const [openDrawer, setOpenDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [openDialog, setOpenDialog] = useState(false);
  useGoogle();
  const plan = usePlan();
  // var plan
  const handleClick = (id) => () => {
    setChipIndex(id);
  }
  const chips = ['PLAN', '人気のエリア', 'レストラン'].map((name, id) => (
    <Chip label={name} variant='outlined' onClick={handleClick(id)} style={{margin: 5}} color={chipIndex == id ? 'primary': 'default'}/>
  ))

  const toggleDrawer = (anchor, open) => {
    console.log('toggleDrawer')
    // if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }
    setOpenDrawer({ ...openDrawer, [anchor]: open });
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return(
    <Box className={classes.root}>
      <ScrollDialog />
      <div style={{height: window.innerHeight}}>
        <Map />
      </div>
      <Box style={{position: 'absolute', width: '100%', top: 20}}>
        <Box mx={5}>
          <Box sx={{ display: 'flex' }} mb={2}>
            <Box style={{flexGrow: 1}}>
              <Box sx={{display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center'}}>
                <LoyaltyIcon color='secondary'fontSize="large"/>
              </Box>
            </Box>
            <Box style={{flexGrow: 1}}>
              <TextForm fullWidth={true}/>
            </Box>
          </Box>
          {chips}
        </Box>
      </Box>
      <Box style={{position: 'absolute', top: 100, left: 20}}>
        <DrawerSpeedDial drawer={<CustomizedTimeline />} toggleDrawer={toggleDrawer} state={openDrawer} anchor={'right'}/>
        <ScrollDialog handleOpen={handleClickOpen} handleClose={handleClose} open={openDialog}/>
        <SpeedDials onClickDrawer={toggleDrawer} onClickDialog={handleClickOpen}/>
      </Box>
      <Box style={{position: 'absolute', width: '100%', bottom: 0}}>
        <Zoom in={chipIndex==0}>
          <Box>
            <Box display="flex" justifyContent="flex-end" mx={2}>
              <SwipeableTemporaryDrawerPlan anchor='right' contents={<Fab color="primary" aria-label="add"><ListIcon /></Fab>} drawer={<CustomizedTimeline />}/>

            </Box>
            <Box display='flex' justifyContent='center'height='100%'>
              <Box width='100%'>
                <Carousel plan={plan}/>
              </Box>
            </Box>
          </Box>
        </Zoom>
      </Box>
    </Box>
  );
}
