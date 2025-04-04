import mongoose from "mongoose";

const connectDB = async () => {
    try{
            const ConnectionInstacne = await mongoose.connect(`${process.env.MONGODB_URI}`);
            console.log(`MongoDB connected: ${ConnectionInstacne.connection.host}`);
    }catch(err){
        console.log(`MongoDB connection Error: ${err.message}`);
        process.exit(1);
    }
};

export {connectDB}