// Instantiate the classes
const ui = new UI(),
  cocktail = new CocktailAPI();
// Create teh event listeners
function eventListeners() {
  // event listener when form is siiubmitted
  const searchForm = document.querySelector('#search-form');

  if (searchForm) {
    searchForm.addEventListener('submit', getCocktails);
  }

  // the results div listeners
  const resultsDiv = document.querySelector('#results');
  if (resultsDiv) {
    resultsDiv.addEventListener('click', resultsDelegation);
  }
}

eventListeners();

// get cocktails function
function getCocktails(e) {
  e.preventDefault();

  const searchTerm = document.querySelector('#search').value;

  // check something is on the search input
  if (searchTerm === '') {
    // call ui prinit message
    ui.printMessage('Please add a query into the form', 'danger');
  } else {
    // server response from promise
    let serverResponse;
    // type of search (ingredients, cocktails, or name)
    let type = document.querySelector('#type').value;

    // evaluate the type of method and then execute the query
    switch (type) {
      case 'name':
        serverResponse = cocktail.getDrinksByName(searchTerm);
        break;
      case 'ingredient':
        serverResponse = cocktail.getDrinksByIngredient(searchTerm);
        break;
    }

    ui.clearResults();

    serverResponse.then(cocktails => {
      if (cocktails.cocktails.drinks === null) {
        // nothing exists
        ui.printMessage('There are no results, try a different term', 'danger');
      } else {
        if (type === 'name') {
          // display with ingredients
          ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
        } else {
          // display without ingredients
          ui.displayDrinks(cocktails.cocktails.drinks);
        }
      }
    });
  }
}

// delegation for #results area
function resultsDelegation(e) {
  e.preventDefault();
  if (e.target.classList.contains('get-recipe')) {
    cocktail.getSingleRecipe(e.target.getAttribute('data-id')).then(recipe => {
      // displays single recipe in modal
      ui.displaySingleRecipe(recipe.recipe.drinks[0]);
    });
  }
}
