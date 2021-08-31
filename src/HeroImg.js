import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '30vh',
  },
}));

export default function HeroImg(props){
  const classes = useStyles();

  return(
    <img className={classes.root} src={props.img} alt={'alt'} />
  )
}
