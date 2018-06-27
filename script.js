// When the page has loaded...
$(document).ready(function() {
  // API app ID and key from signing up for Edamam API
 const appID = 'dc9aa832';
 const appKey = 'c94cf88a08d801e51606d9224083c9a8';
//When the search button is clicked on...
 $('.search-icon').click(function() {
   // Go get the value of whatever is inside the search box
  let searchQuery = $('#search').val();
  // Make a new array to hold recipes
  let recipes = [];
  searchAPI(searchQuery).then(function(result) {
    //Put only recipe object information into recipes array
   for (let i = 0; i < result.hits.length; i++) {
    recipes.push(result.hits[i].recipe);
   }
   //Stores the array of recipes into localStorage as a String
   localStorage.setItem('recipes', JSON.stringify(recipes));

   for (let j = 0; j < recipes.length; j++) {
     console.log(recipes[j]);
    let recipeCard = $(`<div id=${j} class="col s12 m4 recipe-card"><div class="card">
        <div id=${j} class="card-image">
          <img id=${j} src=${recipes[j].image}>
        </div>
        <div id=${j} class="card-content">
          <p id=${j}>${recipes[j].label}</p>
        </div>
      </div></div>`);
    $('.recipe-results').append(recipeCard);
   }
   $('.recipe-card').click(function(e) {
    localStorage.setItem('recipeIndex', e.target.id);
    window.location.href = '/recipe.html';
   })
  })
 })

//Return the results from Edamam API with the search query
 function searchAPI(query) {
  return $.ajax('https://api.edamam.com/search', {
   data: {
    app_id: appID,
    app_key: appKey,
    q: query,
    from: 0,
    to: 3
   }
  }).done(function(data) {
   return data;
  })
 }

})
