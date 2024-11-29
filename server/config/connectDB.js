import mongoose from "mongoose";
const ConnectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB CONNECTED");
  });
  // represents the state
   try{
    await mongoose.connect(`${process.env.HOST}/shopDb`);
   }catch(err){
    console.log(err.message)
   }
  };

  export default ConnectDB