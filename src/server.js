import express from "express";
import { connectedDb } from "./config/db.js";
const app = express();
connectedDb().then(()=>{
    app.listen(5000,()=>{
    console.log("server is running on localhost:5000")
})
})
