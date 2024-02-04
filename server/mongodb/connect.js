import mongoose from "mongoose";

const connectDB = async (url) => {
    try {
        await mongoose.connect(url);

        console.log('DB connected successfully');
    } catch (err) {
        console.error(`DB cannot connect: ${err}`);
    }
};

export default connectDB;
