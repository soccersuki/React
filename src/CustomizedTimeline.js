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
import { Box, Avatar, Zoom, Badge, Typography, Paper, FormControl, MenuItem, InputLabel, Select, Button} from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigationIcon from '@material-ui/icons/Navigation';
import Alert from '@material-ui/lab/Alert';

import imgOsaka from './images/img_osaka.jpg'


import { useContext } from 'react';
import { AppContext } from './MyContext'

import { setTime, } from './funcs/planFuncs'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
}));
const label = 'abcdefghijklmnopqrstuvwxyz';

function MyTimelineItem(props){
  return(
    <TimelineItem>
      <TimelineOppositeContent style={{ flexGrow: 0.1 }}>
        <Typography variant="body2" color="textSecondary">
          {props.time}
        </Typography>
        {props.oppositeContent}
      </TimelineOppositeContent>
      <TimelineSeparator style={{ flexGrow: 0.3 }}>
        <TimelineConnector />
        <Box display='flex' justifyContent='center'>
          <Box mx={1} my={1}>
            {props.separator}
          </Box>
        </Box>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {props.content}
      </TimelineContent>
    </TimelineItem>
  )
}

function DurationSelect(props){
  return(
    <FormControl>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={props.initialValue}
        onChange={(e) => props.onChange(e.target.value)}
        label="Age"
      >
        <MenuItem dense value={props.initialValue}>{props.initialValue}</MenuItem>
        <MenuItem dense value={0}>0</MenuItem>
        <MenuItem dense value={30}>30</MenuItem>
        <MenuItem dense value={60}>60</MenuItem>
        <MenuItem dense value={120}>120</MenuItem>
        <MenuItem dense value={180}>180</MenuItem>
      </Select>
    </FormControl>
  )
}

export default function CustomizedTimeline(props) {
  const classes = useStyles();
  const {plan, setPlan, condition, dialogState, } = useContext(AppContext);

  if(plan == null){
    return(
      <Timeline>
        {[0, 1, 2, 3, 4].map(() => {
          return(
            <MyTimelineItem
              time={<Skeleton />}
              content={<Typography variant="h1"><Skeleton /></Typography>}
              separator={<Skeleton variant="circle"><Avatar /></Skeleton>}
            />
          )
        })}
      </Timeline>
    )
  }

  const {itinerary, legs} = plan;

  const handleChange = (spot, value) => {
    spot.duration.value = value * 60;
    setTime(itinerary, legs, condition.departureTime)
    setPlan({...plan})
  }

  const handleClick = () => {
    console.log('click')
    props.toggleDrawer('bottom', false)
    dialogState.handleOpen('update')
  }

  return(
    <Box height='100%' style={{overflow: 'scroll'}}>
      <Box width='100%'>
        <Box style={{position: 'relative'}}>
          <img src={plan.itinerary[1].photos[0].getUrl()} style={{height: 200, width: '100%'}}/>
          <Box display="flex"p={2} style={{position: 'absolute', bottom: 0}}>
            <Avatar>
              <NavigationIcon />
            </Avatar>
            <Typography variant='h5' style={{color: 'white'}}>{condition.regionName}一日旅行</Typography>
          </Box>
        </Box>

        <Box p={1}>
          <Alert severity="warning">
            <Box>時間は目安です</Box>
            <Box>閉店しているかも</Box>
            <Box>
            スポットが変わりました
            <Button color="primary" onClick={handleClick}>更新</Button>
            </Box>
          </Alert>
        </Box>
      </Box>
      <Timeline>
        {itinerary.map((spot, i) => {
          return(
            <Box>
              <MyTimelineItem spot={spot} i={i} onChange={handleChange} time={spot.arrivalTime.text}
                content={
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box>
                        <Typography variant="h6" component="h1">{spot.name}</Typography>
                        <Typography variant='caption'>
                          <Box display="flex" alignItems="center">
                            {spot.rating}
                            <Rating name="read-only" value={spot.rating} precision={0.5} readOnly size='small' />
                          </Box>
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant='body2'>
                        <Box display="flex" alignItems="center">
                          <Box>滞在時間:</Box>
                          <DurationSelect initialValue={spot.duration.value / 60} onChange={(value) => handleChange(spot, value)}/>
                          <Box>分</Box>
                        </Box>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                }
                separator={
                  <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}} badgeContent={ label[i-1] } color="secondary">
                    <Avatar alt="Remy Sharp" src={spot.photos == null ? null: spot.photos[0].getUrl()} />
                  </Badge>
                }
              />
              {i < legs.length ?
                <MyTimelineItem spot={spot} leg={legs[i]} time={spot.departureTime.text}
                  content={
                    <Box display="flex" alignItems='center' height='100%'>
                      電車で
                      <DurationSelect initialValue={Math.floor(legs[i].duration.value / 60)} onChange={(value) => handleChange(legs[i], value)}/>
                      分
                    </Box>}
                  separator={<TrainIcon />}
                />
                :
                null
              }
            </Box>
          )
        })
      }
      </Timeline>

    </Box>
  );
}
