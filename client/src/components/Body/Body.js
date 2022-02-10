import { Container } from '@mui/material';
import React, { Component } from 'react';
import{Routes,Route} from 'react-router-dom'

import LecturerPage from './Lecturer'
import Showfaculty from './Showfaculty';
export default class Body extends Component {
  render() {
    return <div className='Body'>
    <Container>
    <Routes>

    <Route path='/' exact element={<LecturerPage/>}/>
    <Route path='/faculty' exact element={<Showfaculty/>}/>
    </Routes>
    </Container>
    </div>;
  }
}

