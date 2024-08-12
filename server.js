const express = require("express");
const app = express()
app.use(express.json())
const fileupload = require("express-fileupload")
const mongoose = require("mongoose")
const cors = require("cors");
app.use(cors())
app.use(fileupload())

const taskRoutes = require("./routes/task")
 const authRoutes =require("./routes/Auth")
 const UsertaskRoutes = require("./routes/Usertask")
mongoose.connect("mongodb://localhost:27017/task-app");

app.use("/uploads",express.static('uploads'))
app.use("/task",taskRoutes)
app.use("/auth",authRoutes)
app.use("/user/task",UsertaskRoutes)

//here we saying  then /todo go to todo routes file


app.listen(7000, () => {
    console.log("server is running on port 7000")})