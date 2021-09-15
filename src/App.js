import { useState, createContext } from 'react'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import HomePage from './HomePage';
import ConditionPage from './ConditionPage';
import PlanPage from './PlanPage';
import ButtonAppBar from './ButtonAppBar';
import BottomNavigation from './BottomNavigation';
import { makeStyles, } from '@material-ui/core/styles';
import Home from './Home';

import { Box, } from '@material-ui/core'

export const AppContext = createContext();

const useStyles = makeStyles((theme) => ({
  root: {
  },
  bottomNavigation: {
    position: 'fixed',
    bottom: theme.spacing(2),
  },
}));

export default function App() {
  const classes = useStyles();
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);
  const [plan, setPlan] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [condition, setCondition] = useState(null);
  const [places, setPlaces] = useState(null);
  const [value, setValue] = useState(0);
  const contextValue = {
    google, setGoogle,
    map, setMap,
    plan, setPlan,
    markers, setMarkers,
    condition, setCondition,
    places, setPlaces,
    value, setValue,
  }
  return(
    <AppContext.Provider value={contextValue}>
      <Router>
        <ButtonAppBar />
        <Box mb={10}>
          <Switch>
            <Route path="/condition">
              <ConditionPage />
            </Route>
            <Route path="/plan">
              <PlanPage />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Box>
        <BottomNavigation/>
      </Router>
    </AppContext.Provider>
  )
}
