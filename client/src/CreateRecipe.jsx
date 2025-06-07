import { useRef, useState } from "react";

export default function CreateRecipe() {
  const [ingredientArray, setIngredientArray] = useState([1]);
  const [instructionsArray, setInstructionsArray] = useState([1]);
  const photoInputRef = useRef(null);

  const initialFormFields = {
    title: "",
    author: "",
    servings: 0,
    description: "",
    ingredients: [{ name: "", amount: "" }],
    instructions: [""],
    photo: null,
  };

  const [formFields, setFormFields] = useState(initialFormFields);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleChangeIngredients(index, name, value) {
    const updated = ingredientArray.map((_, idx) => {
      return idx === index
        ? { ...formFields.ingredients[idx], [name]: value }
        : formFields.ingredients[idx];
    });

    setFormFields((prev) => ({
      ...prev,
      ingredients: updated,
    }));
  }

  function handleChangeInstructions(index, value) {
    const updated = instructionsArray.map((_, idx) => {
      return idx === index ? value : formFields.instructions[idx];
    });

    setFormFields((prev) => ({
      ...prev,
      instructions: updated,
    }));
  }

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

  async function handleCreateRecipe(e) {
    console.log("handleCreateRecipe");
    e.preventDefault();
    const formData = new FormData();

    Object.entries(formFields).forEach(([key, value]) => {
      if (key !== "photo") {
        // if 'photo' is the file input field
        formData.append(key, value);
      }
    });

    if (formFields.photo !== null) formData.append("photo", formFields.photo);

    // const formData = new FormData(document.getElementById("createRecipeForm"));

    try {
      console.log("inside try");
      const response = await fetch("http://localhost:3000/recipe", {
        method: "POST",
        body: formData,
      });
      console.log("response status", response.status);
      if (response.ok) {
        console.log("response was ok");
        setFormFields(initialFormFields);
        clearFileInput();
      } else {
        console.log("Failed to create recipe");
      }
    } catch (error) {
      console.log("inside error");
      console.error(error);
    }
  }

  function clearFileInput() {
    if (photoInputRef.current) {
      photoInputRef.current.value = null; // clears the selected file
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFormFields((prev) => ({
      ...prev,
      photo: file || null,
    }));
  }

  const hasMultipleIngredients = ingredientArray.length > 1;
  const hasMultipleInstructions = instructionsArray.length > 1;

  return (
    <form
      id="createRecipeForm"
      action="http://localhost:3000/recipe"
      method="post"
    >
      <h2>Create Recipe</h2>
      <label htmlFor="photo">Choose recipe photo:</label>
      <input
        ref={photoInputRef}
        id="photo"
        type="file"
        name="photo"
        onChange={handleFileChange}
        accept="image/*"
      ></input>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          onChange={handleChange}
          value={formFields.title}
        ></input>
      </div>
      <div>
        <label htmlFor="author">Author: </label>
        <input
          name="author"
          onChange={handleChange}
          value={formFields.author}
        ></input>
      </div>
      <div>
        <label htmlFor="servings">Servings: </label>
        <input
          type="number"
          name="servings"
          id="servings"
          min="1"
          max="12"
          onChange={handleChange}
          value={formFields.servings}
        ></input>
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <textarea
          name="description"
          onChange={handleChange}
          value={formFields.description}
        ></textarea>
      </div>
      <div>
        Ingredients:
        <div>
          {ingredientArray.map((ingredientNumber, index) => {
            const id = `ingredient-${ingredientNumber}`;
            return (
              <div key={id}>
                <label htmlFor="name">Name: </label>
                <input
                  name="name"
                  onChange={(e) => {
                    handleChangeIngredients(index, "name", e.target.value);
                  }}
                  value={formFields.ingredients[index]?.name || ""}
                ></input>
                <label htmlFor="amount">Amount: </label>
                <input
                  name="amount"
                  onChange={(e) =>
                    handleChangeIngredients(index, "amount", e.target.value)
                  }
                  value={formFields.ingredients[index]?.amount || ""}
                ></input>
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
        <div>
          {instructionsArray.map((index) => {
            const id = `step-${index}`;
            return (
              <div key={id}>
                <label htmlFor="instructions">Step ({index + 1}) </label>
                <input
                  name="instructions"
                  onChange={(e) =>
                    handleChangeInstructions(index, e.target.value)
                  }
                  value={formFields.instructions[index]}
                ></input>
                {hasMultipleInstructions && (
                  <button id={id} onClick={decrementInstructionsCount}>
                    Remove Step
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <button onClick={incrementInstructionsCount}>Add Step</button>
      </div>
      <button onClick={handleCreateRecipe}>Create Recipe</button>
    </form>
  );
}
