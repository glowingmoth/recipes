import express from "express";
import cors from "cors";

import db from "./db/connection.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.get("/", async (req, res) => {
  let collection = db.collection("recipes");
  let result = await collection.find({}).toArray();
  res.send(result);
});

app.post("/recipe", async (req, res) => {
  const { body } = req;

  try {
    let newDocument = { ...body };
    await db.collection("recipes").insertOne(newDocument);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding record");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
