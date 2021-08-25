import {
  Box,
  Typography,
} from '@material-ui/core';

import SingleLineImageList from './SingleLineImageList';

export default function PopularRegions(props){
  var regions = ['大阪', '東京', '北海道', '福岡'];

  return(
    <Box my={5} mx={5}>
      <Typography variant='subtitle1'><Box color="gray">都道府県から選ぶ</Box></Typography>
      <SingleLineImageList />
    </Box>
  )
}
