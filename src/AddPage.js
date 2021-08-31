import ButtonAppBar from './ButtonAppBar';
import Map from './Map';
import MediaCard from './MediaCard';
import{
  useHistory,
} from 'react-router-dom';
import{
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  TextField,
  Box,
  Button,
} from '@material-ui/core';

import{
  AppContext,
} from './App';

import {
  findPlace,
} from './funcs';

export default function AddPage(props){
  const [query, setQeury] = useState('');
  const [place, setPlace] = useState(null);
  const history = useHistory();
  const {google, map, plan, setPlan} = useContext(AppContext);
  const handleClick = () => {
    console.log(place);
    plan.newSpots.push(place[0]);
    setPlan({...plan});
    history.push('/plan/edit');
  }
  const handleChange = (e) => {
    setQeury(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    var place = await findPlace(google, map, query);
    new google.maps.Marker({
      position: {
        lat: place[0].geometry.location.lat(),
        lng: place[0].geometry.location.lng(),
      },
      label: '!',
      map: map,
    });
    setPlace(place);
  }
  const handleClickReturn = () => {
    history.push('/plan/edit');
  }
  return(
    <>
      <Box mx={5} my={5}>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth variant='filled' onChange={handleChange}/>
        </form>
        <Box my={5}>
          <MediaCard place={place} onClick={handleClick}/>
        </Box>
        <Box display='flex' justifyContent='center' my={5}>
          <Button type="submit" variant="contained" onClick={handleClickReturn}>戻る</Button>
        </Box>
      </Box>
    </>
  )
}
