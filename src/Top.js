import TextForm from './TextForm'
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { Box, Chip, InputAdornment, Paper} from '@material-ui/core'

export default function Top(props){
  const handleClick = (id) => () => {
    props.onClick(id);
  }
  const chips = props.types.map((type, id) => (
    <Chip label={type.japanese} size="small" icon={type.icon}variant='outlined' onClick={handleClick(id)} style={{margin: 5}} color={props.chipIndex == id ? 'primary': 'default'}/>
  ))
  return(
    <Box mx={2}>
      <Paper mb={2}>
        <TextForm onSubmit={props.onSubmit}/>
      </Paper>
      <Box my={2}style={{overflowX: 'auto', whiteSpace: 'nowrap'}}>
        {chips}
      </Box>
    </Box>
  )
}
