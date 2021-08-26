import {
  Box,
  Typography,
} from '@material-ui/core';

import SingleLineImageList from './SingleLineImageList';
import imgOsaka from './img_osaka.jpg';
import imgHokkaido from './img_hokkaido.jpg';
import imgTokyo from './img_tokyo.jpg';

export default function PopularRegions(props){
  var itemData = [
    {
      img: imgOsaka,
      title: '大阪',
    },
    {
      img: imgTokyo,
      title: '東京',
    },
    {
      img: imgHokkaido,
      title: '北海道',
    },
  ];

  const handleClick = (e, id) => {
    props.onClick(itemData[id].title);
  }

  return(
    <>
      <Typography variant='subtitle1'><Box color="gray">人気のエリア</Box></Typography>
      <SingleLineImageList itemData={itemData} onClick={handleClick}/>
    </>
  )
}
