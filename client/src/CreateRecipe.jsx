import { useState } from "react";

export default function CreateRecipe() {
  const [ingredientArray, setIngredientArray] = useState([1]);
  const [instructionsArray, setInstructionsArray] = useState([1]);

  function incrementIngredientCount(event) {
    event.preventDefault();
    setIngredientArray([...ingredientArray, ingredientArray.length + 1]);
  }

  function incrementInstructionsCount(event) {
    event.preventDefault();
    setInstructionsArray([...instructionsArray, instructionsArray.length + 1]);
  }

  function decrementIngredientCount(event) {
    event.preventDefault();
    if (ingredientArray.length === 1) return;

    setIngredientArray(
      ingredientArray.filter(
        (ingredientNumber) =>
          ingredientNumber !== parseInt(event.target.id.match(/\d+/))
      )
    );
  }

  function decrementInstructionsCount(event) {
    event.preventDefault();
    if (instructionsArray.length === 1) return;

    setInstructionsArray(
      instructionsArray.filter(
        (stepNumber) => stepNumber !== parseInt(event.target.id.match(/\d+/))
      )
    );
  }

  const hasMultipleIngredients = ingredientArray.length > 1;
  const hasMultipleInstructions = instructionsArray.length > 1;

  return (
    <form>
      <h2>Create Recipe</h2>
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
        <input
          type="number"
          name="servings"
          id="servings"
          min="1"
          max="12"
        ></input>
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <textarea name="description"></textarea>
      </div>
      <div>
        Ingredients:
        <div>
          {ingredientArray.map((ingredientNumber) => {
            const id = `ingredient-${ingredientNumber}`;
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
        Instructions
        {instructionsArray.map((stepNumber, index) => {
          const id = `step-${stepNumber}-${Date.now()}`;
          return (
            <div key={id}>
              <label htmlFor="instructions">Step ({index + 1}):</label>
              <input name="instructions"></input>
              {hasMultipleInstructions && (
                <button id={id} onClick={decrementInstructionsCount}>
                  Remove Step
                </button>
              )}
            </div>
          );
        })}
        <button onClick={incrementInstructionsCount}>Add Step</button>
      </div>
    </form>
  );
}
