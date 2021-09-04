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

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
}));
const label = 'abcdefghijklmnopqrstuvwxyz';

export default function CustomizedTimeline(props) {
  const classes = useStyles();
  var {plan} = props;
  // if(plan == null) return(null);
  var itinerary, legs;
  if(plan != null){
    itinerary = plan.itinerary;
    legs = plan.legs;
  }
  return(
    <Timeline>
      {plan != null ?
        itinerary.map((spot, i) => {
          return(
            <Zoom in={true} style={{ transitionDelay: true ? `${500 * i}ms` : '0ms' }}>
              <Box>
                <TimelineItem>
                  <TimelineOppositeContent style={{ flex: 0.1 }}>
                    <Typography variant="body2" color="textSecondary">
                      {spot.arrivalTime.text}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator style={{ flexGrow: 0.3 }}>
                    <Box display='flex' justifyContent='center'>
                      <Box mx={1} my={1}>
                        <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}} badgeContent={ (i == 0 || i == itinerary.length-1) ? null: label[i-1] } color="secondary">
                          <Avatar alt="Remy Sharp" src={spot.photos == null ? null: spot.photos[0].getUrl()} />
                        </Badge>
                      </Box>
                    </Box>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                      <Typography variant="h6" component="h1">{spot.name}</Typography>
                      <Typography variant='caption'>
                      {i != 0 && i != itinerary.length-1 ? (
                        <>
                          <Box display="flex" alignItems="center">
                            {spot.rating}
                            <Rating name="read-only" value={spot.rating} precision={0.5} readOnly size='small' />
                            ({spot.user_ratings_total})
                          </Box>
                          滞在時間: {spot.stayTime.text}
                        </>
                      ):
                        null
                      }
                      </Typography>
                      <Typography variant='caption'></Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
                {i < legs.length ?
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
                        {legs[i].duration.newText} by transit
                      </Box>
                    </TimelineContent>
                  </TimelineItem>
                  :
                  null
                }
              </Box>
            </Zoom>
          )
        })
      :
      [0, 1, 2, 3, 4].map(() => {
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
      })
    }
    </Timeline>
  );

}
