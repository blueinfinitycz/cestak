import {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { Grid, IconButton, TableBody, TableCell } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import {Record} from '../../api/generated'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import CloseIcon from '@mui/icons-material/Close';
// import {addRecordApi,deleteRecordApi,updateRecordApi} from '../../store/logBookReducer'
import {  useDispatch, useSelector } from 'react-redux';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

interface IModal {
    state: 'create' | 'update' | null;
    data?:Record;
    onClose: () => void;
}

export const CustomModal = ({state=null,data={},onClose}:IModal) => {
    const [open, setOpen] = useState<boolean>(true);
    const handleClose = () => {onClose();setOpen((state) => !state);}
    // const [createdOrUpdatedData,setCreatedOrUpdatedData]=useState<any>(state==='update'?{date:'',journey:{from:'',to:'',via:''},methodOfPayment:'',refueling:{cost:'',fuel:''},signature:'',speedometer:''})
    const [canSend,setCanSend]= useState<boolean>(state==='update')

    const dispatch= useDispatch<any>()

    // const onChangeTxt = (e:any) => setCreatedOrUpdatedData({...createdOrUpdatedData,[e.target.id]:e.target.value});

    const _methodsOfPayment = [
        {
            value: 'Kreditní karta',
            label: 'Kreditní karta',
        },
        {
            value: 'Debetní karta',
            label: 'Debetní karta',
        },
        {
            value: 'Hotovost',
            label: 'Hotovost',
        },
    ]

    // const onSendData =(e:any) => {
    //     dispatch(state==='create'?addRecordApi({record:createdOrUpdatedData}):updateRecordApi(createdOrUpdatedData))
    // }

    // useEffect(() => {
    //         let err=false;
    //         console.log(JSON.stringify(createdOrUpdatedData))
    //     createdOrUpdatedData && Object.values(createdOrUpdatedData).forEach((item:any) => {
    //         console.log(item.toString().length)
    //         if((typeof item === 'string' || typeof item==='number') && item.toString().length===0){return err=true;}
    //     })
    //     setCanSend(!err)
        
    // },[createdOrUpdatedData])

    return(
        <Modal
        open={open}
        onClose={handleClose}
      >
          <Paper sx={{ width: '90%', m: 'auto',mt: '50px' }}>
            <Grid container>
                <Grid item sx={{width: '100%',textAlign:'right',mt:2,mr:4}}>
                    <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                </Grid>
                <Grid item sx={{width: '100%'}}>
                    <Typography gutterBottom={true} variant='h4' sx={{p:2,m:2,textAlign:'center',width: '100%'}}>{state!==null&&state==="update" ? "Editace cesty":"Nová cesta"}</Typography>
                </Grid>
                <Grid item>
                    <TableContainer>
                        
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' component="th">Datum</TableCell>
                                <TableCell align='center' component="th">Cesta</TableCell>
                                <TableCell align='center' component="th">Tachometr (km)</TableCell>
                                <TableCell align='center' component="th">Tankování pohonných hmot</TableCell>
                                <TableCell align='center' component="th">Způsob platby</TableCell>
                                <TableCell align='center' component="th">Podpis</TableCell>
                            </TableRow>
                        </TableHead>
                        
                            {/* <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <TextField size='small' sx={{width:'120px',m:1}} onChange={onChangeTxt} id="date" variant="outlined" defaultValue={data?.date} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField size='small' sx={{width:'160px',m:1}} onChange={onChangeTxt} id="from" label="Výjezd" variant="outlined" defaultValue={data&&data.journey?.from} /><DoubleArrowIcon sx={{mt:2}} />
                                        <TextField size='small' sx={{width:'160px',m:1}} onChange={onChangeTxt} id="via" label="Přes" variant="outlined" defaultValue={data&&data.journey?.via} /><DoubleArrowIcon/>
                                        <TextField size='small' sx={{width:'160px',m:1}} onChange={onChangeTxt} id="to" label="Cíl" variant="outlined" defaultValue={data&&data.journey?.to} />
                                       
                                        </TableCell>
                                    <TableCell>
                                        <TextField size='small' sx={{width:'100px',m:1}} onChange={onChangeTxt} id="speedometer" variant="outlined" defaultValue={data&&data.speedometer} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField size='small' sx={{width:'130px',m:1}} onChange={onChangeTxt} id="amount" label="Množství (L)" variant="outlined" defaultValue={data&&data.refueling?.fuel} />
                                        <TextField size='small' sx={{width:'100px',m:1}} onChange={onChangeTxt} id="cost" label="Cena (Kč)" variant="outlined" defaultValue={data&&data.refueling?.cost} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField size='small' select SelectProps={{native: true}} sx={{width:'150px',m:1}} onChange={onChangeTxt} id="methodOfPayment" variant="outlined" defaultValue={data&&data.methodOfPayment} >
                                            {_methodsOfPayment.map((item:{value:string,label:string}) => <option key={item.value}>{item.value}</option>)}
                                        </TextField>
                                    </TableCell>
                                    <TableCell>
                                        <TextField onChange={onChangeTxt} size='small' sx={{width:'160px',m:1}} id="signature" variant="outlined" defaultValue={data&&data.signature} />
                                    </TableCell>
                                </TableRow> 
                                <TableRow>
                                    <TableCell>
                                        <Button disabled={!canSend} variant='contained' onClick={onSendData}>Odeslat</Button>
                                    </TableCell>
                                </TableRow>       
                            </TableBody> */}
                        
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
      </Modal>
    )
}