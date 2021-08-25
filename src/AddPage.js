import ButtonAppBar from './ButtonAppBar';
import Map from './Map';
import MediaCard from './MediaCard';
import{
  useHistory,
} from 'react-router-dom';
import{
  useEffect,
  useState,
} from 'react';
import {
  TextField,
  Box,
  Button,
} from '@material-ui/core';

export default function AddPage(props){
  const [query, setQeury] = useState('');
  const [place, setPlace] = useState(null);
  const history = useHistory();
  const {spots} = props;
  const handleClick = () => {
    console.log(place);
    spots.push(place[0]);
    history.push('/plan/edit');
  }
  const handleChange = (e) => {
    setQeury(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {google, map} = props;
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

const findPlace = async (google, map, query, location) => {
  var service = new google.maps.places.PlacesService(map);
  var request = {
    query: query,
    fields: ['name', 'geometry', 'formatted_address', 'photos'],
  };
  if(location != null){
    request.locationBias = {lat: location.lat(), lng: location.lng()};
  }
  var place = await new Promise(resolve => {
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      }
    });
  });
  return place;
}
