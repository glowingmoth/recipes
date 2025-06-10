import express from "express";
import multer from "multer";
import cors from "cors";
import "dotenv/config";
import streamifier from "streamifier";

import db from "./db/connection.js";
import cloudinary from "./cloud-connection/cloudinaryConfig.js";
import { ObjectId } from "mongodb";

const app = express();

app.use(cors());
app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const port = 3000;

// READ all
app.get("/recipes", async (req, res) => {
  try {
    let collection = db.collection("recipes");
    let result = await collection.find({}).toArray();
    res.status(200).send(result);
  } catch (error) {
    console.log("Failed to fetch recipes:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// READ single
app.get("/recipes/:recipeId", async (req, res) => {
  try {
    let collection = db.collection("recipes");
    let result = await collection
      .find({ _id: new ObjectId(req.params.recipeId) })
      .toArray();
    res.status(200).res.send(result);
  } catch (error) {
    console.log("Failed to fetch single recipe:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// CREATE
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

    res.status(201).json({ message: "Recipe created" });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).send("Internal server error");
  }
});

// DELETE
app.delete("/recipes/:recipeId", async (req, res) => {
  try {
    let collection = db.collection("recipes");
    let result = await collection.deleteOne({
      _id: new ObjectId(req.params.recipeId),
    });
    res.status(204).send(result); // TODO: Do I need the result here?
  } catch (error) {
    console.log("Failed to delete recipe:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
