import mongoose from "mongoose";

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(
         "mongodb+srv://Abbos:teDzzxP6Q730IalD@cluster0.icji5b5.mongodb.net/ECommerUd?retryWrites=true&w=majority"
      );

      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
   } catch (error) {
      console.error(`Error: ${error.message}`.red.underline.bold);
      process.exit(1);
   }
};

export default connectDB;
