const express=require('express')
const FacultyRouter=express.Router()

const FacultyModel=require('../models/Faculty.model')
FacultyRouter.get('/',(req,res)=>{
    const limit=req.body.limit||5
    const page=req.body.page||1
    const skip=(page-1)*limit
    FacultyModel.find().skip(skip).limit(limit)
    .then(data=>{
        res.status(200).json({data,success:true})
    })
    .catch(err=>{
        res.status(404).json({err,success:false})
    })
})

FacultyRouter.get('/all',(req,res)=>{
    
    FacultyModel.find()
    .then(data=>{
        res.status(200).json({data,success:true})
    })
    .catch(err=>{
        res.status(404).json({err,success:false})
    })
})

FacultyRouter.post('/save',(req,res)=>{
    if(req.body.faculty_name==null){
        return res.status(401).json({message:'Faculty name is required!!'})
    }
    else if(req.body.faculty_name.lenght>25){
        return res.status(401).json({message:'Faculty name is too large!!'})
    }
    else{
        const faculty_name=req.body.faculty_name
        const data=new FacultyModel({
            faculty_name:faculty_name
        })
        data.save()
        .then(()=>{
            res.status(201).json({data,success:true})
        })
        .catch((err)=>{
            res.status(400).json({err,success:false})
        })
    }
})

module.exports=FacultyRouter