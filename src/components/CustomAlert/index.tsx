import {FC} from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface ICustomAlert {
    message:string;
}

export const CustomAlert:FC<any> = ({message}:ICustomAlert):JSX.Element => {

    return(
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert variant='filled' severity="warning">{message}</Alert>
      </Stack>
    )
}