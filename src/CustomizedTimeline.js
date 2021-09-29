import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TrainIcon from '@material-ui/icons/Train';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import { Box, Avatar, Zoom, Badge, Typography, Paper } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useContext } from 'react';
import { AppContext } from './App'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
}));
const label = 'abcdefghijklmnopqrstuvwxyz';

function SpotTimelineItem(props){
  const classes = useStyles();
  const {spot, i} = props
  return(
    <TimelineItem>
      <TimelineOppositeContent style={{ flex: 0.1 }}>
        <Typography variant="body2" color="textSecondary">
          {spot.arrivalTime.text}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator style={{ flexGrow: 0.3 }}>
        <Box display='flex' justifyContent='center'>
          <Box mx={1} my={1}>
            <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}} badgeContent={ label[i-1] } color="secondary">
              <Avatar alt="Remy Sharp" src={spot.photos == null ? null: spot.photos[0].getUrl()} />
            </Badge>
          </Box>
        </Box>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent style={{ flexGrow: 1}}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box>
              <Typography variant="h6" component="h1">{spot.name}</Typography>
              <Typography variant='caption'>
              <>
                <Box display="flex" alignItems="center">
                  {spot.rating}
                  <Rating name="read-only" value={spot.rating} precision={0.5} readOnly size='small' />

                </Box>
                滞在時間: {spot.stayTime.text}
              </>
              </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

      </TimelineContent>
    </TimelineItem>
  )
}

function PointTimelineItem(props){
  const classes = useStyles();
  const {spot} = props
  return(
    <TimelineItem>
      <TimelineOppositeContent style={{ flex: 0.1 }}>
        <Typography variant="body2" color="textSecondary">
          {spot.arrivalTime.text}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator style={{ flexGrow: 0.3 }}>
        <Box display='flex' justifyContent='center'>
          <Box mx={1} my={1}>
            <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}} badgeContent={ null } color="secondary">
              <Avatar alt="Remy Sharp" src={spot.photos == null ? null: spot.photos[0].getUrl()} />
            </Badge>
          </Box>
        </Box>
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" component="h1">{spot.name}</Typography>
          <Typography variant='caption'></Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  )
}

function LegTimelineItem(props){
  const {spot, leg} = props;
  return(
    <TimelineItem>
      <TimelineOppositeContent style={{ flexGrow: 0.1 }}>
        <Typography variant="body2" color="textSecondary">
          {spot.departureTime.text}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator style={{ flexGrow: 0.3 }}>
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
          {leg.duration.newText} by transit
        </Box>
      </TimelineContent>
    </TimelineItem>
  )
}

export default function CustomizedTimeline(props) {
  const classes = useStyles();
  const {plan} = useContext(AppContext);
  if(plan == null){
    return(
      <Timeline>
        {[0, 1, 2, 3, 4].map(() => {
          return(
            <TimelineItem>
              <TimelineOppositeContent style={{ flex: 0.1 }}>
                <Typography variant="body2" color="textSecondary">
                  <Skeleton />
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator style={{ flexGrow: 0.3 }}>
                <Box mx={1} my={1}>
                  <Skeleton variant="circle">
                    <Avatar />
                  </Skeleton>
                </Box>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h1"><Skeleton /></Typography>
              </TimelineContent>
            </TimelineItem>
          )
        })}
      </Timeline>
    )
  }
  const {itinerary, legs} = plan;
  return(
    <Timeline>
      {itinerary.map((spot, i) => {
        return(
          <Box>
            {i != 0 && i != itinerary.length-1 ?
              <SpotTimelineItem spot={spot} i={i} onClick={() => props.onClick(spot)}/>
            :
              <PointTimelineItem spot={spot} onClick={() => props.onClick(spot)}/>
            }
            {i < legs.length ?
              <LegTimelineItem spot={spot} leg={legs[i]}/>
              :
              null
            }
          </Box>
        )
      })
    }
    </Timeline>
  );
}
