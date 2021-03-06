// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/**	Global state app
	search object
	current recipe object
	shopping list object
	liked recipes
 */

 const state = {};

 const controlSearch = async() => {
 	// 1- get query from view
 	const query = searchView.getInput();

 	if (query) {
 		//2- new search object and add to state
 		state.search = new Search(query);

 		//3- prepare ui for the results
 		searchView.clearInput();
 		searchView.clearResults();
 		renderLoader(elements.searchRes)
 		
 		//4- search for the recipes
 		await state.search.getResults();

 		//5- render results on ui
 		clearLoader();
 		searchView.renderResults(state.search.result);
 	}
 }

elements.searchForm.addEventListener('submit', e =>{
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

//Recipe Controller
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes

        // Highlight selected search item

        // Create new recipe object
        state.recipe = new Recipe(id);
        
        //testing
        window.r = state.recipe;

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render recipe
            console.log(state.recipe);
        } catch (err) {
            console.log(err);
            alert('Error processing recipe!');
        }
    }
};
 
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

