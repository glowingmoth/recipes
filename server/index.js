import express from "express";
import cors from "cors";

import db from "./db/connection.js";

const app = express();
app.use(cors());
const port = 3000;

// Used this to insert placeholder into DB

// db.collection("recipes").insertOne({
//   title: "Gluten Free Pancakes",
//   author: "John S.",
//   servings: 6,
//   ingredients: [
//     { name: "gluten free flour", amount: "200g" },
//     { name: "egg", amount: "1" },
//     { name: "egg whites", amount: "200g" },
//     { name: "milk", amount: "500ml" },
//     { name: "psyllium husk", amount: "1 Tbsp" },
//     { name: "butter", amount: "2 Tbsp" },
//   ],
//   description:
//     "Light and fluffy and easy to make! This is an absolute family favourite. Top with a sweet spread of your choice, like maple syrup or jam.",
//   instructions: [
//     "In a large mixing bowl add the flour, eggs, milk and psyllium husk.",
//     "Use a handheld mixer or equivalent to mix all the ingredients in the bowl until smooth.",
//     "Heat a frying pan on low to medium heat and add 1 tsp of butter.",
//     "Once the pancake batter is smooth and slightly thick, use a scoop to pour the batter into the pan.",
//     "Let batter start to bubble before flipping, usually a 1-2 minutes.",
//   ],
//   tags: ["pasta", "italian", "quick"],
//   createdAt: "2025-05-28T12:00:00Z",
// });

app.get("/", async (req, res) => {
  let collection = db.collection("recipes");
  let result = await collection.find({}).toArray();
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
