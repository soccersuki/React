import { useState, createContext } from 'react'
import { makeStyles, } from '@material-ui/core/styles';
import Home from './Home';
import FirstPage from './FirstPage'

export const AppContext = createContext();

export default function App() {
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);
  const [plan, setPlan] = useState(null);
  const [condition, setCondition] = useState(null);
  const [firstPage, setFirstPage] = useState(true);
  const contextValue = {
    google, setGoogle,
    map, setMap,
    plan, setPlan,
    condition, setCondition,
  }
  if(firstPage) return(
    <FirstPage setFirstPage={setFirstPage}/>
  )
  return(
    <AppContext.Provider value={contextValue}>
      <Home />
    </AppContext.Provider>
  )
}
