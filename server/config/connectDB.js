import mongoose from "mongoose";
const ConnectDB = async () => {
  // represents the state
    mongoose.connection.on("connected", () => {
      console.log("DB CONNECTED");
    });
  
    await mongoose.connect(`${process.env.HOST}/shopDb`);
  };

  export default ConnectDB