import React, { Component } from 'react';
import {Row,Card,CardBody,CardTitle, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import axios  from "axios";
import './Body.css'

export default class Lecturer extends Component {
  state={
    faculties:[],
    currentmodules:[],
    name:"",
    email:"",
    address:"",
    gender:"",
    phone:"",
    nationality:"",
    Faculty_id:"",
    DOB:'',
    ischecked:[],
    errrors:[],
    modules:[]
}
changeHandler=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

  saveandcallmodules=(event)=>{
    
    this.setState({Faculty_id: event.target.value}) 
      if(typeof this.state.Faculty_id ==='undefined'){
        console.log("baba ji ki booty")
        
      }
      else if(this.state.Faculty_id===null){
        console.log("karo jangaran")
      }
      else if (Object.keys(this.state.Faculty_id).length===0){
          console.log("let's go body it select another value")
      }
      else{
      axios.get(`http://localhost:90/subject/byfaculty/`+this.state.Faculty_id)
      .then(resp=>{
        
        this.setState({
          currentmodules:resp.data.data
        })
      }).catch(err=>{
        console.log(err)
      })
      }
      
      
  }
    componentDidMount(){
          
     axios.get(`http://localhost:90/faculty/all`)
            .then((response)=>{
              this.setState({
                faculties:response.data.data
              })
              
            })
            .catch((err)=>{
                console.log(err)
            })
  }
  
  HandleChecked=(event)=>{
    event.preventDefault()
    const value=event.target.value
    this.state.ischecked.push(value)
    console.log(this.state.ischecked)
  }
 
  render() {
    
    return <div className='LecturerForm'>
    <Container>
    <div className='row'>
    
        <div className='col-md-3'></div>
        <div className='col-md-6'>
        <Card>
        <CardBody>
        <Row className='Form_heading'>
        <CardTitle ><h3 >Save Lecturer Information</h3></CardTitle>
        </Row>
        <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail"
          onChange={this.changeHandler} value={this.state.email} placeholder="abc@xyz.com" required />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Phone number</Label>
          <Input type="text" name="phone" id="examplePhone" onChange={this.changeHandler}
          value={this.state.phone}
          placeholder="Enter your phone number" minLength={10}  maxLength={15} required />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Name</Label>
          <Input type="text" name="name" id="exampleName" onChange={this.changeHandler} value={this.state.name}
           placeholder="Enter Lecturer Name" required />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Address</Label>
          <Input type="text" name="address" id="exampleAddress" onChange={this.changeHandler} value={this.state.address}
          placeholder="Enter your address" required/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Nationality</Label>
          <Input type="text" name="nationality" id="exampleName" 
          onChange={this.changeHandler} value={this.state.nationality}
           placeholder="Please enter your nationality" required/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Faculty</Label>
          <Input type="select" name="Faculty_id" 
          // value={this.state.Faculty_id}
          onChange={this.saveandcallmodules}
          id="exampleSelect" required>
          
          {
            this.state.faculties.map((faculty)=>{
              return(
                <option value={faculty._id} 
                >{faculty.faculty_name}</option>
              )
            })
          }
          </Input>
        </FormGroup>
        <FormGroup tag="fieldset">
        <legend>Select Modules</legend>
          
          {
            this.state.currentmodules.map((Subject)=>{
              return(
                <FormGroup >
                <Label check className=''>
                  <Input type="checkbox" 
                  value={Subject.module_name} 
                  onChange={this.HandleChecked.bind(this)} />{' '}
                  {Subject.module_name}
                  
                </Label>
                </FormGroup>
              )
            })
          }
        
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend>Gender</legend>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="gender" onChange={this.changeHandler} value="Male"/>{' '}
              Male
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="gender" onChange={this.changeHandler} value="Female"/>{' '}
              Female
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="gender" onChange={this.changeHandler} value="Other"/>{' '}
             Other
            </Label>
          </FormGroup>
          
        </FormGroup>
        <FormGroup>
       <Label>DOB</Label>
        <Input type='Date' name='DOB' onChange={this.changeHandler} value={this.state.DOB} 
        maxDate={Date.now}></Input>
       </FormGroup>
       
        <Button color='primary' block>Submit</Button>
      </Form>
      
      </CardBody>
      </Card>
        </div>
        
        <div className='col-md-3'></div>
    </div>
    </Container>
    </div>;
  }
}

