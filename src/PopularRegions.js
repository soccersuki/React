import {
  Box,
  Typography,
} from '@material-ui/core';

import SingleLineImageList from './SingleLineImageList';

import { prefectures } from './prefectures';

export default function PopularRegions(props){
  var popularRegions = [
    prefectures.Osaka,
    prefectures.Tokyo,
    prefectures.Hokkaido,
  ]

  const handleClick = (e, id) => {
    props.onClick(popularRegions[id]);
  }

  return(
    <>
      <Typography variant='subtitle1'><Box color="gray">人気のエリア</Box></Typography>
      <SingleLineImageList itemData={popularRegions} onClick={handleClick}/>
    </>
  )
}
