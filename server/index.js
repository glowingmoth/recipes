import express from "express";
import multer from "multer";
import cors from "cors";
import "dotenv/config";
import streamifier from "streamifier";

import db from "./db/connection.js";
import cloudinary from "./cloud-connection/cloudinaryConfig.js";

const app = express();

app.use(cors());
app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const port = 3000;

app.get("/", async (req, res) => {
  let collection = db.collection("recipes");
  let result = await collection.find({}).toArray();
  res.send(result);
});

app.post("/recipe", upload.single("photo"), async (req, res) => {
  const { body, file } = req;
  try {
    if (file) {
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) return reject(error);
            return resolve(result);
          });
          streamifier.createReadStream(file.buffer).pipe(stream);
        });

      const result = await streamUpload();
      body.imageUrl = result.secure_url; // The secure image url from cloudinary
    }

    await db.collection("recipes").insertOne(body);

    res.status(200).json({ message: "Recipe created" });
  } catch (error) {
    console.error("Error in POST /recipe:", error);
    res.status(500).send("Error processing recipe");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
