import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
function Showfaculty() {
    const [Faculties,setFaculties]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:90/faculty/all`)
        .then(response=>{
            setFaculties(response.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
        console.log(Faculties)
    })
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
  return ( <div className='mt-2 mb-2'>
  <LocalizationProvider dateAdapter={AdapterDateFns}>
  <Stack spacing={3}>
  <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </Stack>
        </LocalizationProvider>
        </div>
  )
}

export default Showfaculty;
