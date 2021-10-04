import { useState, createContext } from 'react'
import { makeStyles, } from '@material-ui/core/styles';
import { useGoogle } from './funcs/customHooks';

import Home from './Home';
import FirstPage from './FirstPage'
import MyContext from './MyContext'

// export const AppContext = createContext();

export default function App() {
  const [firstPage, setFirstPage] = useState(true);
  
  if(firstPage) return(
    <FirstPage setFirstPage={setFirstPage}/>
  )
  return(
    <MyContext>
      <Home />
    </MyContext>
  )
}
