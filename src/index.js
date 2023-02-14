import {addRecipe, loadRecipes} from './recipes'
import {setFilters} from './filters'
import {renderRecipes} from './visuals'
import {loadIngredients} from './ingredients'

renderRecipes()
let recipeID
document.querySelector('#add-recipe').addEventListener('click', (e) => {
    recipeID = addRecipe()
location.assign(`edit.html#${recipeID}`)
})

document.querySelector('#search-text-input').addEventListener('input', (e) => {
setFilters(e.target.value)
renderRecipes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes' || e.key === 'ingredients') {
        loadRecipes()
        loadIngredients()
        renderRecipes(recipeID)
    }
})