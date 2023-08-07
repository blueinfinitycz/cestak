import {FC, ReactElement,  useEffect} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {authLogin,isLogged} from '../../store/authReducer'


interface ICredentials {
    username:string;
    password:string;
}

export const Login:FC = ():ReactElement => {
    const dispatch = useDispatch<any>();
    const navigate= useNavigate()
    const _isLogged=useSelector(isLogged)

    const validationSchema = yup.object<ICredentials>({
      username: yup
          .string()
          .email('Vložte validní emailovou adresu')
          .required('Emailová adresa je povinná'),
        password: yup
          .string()
          .min(8, 'Heslo musí mít minimálně 8 znaků')
          .required('Heslo je povinné'),
      });
      const formik= useFormik({
        initialValues: {
          username: '',
          password: ''
        },
        // validationSchema:validationSchema,
        validateOnChange:true,
        onSubmit: (values:ICredentials) => {
          sessionStorage.removeItem("errorMessage");
        dispatch(authLogin({...values}))
        },
      })

      useEffect(() => {
        console.log('_isLogged: ',_isLogged)
        if(_isLogged) {
          navigate('/cars')    
        }else{
          navigate('/login')
        }
      },[isLogged])

  return(
    <Container component="main" maxWidth="xs" sx={{mt:20}}>
    <Card sx={{width:500}}>
        <CardContent>
            <Typography component="h2" sx={{fontSize:20,textAlign:'center'}} gutterBottom>
                Login
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate >
                <TextField
                    fullWidth
                    id='username'
                    label="Emailova adresa"
                    name='username'
                    autoComplete='username'
                    sx={{mb:2}}
                    autoFocus
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    margin='dense' />
                <TextField
                    fullWidth 
                    id='password'
                    label="Password"
                    name='password'
                    autoComplete='password' 
                    sx={{mb:4}} 
                    autoFocus
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password} />
                <Button type='submit'  variant="contained" fullWidth >Přihlásit se</Button>
            </Box>
        </CardContent>
    </Card>
    </Container>
  )
}