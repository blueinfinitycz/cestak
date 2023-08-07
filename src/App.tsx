import { Backdrop, CircularProgress, Container, Grid } from "@mui/material"
import {FC, ReactElement, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import {isLoadingAuth, isLogged} from './store/authReducer'
import {isLoadingCars} from './store/carsReducer'
import {isLoadingLogBook} from './store/logBookReducer'
import { Header } from "./components";

export const App:FC = ():ReactElement => {
  const navigate= useNavigate();
  const _isLoadingAuth = useSelector(isLoadingAuth)
  const _isLogged = useSelector(isLogged)
  const _isLoadingCars=useSelector(isLoadingCars)
  const _isLoadingLogBook=useSelector(isLoadingLogBook)

  useEffect(() => {
    if(_isLogged){
      navigate('/cars')
    }else{
      navigate('/login')
    }
    
  },[_isLogged])

  return(
    <>
      {
    (_isLoadingAuth?.length!==0 || _isLoadingCars?.length!==0 || _isLoadingLogBook?.length!==0) && (
      <Backdrop open={true} style={{zIndex:10000}}>
       <CircularProgress color="inherit" />
     </Backdrop>
    )
  }
    <Container disableGutters maxWidth="xl">
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item xs={12} sx={{pt:5,pb:5}}>
      <Outlet />
      </Grid>
      </Grid>
    </Container>
    </>
  )
}