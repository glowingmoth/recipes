import { useState } from "react";

export default function CreateRecipe() {
  const [ingredientArray, setIngredientArray] = useState([1]);

  function incrementIngredientCount(event) {
    event.preventDefault();
    setIngredientArray([...ingredientArray, ingredientArray.length + 1]);
  }

  function decrementIngredientCount(event) {
    console.log({ id: event.target.id, ingredientArray });

    event.preventDefault();
    if (ingredientArray.length === 1) return;

    setIngredientArray(
      ingredientArray.filter(
        (ingredientNumber) => ingredientNumber !== parseInt(event.target.id)
      )
    );
  }

  const hasMultipleIngredients = ingredientArray.length > 1;

  return (
    <form>
      <div>
        <label htmlFor="title">Title: </label>
        <input name="title"></input>
      </div>

      <div>
        <label htmlFor="author">Author: </label>
        <input name="author"></input>
      </div>

      <div>
        <label htmlFor="servings">Servings: </label>
        <input name="servings"></input>
      </div>

      <div>
        <label htmlFor="description">Description: </label>
        <textarea name="description"></textarea>
      </div>

      <div>
        Ingredients:
        <div>
          {ingredientArray.map((ingredientNumber) => {
            const id = ingredientNumber;
            return (
              <div key={id}>
                <label htmlFor="name">Name: </label>
                <input name="name"></input>
                <label htmlFor="amount">Amount: </label>
                <input name="amount"></input>
                {hasMultipleIngredients && (
                  <button id={id} onClick={decrementIngredientCount}>
                    Remove Ingredient
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <button onClick={incrementIngredientCount}>Add Ingredient</button>
      </div>

      <div>
        <label htmlFor="instructions">Instructions: </label>
        <input name="instructions"></input>
      </div>
    </form>
  );
}
