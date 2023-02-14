import { addIngredient, loadIngredients } from './ingredients'
import { setRecipes, removeRecipe, loadRecipes} from './recipes'
import { viewRecipe, renderIngredients } from './visuals'

const recipeID = location.hash.substring(1)
viewRecipe(recipeID)
renderIngredients(recipeID)
const titleElement = document.querySelector('#recipe-edit__title')
titleElement.addEventListener('input', (e) => {
    setRecipes({
        title: e.target.value,
        id: recipeID
    })
})

document.querySelector('#recipe-edit__steps').addEventListener('input', (e) => {
    setRecipes({
        steps: e.target.value,
        id: recipeID
    })
})

document.querySelector('#remove-recipe').addEventListener('click', (e) => {
    removeRecipe(recipeID)
    location.assign('./index.html')
})


document.querySelector('#new-ingredient').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.newIngredient.value.trim()
    if (text.length > 0) {
        addIngredient({text, recipeID})
        e.target.elements.newIngredient.value = ''
        renderIngredients(recipeID)
    }
})

window.addEventListener('storage', (e) => {
    if (e.key === 'ingredients' || e.key === 'recipes') {
        loadIngredients()
        loadRecipes()
        viewRecipe(recipeID)
        renderIngredients(recipeID)
        console.log('1')
    }

})

//document.getElementById("recipe-edit__steps").


