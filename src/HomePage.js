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


export default function HomePage(){
  const history = useHistory();
  const handleSubmit = (regionName) => {
    history.push('/condition', {regionName});
  }

  return(
    <>
      <ButtonAppBar />
      <Hero />
      <Box mx={5}>
        <Box my={5}>
          <TextForm onSubmit={handleSubmit} initialValue={'大阪'} label={'Region'} fullWidth={true}/>
        </Box>
        <Box my={5}>
          <PopularRegions onClick={handleSubmit}/>
        </Box>
      </Box>
    </>
  )
}
