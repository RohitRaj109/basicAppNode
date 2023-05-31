import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'
import connectDB from './config/connectiondb.js'
import userRoutes from './routes/userRouts.js';

import mongoose  from 'mongoose';
import bodyParser from 'body-parser';
const app = express();
const port = process.env.PORT;

const DATABASE_URL = process.env.CONNECTION_STRING
connectDB(DATABASE_URL)
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
//load routes
app.use('/api/user',userRoutes)
app.get('',(req,res)=>{
    res.send('success');
})
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
})