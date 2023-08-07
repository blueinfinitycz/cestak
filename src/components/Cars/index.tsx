import {FC, ReactElement, useEffect, useState } from 'react'
import { Header,CustomModal } from ".."
import {  useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import {getLogBookApi,logBookDataSelector} from '../../store/logBookReducer'
import {getCarsApi,carsDataSelector} from '../../store/carsReducer'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const Cars:FC<any> = ():JSX.Element => {

  const navigate= useNavigate();
  const dispatch = useDispatch<any>()

   const carsData=useSelector(carsDataSelector)

  const onClickRow = (carId:number) => {
    console.log('CAR ID CLICK ROW: ',carId, typeof carId)
      dispatch(getLogBookApi(carId))
    navigate(`/cars/${carId}`)
  }

  useEffect(() => {
    dispatch(getCarsApi())
  },[dispatch])


  return(
    <>
    <Grid container>
      <Grid item sx={{m:'150px'}} xl={12} md={12}>
        <Box sx={{width: '100%'}}>
        <Paper sx={{ width: '100%' }}>
          <TableContainer>
            <Table size='medium' sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontWeight: 'bold', fontSize: '17px'}}>SPZ:</TableCell>
                  <TableCell sx={{fontWeight: 'bold', fontSize: '17px'}}>Značka vozidla:</TableCell>
                  <TableCell sx={{fontWeight: 'bold', fontSize: '17px'}}>Odpovědná osoba:</TableCell>
                  <TableCell sx={{fontWeight: 'bold', fontSize: '17px'}}>Poznámky:</TableCell>
                  <TableCell sx={{fontWeight: 'bold', fontSize: '17px'}}>Kniha jízd za poslední rok</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  Array.isArray(carsData) && carsData.map((row:{id:string,spz:string,
                    carBrand:string,responsiblePerson:string,notes:string}) => (<TableRow>
                    <TableCell>{row.spz}</TableCell>
                    <TableCell>{row.carBrand}</TableCell>
                    <TableCell>{row.responsiblePerson}</TableCell>
                    <TableCell>{row.notes}</TableCell>
                    <TableCell><Button size='small' variant='contained' onClick={() => onClickRow(+row.id)}>Kniha jízd</Button></TableCell>
                  </TableRow>))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        </Box>
      </Grid>
    </Grid>
    </>
  )
}