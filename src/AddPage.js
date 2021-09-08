import MediaCard from './MediaCard';
import{ useHistory, } from 'react-router-dom';
import{ useState, useContext, } from 'react';
import { TextField, Box, Button, Divider, ListSubheader, Zoom, } from '@material-ui/core';
import{ AppContext, } from './App';
import { findPlace, } from './funcs';
import TextForm from './TextForm'

export default function AddPage(props){
  const [checked, setChecked] = useState(false);
  const [place, setPlace] = useState(null);
  const [marker, setMarker] = useState(null);
  const history = useHistory();
  const {google, map, plan, setPlan, markers, setMarkers} = useContext(AppContext);
  const handleClick = () => {
    plan.newSpots.push(place[0]);
    setPlan({...plan});
    markers.spotMarkers.push(marker);
    setMarkers({...markers});
  }
  const handleSubmit = async (text) => {
    setChecked(false);
    var place = await findPlace(google, map, text);
    const marker = new google.maps.Marker({
      position: {
        lat: place[0].geometry.location.lat(),
        lng: place[0].geometry.location.lng(),
      },
      label: '!',
      map: map,
    });
    marker.setMap(map);
    setMarker(marker);
    setPlace(place);
    setChecked(true);
  }
  return(
    <>
      <Box mx={5} my={5}>
        <TextForm fullWidth={true} onSubmit={handleSubmit}/>
        <Box my={5}>
          <Zoom in={checked}>
            <Box>
              <MediaCard place={place} onClick={handleClick}/>
            </Box>
          </Zoom>
        </Box>
        <Divider variant='middle'/>
        <ListSubheader>人気のスポット</ListSubheader>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          return(
            <Zoom in={checked} style={{ transitionDelay: checked ? `${500 * i}ms` : '0ms' }}>
              <Box my={5}>
                <MediaCard place={place} />
              </Box>
            </Zoom>
          )
        })}
      </Box>
    </>
  )
}
