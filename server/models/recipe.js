import mongoose from "mongoose";
const { models, Schema } = mongoose;

const RecipeSchema = new Schema({
  title: { type: String, required: true },
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  author: { type: String, required: true },
  servings: { type: Number, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  ingredients: {
    type: [
      {
        name: { type: String, required: true },
        amount: { type: String, required: true },
      },
    ],
    required: true,
  },
  instructions: { type: [String], required: true },
  meal: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner", "Dessert"],
    required: true,
  },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Recipe = models.Recipe || mongoose.model("Recipe", RecipeSchema);

export default Recipe;
