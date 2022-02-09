import React, { Component } from 'react';
import{Routes,Route} from 'react-router-dom'

import LecturerPage from './Lecturer'
export default class Body extends Component {
  render() {
    return <div className='Body'>
    <Routes>

    <Route path='/' exact element={<LecturerPage/>}/>
    
    </Routes>
    
    </div>;
  }
}

