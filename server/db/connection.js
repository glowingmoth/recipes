import mongoose from "mongoose";

async function connectToDB() {
  try {
    if (!process.env.ATLAS_URI) {
      throw new Error("ATLAS_URI is not defined in environment variables.");
    }

    await mongoose.connect(process.env.ATLAS_URI);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.log("Error connecting to DB: ", error.message);
  }
}

export default connectToDB;
