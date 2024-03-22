const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const Taskmodels = require("../models/task");

router.get("/summary",async function(req, res){
   let TotalCount = await Taskmodels.Taskmodels.find({}).count();
   let InProgressCount = await Taskmodels.Taskmodels.find({status:"inprogress"}).count();
   let CompletedCount = await Taskmodels.Taskmodels.find({status: "completed"}).count();
   let NotStartedCount = await Taskmodels.Taskmodels.find({status: "not_started"}).count();
   res.send({TotalCount, InProgressCount, CompletedCount, NotStartedCount});
});



router.get("/all", async function(req,res){
   let tasks = await Taskmodels.Taskmodels.find({assigned:{"$ne":"true"}})
 // res.status(200).json(tasks)
  res.send(tasks)
})


router.post("/create",async function(req,res){
   console.log(req.body)
   
   const newTaskdata =   new Taskmodels.Taskmodels({...req.body,assigned:false})
   const createddata =    await newTaskdata.save();
   res.send(createddata)
})

router.delete("/:id", async function(req,res){
   console.log(req.params)
   
   const{id}=req.params;
   console.log(typeof(id))
   const deletedData= await Taskmodels.Taskmodels.findByIdAndDelete(id);
   res.send("data deleted sucessfully")
})

router.get("/:id",async function(req,res){
   const{id}=req.params;
   console.log(typeof(id))
   const getData = await Taskmodels.Taskmodels.findById(id);
   res.send(getData)
})

router.put("/update/:id", async function(req,res){
   console.log(req.params)
   
   const{id}=req.params;
   
   const updatedata = await Taskmodels.Taskmodels.updateOne({_id:new  mongoose.Types.ObjectId(id)},{... req.body});
   res.send(updatedata)
})
router.get("/:bystatus/:status",async function(req,res){
   const{status}=req.params;
   if(status==="Alltasks"){
      const getData = await Taskmodels.Taskmodels.find({});
       return res.send(getData)
   }else{
      const getData = await Taskmodels.Taskmodels.find({status:status});
       return res.send(getData)
   }
   
   
})


module.exports = router