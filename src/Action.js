import { useState, } from 'react'
import CustomizedTimeline from './CustomizedTimeline';
import MySpeedDial from './MySpeedDial'
import MyDrawer from './MyDrawer'

export default function Action(props){
  const [openDrawer, setOpenDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => {
    setOpenDrawer({ ...openDrawer, [anchor]: open });
  };

  return null;

  return(
    <>
      <MyDrawer drawer={<CustomizedTimeline toggleDrawer={toggleDrawer}/>} toggleDrawer={toggleDrawer} state={openDrawer} anchor={'bottom'}/>
      <MySpeedDial toggleDrawer={toggleDrawer}/>
    </>
  )
}
