import {
  useHistory,
} from "react-router-dom";

import ButtonAppBar from './ButtonAppBar';
import Hero from './Hero';
import TextForm from './TextForm';
import PopularRegions from './PopularRegions';

import {
  Box,
} from '@material-ui/core';

import {
  useGoogle
} from './funcs';

export default function HomePage(){
  const history = useHistory();
  useGoogle();
  const handleSubmit = (region) => {
    history.push('/condition', region);
  }


  return(
    <>
      <ButtonAppBar />
      <Hero />
      <Box mx={5} display='flex' justifyContent='center'>
        <Box width={'100%'}maxWidth={500}>
          <Box my={5}>
            <TextForm onSubmit={handleSubmit} initialValue={'大阪'} label={'Region'} fullWidth={true}/>
          </Box>
          <Box my={5}>
            <PopularRegions onClick={handleSubmit}/>
          </Box>
        </Box>
      </Box>

    </>
  )
}
