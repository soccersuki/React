import { useContext, useState } from 'react'
import { useHistory, useLocation, } from "react-router-dom";
import { Box, Button, CircularProgress, Fab } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';

import CustomizedTimeline from './CustomizedTimeline';
import { usePlan } from './funcs';
import { AppContext } from './App';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function ItineraryPage(){
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(null);
  const handleClick = () => {
    history.push('/plan/edit');
  }
  var plan = usePlan(setLoading);
  return(
    <Box className={classes.root}>
      {loading ?
        <CircularProgress />
        :
        <CustomizedTimeline plan={plan}/>
      }

      <Box display='flex' justifyContent='center' my={5} className={classes.fab}>
        <Fab color="secondary" aria-label="edit" onClick={handleClick}>
          <EditIcon />
        </Fab>
      </Box>
    </Box>
  )
}
