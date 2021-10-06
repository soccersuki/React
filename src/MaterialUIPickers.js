import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  TimePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        margin="dense"
        id="time-picker"
        label={props.label}
        value={props.selectedDate}
        onChange={props.handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
        style={{width: '100%',}}
        size='small'
      />
    </MuiPickersUtilsProvider>
  );
}
