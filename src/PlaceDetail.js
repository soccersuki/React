import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Chip, } from '@material-ui/core'
import { Rating } from '@material-ui/lab'

import InboxIcon from '@material-ui/icons/MoveToInbox';




export default function PlaceDetail(props){
  const {place} = props;
  if(place == null) return;
  return(
    <>
    <img src={place.photos == null ? null: place.photos[0].getUrl()} height='50%' width='100%'/>
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
    </>
  )
}
