import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TrainIcon from '@material-ui/icons/Train';
import {
  Badge
} from '@material-ui/core'

import {
  Box,
  Avatar,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
const label = 'abcdefghijklmnopqrstuvwxyz';


export default function CustomizedTimeline(props) {
  const classes = useStyles();
  var {plan} = props;
  if(plan == null) return(null);
  const {itinerary, legs} = plan;
  var timelineitems = []
  for(var i = 0; i < itinerary.length; i++){
    var spot = (
      <TimelineItem>
        <TimelineOppositeContent style={{ flex: 0.3 }}>
          <Typography variant="body2" color="textSecondary">
            {itinerary[i].arrivalTime.text}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator style={{ flexGrow: 0.5 }}>
          <Box display='flex' justifyContent='center'>
          <Box mx={1} my={1}>
          <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}} badgeContent={ (i == 0 || i == itinerary.length-1) ? null: label[i-1] } color="secondary">
          <Avatar alt="Remy Sharp" src={itinerary[i].photos == null ? null: itinerary[i].photos[0].getUrl()} />
          </Badge>
          </Box>
          </Box>
          <TimelineConnector />

        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              {itinerary[i].name}
            </Typography>
            <Typography>stay time: {itinerary[i].stayTime.text}</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    )
    timelineitems.push(spot);
    if(i < legs.length){
      var leg = (
        <TimelineItem>
          <TimelineOppositeContent style={{ flexGrow: 0.3 }}>
            <Typography variant="body2" color="textSecondary">
              {itinerary[i].departureTime.text}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator style={{ flexGrow: 0.5 }}>
            <TimelineConnector />
            <Box display='flex' justifyContent='center'>
            <Box mx={1} my={1}>
            <TrainIcon />
            </Box>
            </Box>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box display="flex" alignItems='center' height='100%'>
              {legs[i].duration.newText} by transit
            </Box>
          </TimelineContent>
        </TimelineItem>
      )
      timelineitems.push(leg);
    }
  }
  return(
    <Timeline>
      {timelineitems}
    </Timeline>
  );

}
