import { makeStyles } from '@material-ui/core/styles';
import imgTravel from './images/img_travel.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '30vh',
  },
}));

export default function HeroImg(props){
  const classes = useStyles();

  return(
    <img className={classes.root} src={props.img == null ? imgTravel: props.img} />
  )
}
