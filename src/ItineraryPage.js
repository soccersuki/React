import { useContext, useState } from 'react'
import { useHistory, useLocation, } from "react-router-dom";
import { Box, Button, CircularProgress } from '@material-ui/core';
import CustomizedTimeline from './CustomizedTimeline';
import { usePlan } from './funcs';
import { AppContext } from './App';

export default function ItineraryPage(){
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(null);
  const handleClick = () => {
    history.push('/plan/edit');
  }
  var plan = usePlan(setLoading);
  return(
    <>
      {loading ?
        <CircularProgress />
        :
        <CustomizedTimeline plan={plan}/>
      }

      <Box display='flex' justifyContent='center' my={5}>
        <Button type="submit" variant="contained" onClick={handleClick}>EDIT</Button>
      </Box>
    </>
  )
}
