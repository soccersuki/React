import {
  useHistory,
  useLocation,
} from "react-router-dom";

import ButtonAppBar from './ButtonAppBar';
import HeroImg from './HeroImg';
import SwitchListSecondary from './SwitchListSecondary';
import {
  Box,
} from '@material-ui/core';
import { prefectures } from './prefectures';

export default function ConditionPage(props) {
  const history = useHistory();
  const location = useLocation();
  const regionName = location.state.name;
  const originName = location.state.originName;
  const img = location.state.img
  const condition = {regionName, originName};

  const handleSubmit = (condition) => {
    history.push('/plan', {...condition, status: 'first'});
  }

  return(
    <>
      <ButtonAppBar />
      <HeroImg img={img}/>
      <Box display='flex' justifyContent="center">
        <Box width={'100%'} maxWidth={500}>
          <SwitchListSecondary onSubmit={handleSubmit} condition={condition}/>
        </Box>
      </Box>
    </>
  )
}
