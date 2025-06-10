export default function RecipeCard(props) {
  const { recipe } = props;

  return (
    <div className="recipeCard">
      <img
        src={recipe.imageUrl}
        className="cardImage"
        alt="Pancakes stacked on a plate"
      ></img>
      <div className="content">
        <h2>{recipe.title}</h2>
        <p>{recipe.description}</p>
      </div>
      <div className="bottom">
        <span>Author: {recipe.author}</span>
        <span>Created: {recipe.createdAt}</span>
      </div>
      <p>Serves: {recipe.servings}</p>
      Ingredients:
      {Array.isArray(recipe.ingredients) && // TODO: Implement validation for the form to prevent this hack when form submission.
        recipe.ingredients.map(({ name, amount }) => (
          <ul key={name}>
            <span>{name}</span>: <span>{amount}</span>
          </ul>
        ))}
      <div>
        Instructions:{" "}
        {Array.isArray(recipe.instructions) && // TODO: Implement validation for the form to prevent this hack when form submission.
          recipe.instructions.map((step, idx) => <p key={idx}>{step}</p>)}
      </div>
    </div>
  );
}
