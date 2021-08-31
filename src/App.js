import { useState, useRef, useEffect, createContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";

import { Loader } from "@googlemaps/js-api-loader"

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';

import HomePage from './HomePage';
import ConditionPage from './ConditionPage';
import PlanPage from './PlanPage';
import EditPage from './EditPage';
import AddPage from './AddPage';

export const AppContext = createContext();

export default function App() {
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);
  const [plan, setPlan] = useState(null);
  const [markers, setMarkers] = useState(null);
  const value = {
    google, setGoogle,
    map, setMap,
    plan, setPlan,
    markers, setMarkers,
  }
  return(
    <AppContext.Provider value={value}>
      <Router>
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
