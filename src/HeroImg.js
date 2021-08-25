import imgOsaka from './img_osaka.jpg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '30vh',
  },
}));

export default function HeroImg(props){
  const classes = useStyles();
  // var item = props.img;

  return(
    <img className={classes.root} src={imgOsaka} alt={'alt'} />
  )
}
