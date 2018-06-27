$(document).ready(function(){
  // Get recipes and recipe index to get selected recipe information
  const recipes = JSON.parse(localStorage.getItem('recipes'));
  const recipeIndex = localStorage.getItem('recipeIndex');
  const recipe = recipes[recipeIndex];
  console.log(recipe);
  // Creates an image with the source from the recipe object and appends it to the food-img-holder div
  let foodImg = $(`<img class="food-img" src=${recipe.image} />`);
  $('.food-img-holder').append(foodImg);

  //Make the recipe title and clickable source so the user can go get directions for how to make the recipe
  let recipeTitle = $(`<h1>${recipe.label}</h1>`);
  let recipeSource = $(`<p class="source">Source: <a href=${recipe.url} target="_blank">${recipe.source}</a></p>`);

  // Calculate the total servings and calories/serving
  let totalCalories = recipe.calories;
  let totalServings = recipe.yield;
  let caloriesPerServing = Math.ceil(totalCalories/totalServings);
  let recipeNutrition = $(`<p class="info">Yields: ${totalServings} servings, ${caloriesPerServing} calories/serving</p>`);

  //Appending the above information to the recipe-info div
  $('.recipe-info').append(recipeTitle);
  $('.recipe-info').append(recipeSource);
  $('.recipe-info').append(recipeNutrition);

  // Two for loops that go through health labels and diet labels, create Materialize chips and append it to the recipe-info div
  for(let j = 0; j < recipe.healthLabels.length; j++){
    let healthLabel = $(`<div class="chip">${recipe.healthLabels[j]}</div>`)
    $('.recipe-info').append(healthLabel)
  }
  for(let j = 0; j < recipe.dietLabels.length; j++){
    let dietLabel = $(`<div class="chip">${recipe.dietLabels[j]}</div>`)
    $('.recipe-info').append(dietLabel)
  }

  // Go through the ingredient list and append each ingredient to the ingredient-list div
  for(let i = 0; i < recipe.ingredientLines.length; i++){
    $('.ingredient-list').append(`<p>${recipe.ingredientLines[i]}</p>`)
  }

})
