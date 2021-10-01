import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Chip, Fab, } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';

import RoomIcon from '@material-ui/icons/Room';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PhoneIcon from '@material-ui/icons/Phone';
import PublicIcon from '@material-ui/icons/Public';
import SearchIcon from '@material-ui/icons/Search';

import { useContext, useEffect, useState, } from 'react';
import { AppContext } from './App'

import { getDetail } from './funcs/googleMapAPI';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  img: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
  }
}));

export default function PlaceDetail(props){
  const {place} = props;
  const classes = useStyles();
  const { google, map, plan, setPlan, } = useContext(AppContext);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    console.log(place)
    if(place == null) return;
    (async() => {
      const detail = await getDetail(google, map, place.place_id)
      setDetail(detail)
      console.log(detail)
    })()
  }, [])

  if(place == null) return;

  return(
    <Box className={classes.root}>
      <img src={place.photos == null ? null: place.photos[0].getUrl()} className={classes.img}/>
      <Box px={2}>
        <Typography gutterBottom variant="h5" component="h2">
          {place.name}
        </Typography>
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
          <Box display="flex" alignItems="center">
            {place.rating}
            <Rating name="read-only" value={place.rating} precision={0.5} readOnly size='small' />
            ({place.user_ratings_total})
          </Box>
        </Typography>
        <Typography>
          {place.types.map((type) => <Chip size='small' label={type} color="primary" style={{margin: 1}}/>)}
        </Typography>
        <List>
          <ListItem button>
            <ListItemIcon>{<RoomIcon />}</ListItemIcon>
            <ListItemText primary={place.formatted_address} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>{<AccessTimeIcon />}</ListItemIcon>
            <ListItemText primary={'営業中'} />
          </ListItem>
          {detail != null && detail.formatted_phone_number != null && (
            <ListItem button>
              <ListItemIcon>{<PhoneIcon />}</ListItemIcon>
              <ListItemText primary={detail.formatted_phone_number} />
            </ListItem>
          )}
          {detail != null && detail.website != null && (
            <ListItem>
              <ListItemIcon>{<PublicIcon />}</ListItemIcon>
              <ListItemText primary={detail.website} />
            </ListItem>
          )}
          <ListItem button>
            <ListItemIcon>{<SearchIcon />}</ListItemIcon>
            <ListItemText primary={'googleで検索'} />
          </ListItem>
        </List>
      </Box>

    </Box>
  )
}
