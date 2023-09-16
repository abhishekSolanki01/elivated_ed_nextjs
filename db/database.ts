import mongoose from "mongoose";

const CONNECTION_STRING = `mongodb+srv://abhishek:12345@cluster0.pcghker.mongodb.net/?retryWrites=true&w=majority`

// track the connection
let isConnected = false;
export const connectToDataBase = async () => {
  // mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("DB connected already");
    return;
  }
  try {
    await mongoose.connect(CONNECTION_STRING, {
      dbName: "courses",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Db connection established");
    
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
