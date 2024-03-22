const express = require("express");
const UsertaskModel = require("../models/Usertask")
const router = express.Router();
const mongoose = require("mongoose");

const Taskmodels = require("../models/task");
const Authmodel = require("../models/Auth");
const userTask = require("../models/Usertask");



router.get("/myTask/:userId",async function(req,res){
    let myTasks = await UsertaskModel.find({userId:req.params.userId}).populate("taskId","taskName taskDesc").exec();
    res.send(myTasks)
})
router.get("/:userId/byStatus/:status",async function(req,res){
    const {status} = req.params;
    if(status==="All"){
        let tasks = await UsertaskModel.find({userId:req.params.userId}).populate("taskId","taskName taskDesc").exec();
       return res.send(tasks)
    }else{
        let tasks = await UsertaskModel.find({$and:[{userId:req.params.userId},{status:req.params.status}]}).populate("taskId","taskName taskDesc").exec();
        return res.send(tasks)
    }
})


router.post("/assigntask", async function (req, res) {
    const { taskId, userId ,status } = req.body
    const task = await Taskmodels.Taskmodels.findById(taskId);
    const user = await Authmodel.Authmodel.findById(userId);

    if (task && user) {
        const newUsertask = new UsertaskModel(req.body);
        const createdUsertask = await newUsertask.save();
        
        task.assigned = true;
        task.save();
        res.send(createdUsertask)
    } else {
        res.send("user not exist")
    }
})
router.put("/completeTask", async function(req,res){
    const {id,status} = req.body
    const updatedTask = await UsertaskModel.updateOne({_id:new mongoose.Types.ObjectId(id)},{status:status})
    res.send(updatedTask)
})

module.exports = router