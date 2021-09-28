import TextForm from './TextForm'
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { Box, Chip, InputAdornment, } from '@material-ui/core'

export default function Top(props){
  const handleClick = (id) => () => {
    props.onClick(id);
  }
  const chips = props.types.map((type, id) => (
    <Chip label={type.japanese} size="small" icon={type.icon}variant='outlined' onClick={handleClick(id)} style={{margin: 5}} color={props.chipIndex == id ? 'primary': 'default'}/>
  ))
  return(
    <Box mx={2}>
      <Box mb={2}>
        <Box>
          <TextForm fullWidth={true} onSubmit={props.onSubmit}/>
        </Box>
      </Box>
      <Box style={{overflowX: 'auto', whiteSpace: 'nowrap'}}>
        {chips}
      </Box>
    </Box>
  )
}
