import {
  Box,
  Typography,
} from '@material-ui/core';

export default function Hero() {
  return(
    <Box height="70vh" justifyContent="center" alignItems="center" display="flex" bgcolor='#3f51b5'>
      <Box mx='auto'>
        <Typography variant="h2"><Box color="white">Let's plan!</Box></Typography>
        <Typography variant="subtitle1"><Box color="white">旅行の予定を自動で作成</Box></Typography>
      </Box>
    </Box>
  )
}
