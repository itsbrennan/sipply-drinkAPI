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
    cocktail.getDrinksByName(searchTerm).then(cocktails => {
      if (cocktails.cocktails.drinks === null) {
        // nothing exists
        ui.printMessage('There are no results, try a different term', 'danger');
      } else {
        ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
      }
    });
  }
}
