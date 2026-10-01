import { useState } from "react";
import "./App.css";





function App() {

  const [text, setText] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleSearch() {
    if (text === "") {
      return;
    }
    setLoading(true);



    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.meals || []);
        setLoading(false);
      })
    console.log(text);

  }

  return (
    <div>
      <h1>Recipe Finder</h1>
      <p>Find your favorite recipes!</p>

      <input className="search-input" value={text} onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

      <button onClick={handleSearch}>
        Search </button>


      <div className="recipe-grid">

        {loading ? (
          <p>Loading...</p>
        ) : recipes.length > 0 ? (
          recipes.map(function (recipe) {
            return (
              <div className="recipe-card" key={recipe.idMeal}>
                <img src={recipe.strMealThumb} />
                <p>{recipe.strMeal}</p>
                <a className="recipe-button" href={recipe.strYoutube} target="_blank">
                  View Recipe
                </a>
              </div>


            );
          })

        ) : (
          <p>No recipes found.</p>
        )}

      </div>
    </div>
  );
}



export default App;
