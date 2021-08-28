import {
  useHistory,
  useLocation,
} from "react-router-dom";

import ButtonAppBar from './ButtonAppBar';
import HeroImg from './HeroImg';
import SwitchListSecondary from './SwitchListSecondary';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '500px',
  },
}));

export default function ConditionPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const regionName = location.state.regionName;

  const handleSubmit = (condition) => {
    history.push('/plan', {...condition, status: 'first'});
  }

  return(
    <>
      <ButtonAppBar />
      <HeroImg regionName={regionName} />
      <Box display='flex' justifyContent="center" mx={5}>
        <Box className={classes.root}>
          <SwitchListSecondary onSubmit={handleSubmit} regionName={regionName}/>
        </Box>
      </Box>

    </>
  )
}
