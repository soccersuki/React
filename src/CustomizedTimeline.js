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
  Box,
  Avatar,
} from '@material-ui/core'
import imgOsaka from './img_osaka.jpg';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function CustomizedTimeline(props) {
  const classes = useStyles();
  var {plan, legs} = props;
  if(plan == null || legs == null) return(null);
  var timelineitems = []
  for(var i = 0; i < plan.length; i++){
    var item = (
      <TimelineItem>
        <TimelineOppositeContent style={{ flex: 0.1 }}>
          <Typography variant="body2" color="textSecondary">
            {plan[i].arrivalTime.text}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            <Avatar alt="Remy Sharp" src={plan[i].photos == null ? null: plan[i].photos[0].getUrl()} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              {plan[i].name}
            </Typography>
            <Typography>stay time: {plan[i].stayTime}</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    )
    timelineitems.push(item);
    var item2 = (
      <TimelineItem>
        <TimelineOppositeContent style={{ flex: 0.1 }}>
          <Typography variant="body2" color="textSecondary">
            {plan[i].arrivalTime.text}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            <Avatar>
              <TrainIcon />
            </Avatar>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Box display="flex" alignItems='center' height='100%'>
            17min by transit
          </Box>
        </TimelineContent>
      </TimelineItem>
    )
    timelineitems.push(item2);
  }
  return(
    <Timeline>
      {timelineitems}
    </Timeline>
  );

}
