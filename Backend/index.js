const express = require('express');
const path = require('path');
require('dotenv').config(); 
const PORT = process.env.PORT || 1000;
const cors = require('cors');

const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());


app.use("/files", express.static(path.join(__dirname, "./files"))); // Serve uploaded files statically

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true }));


const connectDB = require('./config/db');
const authRouter= require('./routers/authroute');


connectDB();

app.use('/api/auth', authRouter);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));