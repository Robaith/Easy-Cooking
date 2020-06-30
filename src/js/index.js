// Global app controller
import Search from './models/Search';

/**	Global state app
	search object
	current recipe object
	shopping list object
	liked recipes
 */

 const state = {};

 const controlSearch = async() => {
 	// 1- get query from view
 	const query = 'pizza';

 	if (query) {
 		//2- new search object and add to state
 		state.search = new Search(query);

 		//3- prepare ui for the results

 		//4- search for the recipes
 		await state.search.getResults();

 		//5- render results on ui
 		console.log(state.search.result);
 	}
 }

document.querySelector('.search').addEventListener('submit', e =>{
	e.preventDefault();
	controlSearch();
});