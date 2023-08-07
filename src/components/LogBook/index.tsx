import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import {FC} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import {updateRecordApi,logBookDataSelector,IUpdateRecord, addRecordApi,deleteRecordApi} from '../../store/logBookReducer'
import { DataGrid, GridColDef,GridCellParams  } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Record } from '../../api/generated';


export const LogBook:FC = () => {
    const dispatch = useDispatch<any>()
    const _logBookData = useSelector(logBookDataSelector)

    const onClickNewJourney=() => {
            const obj:Record = {
                id: '1',
                date: '1.12.1989',
                journeyFrom:'Praha',
                journeyVia: 'Karlovy Vary',
                journeyTo: 'Most',
                departure: '9:00',
                arrival: '18:00',
                speedometer:'325 000',
                fuel:'556,56',
                cost: '22900',
                diets: '2000',
                overnight: '5000',
                methodOfPayment: 'hotovost',
                signature: 'apaguha vesely'
            }

        dispatch(addRecordApi({...obj}))   
    }
    const onClickEraseSelected = () => {
        dispatch(deleteRecordApi(1234)) 
    }
    const onClickExportToXLS = () => {}


    const onClickToCellStopEditToUpdateRecord = (val:GridCellParams ) => {
        const obj:IUpdateRecord= {
                id: val.id as number,
               id2:val.id as number,
               column: val.field,
               value: val?.value as string
        }
       dispatch(updateRecordApi(obj))
    }



    const columns: GridColDef[] = [
        {field: 'date', headerName: 'Datum', width: 90, editable:true, type: 'number'},
        {field: 'journeyFrom',headerName: 'Výjezd',width: 125,type: 'string',editable: true},
        {field: 'journeyVia',headerName: 'Přes',width: 125,editable: true, type: 'string'},
        {field: 'journeyTo',headerName: 'Cíl',width: 125,editable: true, type: 'string'},
        {field: 'departure',headerName: 'Čas odjezdu',width: 100,editable: true, type: 'number'},
        {field: 'arrival',headerName: 'Čas příjezdu',width: 100,editable: true, type:'number'},
        {field: 'speedometer',headerName: 'Tachometr (km)',width: 120,editable: true,type: 'number'},
        {field: 'fuel',headerName: 'PHM (L)',width: 80,editable: true, type: 'number'},
        {field: 'cost',headerName: 'Cena (Kč)',width: 100,editable: true, type: 'number'},
        {field: 'diets',headerName: 'Diety (Kč)',width: 100,editable: true, type: 'number'},
        {field: 'overnight',headerName: 'Nocležné (Kč)',width: 110,editable: true, type: "number"},
        {field: 'methodOfPayment',headerName: 'Způsob platby',width: 120,editable: true, type: 'string'},
        {field: 'signature',headerName: 'Podpis',width: 120,editable: true, type: 'string'}
    ]

    return(
        <>
    { _logBookData && (
        <Box sx={{ flexGrow: 1,mt:10 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item><Link to="/cars">Zpět na výběr vozidla</Link></Grid>
                <Grid item md={12}>
                {/* <Avatar src="https://www.autoesa.cz/files/cars/507257656/507257656-1.jpg" sx={{ width: '100px', height: '100px' }} variant="square"></Avatar> */}
                <Typography variant="h5" sx={{mt:2,mb:2}}>{_logBookData?.carInfo?.vehicleBrand}</Typography>
                </Grid>

                <Grid item md={3}>
                    <Accordion>
                        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
                            <Typography>Obecné</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <TableContainer>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Vlastník:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.owner}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Odpovědná osoba:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.responsiblePerson}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Typ vozidla:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.category?.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Značka vozidla:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.vehicleBrand}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>SPZ:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.spz}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Středisko:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.companyCenter}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid item md={3}>
                    <Accordion>
                        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
                            <Typography>Technické parametry</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <TableContainer>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Rok výroby:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.yearOfManufacture}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Vin koda:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.vinCode}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Typ vozidla:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.category?.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Objem motoru (cm3):</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.engineCapacity}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Objem nadrze (l):</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.tankVolume}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>PHM:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.typeOfPhm?.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Průměrná spotřeba (l/100km):</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.averageConsumption}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid item md={3}>
                    <Accordion>
                        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
                            <Typography>Servis</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <TableContainer>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Platnost dálniční známky:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.validityOfRoadStamp}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Termín servisní prohlídky:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.appointmentOfServiceVisits}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Termín STK:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.termStk}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Servis dle km:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.serviceAccordingToKm}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Servis dle mth:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.serviceAccordingToMonth}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid item md={3}>
                    <Accordion>
                        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
                            <Typography>Administrativa</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <TableContainer>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Datum pořízení:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.dateOfAcquisition}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Datum vyřazení:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.dateOfWithdrawal}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Stav tachometru při koupi:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.speedometerAtTheTimeOfPurchase}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>ČÍslo technického průkazu:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.technicalLicenseNumber}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Pojišťovna:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.insurance}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Číslo zelené karty:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.greenCardNumber}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Leasingová společnost:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.leasingCompany}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Platební karta:</TableCell>
                                    <TableCell>{_logBookData?.carInfo?.creditCard}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>

            {/* KNIHA JIZD */}
            <Grid container>
                <Grid item md={12}>
                    <Paper sx={{p:2}}>
                        <Button sx={{mt:2,mb:2,ml:1,mr:1}} variant='contained'size="small" onClick={onClickNewJourney}>Nová cesta</Button>
                        <Button sx={{mt:2,mb:2,ml:1,mr:1}} variant='contained'size="small" onClick={onClickEraseSelected}>Smazat označené</Button>
                        <Button sx={{mt:2,mb:2,ml:1,mr:1}} variant='contained'size="small" onClick={onClickExportToXLS}>Exportovat označené do XLS</Button>
                    <DataGrid
                        sx={{width: '100%'}}
                        rows={_logBookData?.logBook??[]}
                        columns={columns}
                        autoHeight
                        density='comfortable'
                        initialState={{
                        pagination: {
                        paginationModel: {
                            pageSize: 5,
                            },
                        },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        onCellEditStop={onClickToCellStopEditToUpdateRecord}
                    />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
    }
        </>
    )
}