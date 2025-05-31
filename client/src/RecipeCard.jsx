export default function RecipeCard() {
  // TODO: Replace this dummy data once DB connected properly
  const recipe = {
    title: "Gluten Free Pancakes",
    author: "John S.",
    servings: 6,
    ingredients: [
      { name: "gluten free flour", amount: "200g" },
      { name: "egg", amount: "1" },
      { name: "egg whites", amount: "200g" },
      { name: "milk", amount: "500ml" },
      { name: "psyllium husk", amount: "1 Tbsp" },
      { name: "butter", amount: "2 Tbsp" },
    ],
    instructions: [
      "In a large mixing bowl add the flour, eggs, milk and psyllium husk.",
      "Use a handheld mixer or equivalent to mix all the ingredients in the bowl until smooth.",
      "Heat a frying pan on low to medium heat and add 1 tsp of butter.",
      "Once the pancake batter is smooth and slightly thick, use a scoop to pour the batter into the pan.",
      "Let batter start to bubble before flipping, usually a 1-2 minutes.",
    ],
    tags: ["pasta", "italian", "quick"],
    createdAt: "2025-05-28T12:00:00Z",
  };

  return (
    <div className="recipeCard">
      <div className="cardImage"></div>

      <h2>{recipe.title}</h2>
      <div className="bottom">
        <span>Author: {recipe.author}</span>
        <span>Created: {recipe.createdAt}</span>
      </div>

      {/* <p>Serves: {recipe.servings}</p> */}
      {/* Ingredients: */}
      {/* {recipe.ingredients.map(({ name, amount }) => (
          <ul key={name}>
            <span>{name}</span>: <span>{amount}</span>
          </ul>
        ))} */}
      {/* <div>
          Instructions:{" "}
          {recipe.instructions.map((step, idx) => (
            <p key={idx}>{step}</p>
          ))}
        </div> */}
    </div>
  );
}
