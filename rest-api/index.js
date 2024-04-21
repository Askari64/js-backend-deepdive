const express = require("express");
const { connectMongoDB } = require("./views/connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

//Connection
connectMongoDB("mongodb://127.0.0.1:27017/rest-api-mongo-learning").then(()=> console.log('🟢 MongoDB Connected'));

//Middleware
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log("🟢 Server Started"));
