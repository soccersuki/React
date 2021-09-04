import { useState, createContext } from 'react'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import HomePage from './HomePage';
import ConditionPage from './ConditionPage';
import PlanPage from './PlanPage';
import ButtonAppBar from './ButtonAppBar';

export const AppContext = createContext();

export default function App() {
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);
  const [plan, setPlan] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [condition, setCondition] = useState(null);
  const value = {
    google, setGoogle,
    map, setMap,
    plan, setPlan,
    markers, setMarkers,
    condition, setCondition,
  }
  return(
    <AppContext.Provider value={value}>
      <Router>
        <ButtonAppBar />
        <Switch>
          <Route path="/condition">
            <ConditionPage />
          </Route>
          <Route path="/plan">
            <PlanPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  )
}
