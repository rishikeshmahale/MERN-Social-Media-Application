import mongoose from "mongoose";

const connectDB = async (req, res) => {
    try{

        await mongoose.connect(process.env.MONGO_URL);

        console.log("Database Connected Successfully")
        
    }catch(error){
        console.log("Database Error")

        return res.status(500).json({error : error.message});
    }
}

export default connectDB;