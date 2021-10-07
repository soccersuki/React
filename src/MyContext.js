import { useState, createContext } from 'react'

export const AppContext = createContext();

export default function MyContext(props){
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);
  const [plan, setPlan] = useState(null);
  const [condition, setCondition] = useState(null);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    handleClose: () => setSnackbarState({...snackbarState, open: false}),
    handleOpen: (text) => setSnackbarState({...snackbarState, open: true, text}),
  });
  const [dialogState, setDialogState] = useState({
    open: false,
    handleClose: () => setDialogState({...dialogState, open: false}),
    handleOpen: (status) => setDialogState({...dialogState, open: true, status})
  })
  const [drawerState, setDrawerState] = useState({
    open: {
      top: false,
      left: false,
      bottom: false,
      right: false,
    },
    toggle: (anchor, open, content) => setDrawerState({ ...drawerState, content, open: { ...drawerState.open, [anchor]: open }}),
    anchor: 'bottom',
  })
  const contextValue = {
    google, setGoogle,
    map, setMap,
    plan, setPlan,
    condition, setCondition,
    snackbarState,
    dialogState,
    drawerState,
  }
  return(
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  )
}
