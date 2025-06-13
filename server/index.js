import express from "express";
import multer from "multer";
import cors from "cors";
import "dotenv/config";
import streamifier from "streamifier";

import connectToDB from "./db/connection.js";
import cloudinary from "./cloud-connection/cloudinaryConfig.js";
import Recipe from "./models/recipe.js";

connectToDB();

const app = express();

app.use(cors());
app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const port = 3000;

// READ all
app.get("/recipes", async (req, res) => {
  try {
    let result = await Recipe.find({});
    res.status(200).send(result);
  } catch (error) {
    console.log("Failed to fetch recipes:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// READ single
app.get("/recipes/:recipeId", async (req, res) => {
  try {
    let result = await Recipe.find({ _id: req.params.recipeId });
    res.status(200).send(result);
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

    const newRecipe = new Recipe(req.body);
    await newRecipe.save();

    res.status(201).json({ message: "Recipe created" });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).send("Internal server error");
  }
});

// DELETE
app.delete("/recipes/:recipeId", async (req, res) => {
  try {
    const result = await Recipe.deleteOne({ _id: req.params.recipeId }); // TODO: need this assigned to result?
    res.status(204).json({ message: "Recipe sucessfully deleted" });
  } catch (error) {
    console.log("Failed to delete recipe:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// UPDATE
app.put("/recipes/:recipeId", upload.single("photo"), async (req, res) => {
  const { body, file, params } = req;
  const { recipeId } = params;

  const updateData = { ...body }; // Shallow copy to prevent mutating original request body
  delete updateData._id; // Do this to prevent updating an existing id

  const existingRecipe = await Recipe.findById(recipeId);

  try {
    if (!existingRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

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
      body.imageUrl = result.secure_url;

      await cloudinary.uploader.destroy(existingRecipe.imageUrl);
    }

    Object.assign(existingRecipe, updateData);
    await existingRecipe.save();

    res.status(200).json({ message: "Recipe updated" });
  } catch (error) {
    console.error("Failed to update recipe", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
