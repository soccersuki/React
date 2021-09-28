import { useState, } from 'react'
import CustomizedTimeline from './CustomizedTimeline';
import MySpeedDial from './MySpeedDial'
import MyDrawer from './MyDrawer'
import ScrollDialog from './ScrollDialog'
import SwitchListSecondary from './SwitchListSecondary'

export default function Action(props){
  const [openDrawer, setOpenDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [condition, setCondition] = useState({regionName: '大阪', originName: '大阪駅'});
  const [dialogTitle, setDialogTitle] = useState(null);
  const toggleDrawer = (anchor, open) => {
    setOpenDrawer({ ...openDrawer, [anchor]: open });
  };
  const handleOpen = (status) => {
    condition.status = status;
    setCondition({...condition});
    if(condition.status == 'new') setDialogTitle('NEW')
    else setDialogTitle('UPDATE')
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return(
    <>
      <MyDrawer drawer={<CustomizedTimeline />} toggleDrawer={toggleDrawer} state={openDrawer} anchor={'right'}/>
      <ScrollDialog title={dialogTitle} handleOpen={handleOpen} handleClose={handleClose} open={openDialog} content={<SwitchListSecondary condition={condition}/>}/>
      <MySpeedDial toggleDrawer={toggleDrawer} handleOpen={handleOpen}/>
    </>
  )
}
