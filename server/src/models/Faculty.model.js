const mongoose=require('mongoose');
const FacultyModel=mongoose.model('FacultyModel',{
    faculty_name:{
        type:String,
        require:true,
        unique:true
    }
})
module.exports=FacultyModel