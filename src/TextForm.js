import { useState, useRef } from 'react'
import {
  Box,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import LoyaltyIcon from '@material-ui/icons/Loyalty';


export default function TextForm(props){
  const [text, setText] = useState(props.initialValue);
  const handleSubmit = (e) => {
    e.target.firstChild.firstChild.firstChild.blur()
    e.preventDefault();
    props.onSubmit(text);
  }
  const handleChange = (e) => {
    setText(e.target.value);
  }
  return(
    <form onSubmit={handleSubmit}>
      <TextField required fullWidth={props.fullWidth} id="standard-basic" label={props.label} variant="filled" onChange={handleChange} value={text}  InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <LoyaltyIcon color='secondary'fontSize="large"/>
        </InputAdornment>
      ),
    }}/>
    </form>
  )
}
