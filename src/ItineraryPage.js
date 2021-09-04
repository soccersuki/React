import { useContext, useState } from 'react'
import { useHistory, } from "react-router-dom";
import { Box, Button, CircularProgress, Fab } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import CustomizedTimeline from './CustomizedTimeline';
import { usePlan } from './funcs';
import { AppContext } from './App';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function ItineraryPage(){
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => {
    history.push('/plan/edit');
  }
  const plan = usePlan();
  return(
    <Box>
      <CustomizedTimeline plan={plan}/>
      <Fab color="secondary" aria-label="edit" onClick={handleClick} className={classes.fab}>
        <EditIcon />
      </Fab>
    </Box>
  )
}
