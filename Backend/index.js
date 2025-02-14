const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); 
const PORT = process.env.PORT || 1000;
const cors = require('cors');

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const connectDB = require('./config/db');
const authRouter= require('./routers/authroute');


connectDB();

app.use('/api/auth', authRouter);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));