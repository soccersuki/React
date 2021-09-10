import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import CancelIcon from '@material-ui/icons/Cancel';
// import itemData from './itemData';
import AddIcon from '@material-ui/icons/Add';
import {
  Box,
} from '@material-ui/core';
import {
  useContext,
} from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  addIcon: {
    width: 50,
    height: 50,
  }
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarImageList(props) {
  const classes = useStyles();
  const newSpots = props.spots;
  if(newSpots == null) return(null);

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Spots</ListSubheader>
        </ImageListItem>
        {newSpots.map((item, i) => (
          <ImageListItem key={item.photos == null ? null: item.photos[0].getUrl()}>
            <img src={item.photos == null ? null: item.photos[0].getUrl()} alt={item.name}/>
            <ImageListItemBar
              title={item.name}
              subtitle={<span>by: {item.name}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${item.name}`} className={classes.icon} onClick={props.onClickInfo}>
                  <InfoIcon />
                </IconButton>
              }
            />
            <ImageListItemBar
              position='top'
              actionPosition='right'
              actionIcon={
                <IconButton onClick={() => props.onClickCancel(i)}><CancelIcon /></IconButton>
              }
              style={{background: 'rgba(0, 0, 0, 0)'}}>
            </ImageListItemBar>
          </ImageListItem>
        ))}
        <ImageListItem>
          <Box display='flex' justifyContent='center' alignItems="center" height='100%'>
          <IconButton onClick={props.onClickAdd}>
            <AddIcon fontSize='large' className={classes.addIcon}/>
          </IconButton>
          </Box>
        </ImageListItem>
      </ImageList>
    </div>
  );
}
