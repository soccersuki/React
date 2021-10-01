import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Chip, Collapse, } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { Skelton, } from '@material-ui/core'

import imgOsaka from './images/img_osaka.jpg';

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
  const {place} = props;
  if(place == null) return null;

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={props.onClick}>
        <CardMedia
          className={classes.media}
          image={place.photos == null ? null : place.photos[0].getUrl()}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="h5" component="h5" noWrap>
            {place.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        {place.type == null ?
          <Button size="small" color="primary" onClick={props.onClickAdd}>
            ADD
          </Button>
          :
          <Button size="small" color="primary" onClick={props.onClickDelete}>
            DELETE
          </Button>
        }
      </CardActions>
    </Card>
  );
}
