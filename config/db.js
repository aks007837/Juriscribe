import mongoose from "mongoose";
import colors from 'colors';
const connectDB = (url)=>{
    mongoose.set('strictQuery', true);

    mongoose.connect(url).then(()=>console.log("MongoDB connected".bgGreen.bold)).catch((err)=>console.log(err))
}
export default connectDB;