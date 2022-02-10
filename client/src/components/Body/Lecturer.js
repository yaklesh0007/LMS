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
    modules:[],

    emailerror:'',
    phoneerror:'',
    addresserror:'',
    gendererror:'',
    nationalityerror:'',
    DOBerror:'',
    facultyerror:'',
    
    nameerror:''


}
changeHandler=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

  saveandcallmodules=(event)=>{
    
    this.setState({Faculty_id: event.target.value}) 
      if(typeof this.state.Faculty_id ==='undefined'){
        console.log("modules are undefined")
        
      }
      else if(this.state.Faculty_id===null){
        console.log("null value is received")
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
    // event.preventDefault()
    const value=event.target.value
    this.state.modules.push(value)
    console.log(this.state.modules)

  }
 HandleValidation=()=>{
   let emailerror=''
   let nameerror, addresserror, DOBerror,nationalityerror,facultyerror=''
   if(!this.state.email){
       emailerror="Email must not be empty!!"
   }
   else if(!this.state.email.includes('@')){
      emailerror="Invalid email address!!"
   }
   else if(!this.state.name){
      nameerror="Username must not be empty!!"
  }
  else if(!this.state.address){
      addresserror="Address must not be empty!!"
  }
  else if(!this.state.DOB){
      DOBerror="Date of birth must not be empty!!"
  }
  else if(!this.state.nationality){
      nationalityerror="Nationality must not be empty!!"
  }
  else if(!this.state.Faculty_id){
      facultyerror="Lecturer must belong to one faculty!!"
  }
  else if(!this.state.DOB>"1-1-2005"){
      DOBerror="Sorry lecturer age seems to me underage "
  }
  if(DOBerror||nationalityerror||facultyerror||emailerror||nameerror||addresserror){
    this.setState({
      DOBerror:DOBerror,
     
      nationalityerror:nationalityerror,
      facultyerror:facultyerror,
      emailerror:emailerror,
      nameerror:nameerror,
      addresserror:addresserror
    })
    return false
  }
  
  return true
 }

 savedata=(event)=>{
  event.preventDefault();
   const isValid=this.HandleValidation
   if(isValid){
      axios.post(`http://localhost:90/lecturer/`, this.state)
      .then(resp=>{
        console.log(resp)
      })
      .catch(err=>{
        console.log(err)
      })
   }
   else{
     console.log("oops something went wrong!!")
   }

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
        <Form onSubmit={this.savedata}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail"
          onChange={this.changeHandler} value={this.state.email} placeholder="abc@xyz.com" required />
        <span style={{color: "red"}}>{this.state.emailerror}</span>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Phone number</Label>
          <Input type="text" name="phone" id="examplePhone" onChange={this.changeHandler}
          value={this.state.phone} required
          placeholder="Enter your phone number" minLength={10}  maxLength={15} />
        <span style={{color: "red"}}>{this.state.phoneerror}</span>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Name</Label>
          <Input type="text" name="name" id="exampleName" onChange={this.changeHandler} value={this.state.name}
           placeholder="Enter Lecturer Name"   required/>
        <span style={{color: "red"}}>{this.state.nameerror}</span>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Address</Label>
          <Input type="text" name="address" id="exampleAddress" onChange={this.changeHandler}
           value={this.state.address} required
          placeholder="Enter your address" />
        <span style={{color: "red"}}>{this.state.addresserror}</span>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Nationality</Label>
          <Input type="text" name="nationality" id="exampleName" 
          onChange={this.changeHandler} value={this.state.nationality}
           placeholder="Please enter your nationality" required />
        <span style={{color: "red"}}>{this.state.nationalityerror}</span>
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
        <span style={{color: "red"}}>{this.state.facultyerror}</span>

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
          <span style={{color: "red"}}>{this.state.moduleerror}</span>
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
        <span style={{color: "red"}}>{this.state.gendererror}</span>
          
        </FormGroup>
        <FormGroup>
       <Label>DOB</Label>
        <Input type='Date' name='DOB' onChange={this.changeHandler} value={this.state.DOB} 
        ></Input>
        <span style={{color: "red"}}>{this.state.DOBerror}</span>
       </FormGroup>
       
        <Button color='primary' type='submit'  block>Submit</Button>
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

