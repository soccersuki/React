import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Box, Typography, Button } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import PlaceDetail from './PlaceDetail'

import { useContext, } from 'react'
import {AppContext, } from './MyContext'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  media: {
    height: 100,
  },
}));

export default function MediaCard(props) {
  const classes = useStyles();
  const { place } = props;
  const { plan, drawerState, } = useContext(AppContext)
  if(place == null) return null;

  const handleClick = () => {
    drawerState.toggle('bottom', true, <PlaceDetail {...props}/>)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          className={classes.media}
          image={place.photos == null ? null : place.photos[0].getUrl()}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="h6" component="h6" noWrap>
            {place.name}
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            <Box display="flex" alignItems="center">
              {place.rating}
              <Rating name="read-only" value={place.rating} precision={0.5} readOnly size='small' />
              ({place.user_ratings_total})
            </Box>
          </Typography>
        </CardContent>
      </CardActionArea>
      {plan != null && (
        <CardActions disableSpacing>
          {place.type == null ?
            <Button size="small" color="primary" onClick={() => props.handleClickAdd(plan, place, props.id)}>
              ADD
            </Button>
            :
            <Button size="small" color="primary" onClick={() => props.handleClickDelete(plan, place, props.id)}>
              DELETE
            </Button>
          }
        </CardActions>
      )}
    </Card>
  );
}
