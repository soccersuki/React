import { useHistory, useLocation, } from "react-router-dom";
import { Box, Button } from '@material-ui/core';
import CustomizedTimeline from './CustomizedTimeline';
import { usePlan } from './funcs';
export default function ItineraryPage(){
  const history = useHistory();
  const location = useLocation();
  const condition = location.state;
  const handleClick = () => {
    history.push('/plan/edit', {...condition});
  }
  var plan = usePlan(condition);
  return(
    <>
      <CustomizedTimeline plan={plan}/>
      <Box display='flex' justifyContent='center' my={5}>
        <Button type="submit" variant="contained" onClick={handleClick}>EDIT</Button>
      </Box>
    </>
  )
}
