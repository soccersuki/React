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

const useStyles = makeStyles((theme) => ({
  root: {
  },
  media: {
    height: 140,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function MediaCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const {place} = props;
  if(place == null) return(null);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={place.photos[0].getUrl()}
          title="Contemplative Reptile"
        />
        <CardContent>
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
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Button size="small" color="primary" onClick={props.onClick}>
          ADD
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{place.formatted_address}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
