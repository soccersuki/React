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
    width: '80vw',
  },
}));

export default function ConditionPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const region = location.state.region;

  const handleSubmit = (condition) => {
    history.push('/plan', {region, ...condition});
  }

  return(
    <>
      <ButtonAppBar />
      <HeroImg region={region} />
      <Box display='flex' justifyContent="center">
        <Box className={classes.root}>
          <SwitchListSecondary onSubmit={handleSubmit} />
        </Box>
      </Box>

    </>
  )
}
