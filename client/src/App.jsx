import { useEffect, useState } from "react";

import "./App.css";
import CreateRecipe from "./CreateRecipe";
import RecipeCard from "./recipeCard";

function App() {
  const [fetchedRecipes, setFetchedRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/recipes")
      .then((response) => response.json())
      .then((data) => {
        setFetchedRecipes(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="app">
      <h1>Family Recipes</h1>
      {fetchedRecipes.map((recipe) => (
        <div key={recipe._id}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
      <CreateRecipe />
    </div>
  );
}

export default App;
