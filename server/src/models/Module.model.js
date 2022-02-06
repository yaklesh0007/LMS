const mongoose= require('mongoose');
const ModuleModel=mongoose.model('ModuleModel',{
    module_name:{
        type:String,
        require:true,
        unique:true
    },
    Faculty_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'FacultyModel'
    }
})
module.exports=ModuleModel