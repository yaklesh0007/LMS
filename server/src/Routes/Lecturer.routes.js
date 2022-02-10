const express=require('express')
const {check,validationResult}=require('express-validator')
const LecturerModel=require('../models/Lecturer.model')
const LecturerRouter=express.Router()
LecturerRouter.get('/',(req,res)=>{
    const limit=req.body.limit||5
    const page=req.body.page||1
    const skip=(page-1)*limit
    LecturerModel.find().skip(skip).limit(limit)
    .then(data=>{
        res.status(200).json({data,success:true})
    })
    .catch(err=>{
        res.status(404).json({err,success:false})
    })
})
LecturerRouter.get('/all',(req,res)=>{
    LecturerModel.find()
    .then(data=>{
        res.status(200).json({data,success:true})
    })
    .catch(err=>{
        res.status(404).json({err,success:false})
    })
})
LecturerRouter.post('/',[
    check('email',"Email is Empty").not().isEmpty(),
    check('email',"Please valid email address").isEmail(),
    check('phone',"Phone number is required!!").not().isEmpty(),
    check('phone',"Phone number should not be less than 10 number or more than 13 number").isLength({min:10,max:14}),
    check('address',"address must not be empty").not().isEmpty(),
    check('address',"address must not be more than 25 letter").isLength(),
    check('gender',"You must select one gender").not().isEmpty(),
    check('nationality',"Nationality must not be empty!!").not().isEmpty(),
    check('nationality',"nationality must be more than 4 word").isLength({min:4}),
    check('DOB',"DOB must not be empty!!").not().isEmpty()
]
,(req,res)=>{

    const errors=validationResult(req)
    
    if(errors.isEmpty()){
        let modules=req.body.modules 
        let lecturers=req.body
        
        const name=lecturers.name
        const email=lecturers.email
        const phone=lecturers.phone
        const gender=lecturers.gender
        const DOB=new Date(lecturers.DOB)
        const address=lecturers.address
        const nationality=lecturers.nationality
        const Faculty_id=lecturers.Faculty_id
        const data=new LecturerModel({
            email:email,
            phone:phone,
            gender:gender,
            DOB:DOB,
            address:address,
            nationality:nationality,
            Faculty_id:Faculty_id,
            modules:modules,
            name:name
        })
        data.save()
        .then(()=>{
            res.status(201).json({success:true,data})
        })
        .catch(err=>{
            res.status(400).json({err,success:false})
            console.log(err)
        })
        
    }
    else{
        res.status(400).json({errors,success:false})
        console.log(errors)
    }

})


module.exports=LecturerRouter