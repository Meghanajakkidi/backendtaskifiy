const express = require("express");
const app = express()
app.use(express.json())
const mongoose = require("mongoose")
const cors = require("cors");
app.use(cors())
const todoRoutes = require("./routes/todos")
const taskRoutes = require("./routes/task")
 const authRoutes =require("./routes/Auth")
 const UsertaskRoutes = require("./routes/Usertask")
mongoose.connect("mongodb://localhost:27017/task-app");


app.use("/task",taskRoutes)
app.use("/auth",authRoutes)
app.use("/user/task",UsertaskRoutes)

//here we saying  then /todo go to todo routes file
app.use("/todos", todoRoutes)
 

app.listen(7000, () => {
    console.log("server is running on port 7000")})