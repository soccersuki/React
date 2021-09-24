import { useHistory, } from "react-router-dom";
import Hero from './Hero';
import TextForm from './TextForm';
import PopularRegions from './PopularRegions';
import { Box, Divider, } from '@material-ui/core';

import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer';

export default function HomePage(){
  const history = useHistory();
  // useGoogle();
  const handleSubmit = (regionName) => {
    const region = {
      name: regionName,
    }
    history.push('/condition', region);
  }
  const handleClick = (region) => {
    history.push('/condition', region);
  }

  return(
    <>
      <Hero />
      <Box mx={5} display='flex' justifyContent='center'>
        <Box width={'100%'}maxWidth={500}>
          <Box my={5}>
            <TextForm onSubmit={handleSubmit} initialValue={'大阪'} label={'Region'} fullWidth={true}/>
          </Box>
          <Divider />
          <Box my={5}>
            <PopularRegions onClick={handleClick}/>
          </Box>
          <Box my={5}>
            <PopularRegions onClick={handleClick}/>
          </Box>
          <Box my={5}>
            <PopularRegions onClick={handleClick}/>
          </Box>
          <Box my={5}>
            <PopularRegions onClick={handleClick}/>
          </Box>
        </Box>
      </Box>
      <SwipeableTemporaryDrawer />

    </>
  )
}
