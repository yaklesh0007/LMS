const express=require('express')
const ModuleRouter=express.Router()
const {check,validationResult}=require('express-validator')
const ModuleModel=require('../models/Module.model')
ModuleRouter.get('/all',(res,req)=>{
    ModuleModel.find()
    .then(data=>{
        res.status(200).json({data,success:true})
    })
    .catch(err=>{
        res.status(404).json({err,success:false})
    })
})

ModuleRouter.get('/',(req,res)=>{
    const limit=req.body.limit||5
    const page=req.body.page||1
    const skip=(page-1)*limit
    ModuleModel.find().skip(skip).limit(limit)
    .then(data=>{
        res.status(200).json({data,success:true})
    })
    .catch(err=>{
        res.status(404).json({err,success:false})
    })
})
ModuleRouter.post('/save',[
    check('module_name',"Module name is required !!").not().isEmpty(),
    check('module_name',"Module name Lenght must be more than or equal to 4").isLength({min:4})
],(req,res)=>{
    const errors=validationResult(req);

    if(errors.isEmpty()){
        const module_name=req.body.module_name
        const Faculty_id=req.body.Faculty_id

        const data=new ModuleModel({
            module_name:module_name,
            Faculty_id:Faculty_id
        })
        data.save()
        .then(()=>{
            res.status(201).json({data,success:true})
        })
        .catch((err)=>{
            res.status(400).json({err,success:false})
        })
    }
    else{
        res.status(400).json(errors.array())
    }

})

module.exports=ModuleRouter