import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Chip, Fab, } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import NavigationIcon from '@material-ui/icons/Navigation';

import { useContext, } from 'react';
import { AppContext } from './App'


const useStyles = makeStyles((theme) => ({
  root: {
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
  const { plan, setPlan, } = useContext(AppContext);

  const handleClick = () => {
    console.log('click')
    plan.places.push(place);
    setPlan(plan);
  }
  if(place == null) return;
  return(
    <Box className={classes.root}>
    <img src={place.photos == null ? null: place.photos[0].getUrl()} className={classes.img}/>
    <Typography gutterBottom variant="h5" component="h2">
      {place.name}
    </Typography>
    <Typography variant="body2" color="textSecondary" component="p">
    <Box display="flex" alignItems="center">
      {place.rating}
      <Rating name="read-only" value={place.rating} precision={0.5} readOnly size='small' />
    </Box>
    {place.types.map((type) => <Chip label={type} color="primary"/>)}

    </Typography>
    <List>
      <ListItem button>
        <ListItemIcon>{<InboxIcon />}</ListItemIcon>
        <ListItemText primary={place.formatted_address} />
      </ListItem>
    </List>
    {plan != null && (
      <Box  width='100%'>
      <Box display='flex' justifyContent='center'>
      <Fab color='primary'variant="extended" type='submit' onClick={handleClick}>
      <NavigationIcon />
        Navigate
      </Fab>
      </Box>
      </Box>

    )}
    </Box>
  )
}
