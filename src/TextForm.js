import { useState, useRef } from 'react'
import {
  Box,
  TextField,
} from '@material-ui/core';

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
      <TextField required fullWidth={props.fullWidth} id="standard-basic" label={props.label} variant="filled" onChange={handleChange} value={text}/>
    </form>
  )
}
