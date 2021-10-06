import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export default function MySnackbar(props){
  return(
    <Snackbar open={props.open} autoHideDuration={3000} onClose={props.handleClose}>
      <Alert elevation={6} variant="filled" onClose={props.handleClose} severity="success">
        {props.text}
      </Alert>
    </Snackbar>
  )
}
