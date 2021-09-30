import { useState, } from 'react'
import {
  Box,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SearchIcon from '@material-ui/icons/Search';

export default function TextForm(props){
  const [text, setText] = useState(props.initialValue);
  const handleSubmit = (e) => {
    e.preventDefault();
    // e.target.firstChild.firstChild.firstChild.blur()
    const elem = document.activeElement;
    elem.blur()
    props.onSubmit(text);
  }
  const handleChange = (e) => {
    setText(e.target.value);
  }
  return(
    <form onSubmit={handleSubmit}>
      <TextField required size="small" fullWidth label={'SEARCH'} variant="outlined" onChange={handleChange} value={text}  InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LoyaltyIcon color='secondary'fontSize="large"/>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon color='action'/>
          </InputAdornment>
        )
      }}/>
    </form>
  )
}
