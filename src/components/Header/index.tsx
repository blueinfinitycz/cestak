import { Grid, Typography, Button, AppBar, Toolbar, Box, IconButton, Avatar } from '@mui/material'
import {FC, ReactElement, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {authUser} from '../../store/authReducer'
import { useSelector, useDispatch } from 'react-redux';
import {LoginApiResponse} from '../../api/generated';
import {authLogout} from '../../store/authReducer'
import { Container } from '@mui/system';

export const Header:FC = ():ReactElement => {
    const dispatch = useDispatch<any>();
    const userData:LoginApiResponse = useSelector(authUser)

    const onClickLogout=() => {
        dispatch(authLogout())
    }
    return(
      <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters={true} variant='regular'>

{ Object.keys(userData).length > 0 && (
  <>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Kniha jízd
          </Typography>
          <Box>
          <span style={{marginRight:'15px'}}>{userData?.displayName}</span>
         <span style={{marginRight:'15px'}}>{userData?.email}</span>
          </Box>
              <Link style={{color: 'white'}} onClick={onClickLogout} to="#">Odhlásit se</Link>
              </>
)
}
        </Toolbar>
        </Container>
      </AppBar>
    )
}