const express = require("express");

const router = express.Router();

const todos = [
     
]


router.get("/list",function(req,res){
    res.send(todos)
})


router.post("/create",function(req,res){
    console.log(req.body)
    
    todos.push(({taskdescription:req.body.taskdescription,taskname:req.body.taskname,sno:todos.length ? todos.length+1:1}))
    res.send("coming soon create todos")
})

module.exports = router