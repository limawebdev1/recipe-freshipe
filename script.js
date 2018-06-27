// When the page has loaded...
$(document).ready(function() {
  // API app ID and key from signing up for Edamam API
 const appID = 'dc9aa832';
 const appKey = 'c94cf88a08d801e51606d9224083c9a8';
 let searchIndex = 0;
//When the search button is clicked on...
 $('.search-icon').click(function() {
   $(`<div class="row loading-container">
    <div class="col s12 center-align"><img class="loading" src="https://loading.io/spinners/ellipsis/lg.discuss-ellipsis-preloader.gif" /></div>
   </div>`).insertAfter('.recipe-results');
   // Go get the value of whatever is inside the search box
  let searchQuery = $('#search').val();
  // Make a new array to hold recipes
  let recipes = [];
  searchAPI(searchQuery, searchIndex, searchIndex+=3).then(function(result) {
    //Put only recipe object information into recipes array
   for (let i = 0; i < result.hits.length; i++) {
    recipes.push(result.hits[i].recipe);
   }
   //Stores the array of recipes into localStorage as a String
   localStorage.setItem('recipes', JSON.stringify(recipes));

   for (let j = 0; j < recipes.length; j++) {
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
   $('.loading-container').remove();
   $('.recipe-card').click(function(e) {
    localStorage.setItem('recipeIndex', e.target.id);
    window.location.href = '/recipe.html';
   })
   // Adds the "see more button" to the recipe-results div after 3 results have been loaded.
   $('body').append(`<div class="row"><div class="col s12 center-align"><img class="see-more" src="./images/plus-icon.svg" /></div></div>`);
   // When see more button is clicked...
   $('.see-more').click(function(){
     $(`<div class="row loading-container">
      <div class="col s12 center-align"><img class="loading" src="https://loading.io/spinners/ellipsis/lg.discuss-ellipsis-preloader.gif" /></div>
     </div>`).insertAfter('.recipe-results')
     searchAPI(searchQuery, searchIndex, searchIndex+=3).then(function(result) {
       //Put only recipe object information into recipes array
      for (let i = 0; i < result.hits.length; i++) {
       recipes.push(result.hits[i].recipe);
      }
      //Stores the array of recipes into localStorage as a String
      localStorage.setItem('recipes', JSON.stringify(recipes));
      $('.recipe-results').empty();
      for (let j = 0; j < recipes.length; j++) {
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
      $('.loading-container').remove();
      $('.recipe-card').click(function(e) {
       localStorage.setItem('recipeIndex', e.target.id);
       window.location.href = '/recipe.html';
      })
    })
   })
  })
 })

//Return the results from Edamam API with the search query
 function searchAPI(query, from, to) {
  return $.ajax('https://api.edamam.com/search', {
   data: {
    app_id: appID,
    app_key: appKey,
    q: query,
    from: from,
    to: to
   }
  }).done(function(data) {
   return data;
  })
 }

})
