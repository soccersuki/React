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
import Map from './Map'
import { usePlace, useNearbySearch } from './funcs';

export default function ConditionPage(props) {
  const history = useHistory();
  const location = useLocation();
  const regionName = location.state.regionName;
  const region = usePlace(regionName);
  const origin = usePlace(regionName + ' 交通機関', region == null ? null : region[0].geometry.location)
  const originName = origin == null ? null: origin[0].name;
  const condition = {initialRegionName: regionName, initialOriginName: originName};

  const handleSubmit = (condition) => {
    history.push('/plan', {...condition, status: 'first'});
  }

  return(
    <>
      <ButtonAppBar />
      <Map />
      <Box display='flex' justifyContent="center">
        <Box width={'100%'} maxWidth={500}>
          <SwitchListSecondary onSubmit={handleSubmit} condition={condition}/>
        </Box>
      </Box>
    </>
  )
}
