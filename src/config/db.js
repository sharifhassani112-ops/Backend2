import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function connectedDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI )
        console.log("MonoDb connected Successfull!");
        
    } catch (error) {
        console.error(error)
        process.exit(-1);
        
    }
}
export default connectedDb