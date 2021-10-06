import { useState, } from 'react'
import {
  Box,
  TextField,
  InputAdornment,
  InputBase,
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
    <Box display='flex'>
    <LoyaltyIcon color="action" style={{margin: 10}}/>
    <InputBase required placeholder="Search Google Maps" size="small" fullWidth label={'SEARCH'} onChange={handleChange} value={text}  InputProps={{
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
    <SearchIcon color='action' style={{margin: 10}}/>
    </Box>
    </form>
  )
}
