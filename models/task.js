const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    taskName:String,
    taskDesc:String,
    status:String,
    assigned:{
        type:Boolean,
        required:true
    }
    
})

const Taskmodels = mongoose.model("task",TaskSchema)
module.exports={Taskmodels}