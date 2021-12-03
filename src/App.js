import { useState } from 'react'
import { useGoogle } from './funcs/customHooks';

import Home from './Home';
import Splash from './Splash'

export default function App() {
  const [splash, setSplash] = useState(true);

  useGoogle()

  if(splash) return(
    <Splash setSplash={setSplash}/>
  )
  return(
    <Home />
  )
}
