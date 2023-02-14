import { getRecipes } from './recipes'
import { getFilters } from './filters'
import { getIngredients, removeIngredient, toggleIngredient } from './ingredients'

const allRecipesElement = document.querySelector('#recipes')
const renderRecipes = () => {
    const { searchText } = getFilters()
    let recipes = getRecipes()

    recipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(searchText.toLowerCase())

    })
    allRecipesElement.innerHTML = ''
    if(recipes.length === 0)
    {
        generateNoRecipes()
        return
    }

    recipes.forEach((recipe) => {   
        generateRecipeDOM(recipe)
        
    })
}
const allIngredientsElement = document.querySelector('#ingredients')

const generateRecipeDOM = (recipe) => {
    const recipeElement = document.createElement('a')
    recipeElement.classList = 'recipe'
    recipeElement.setAttribute('href', `./edit.html#${recipe.id}`)

    const recipeTitleElement = document.createElement('h2')
    if (recipe.title.trim().length > 0) {
        recipeTitleElement.textContent = recipe.title
    } else {
        recipe.title = ''
        recipeTitleElement.textContent = 'Untitled'
    }

    recipeElement.appendChild(recipeTitleElement)
    let summaryElement
    summaryElement = generateSummaryDOM(recipe.id)
    recipeElement.appendChild(summaryElement)

    allRecipesElement.appendChild(recipeElement)

}

const generateNoRecipes = () => {
    const noRecipesMessageElement = document.createElement('p')
    noRecipesMessageElement.textContent = 'No Recipes to show.'
    noRecipesMessageElement.classList = 'no-recipes'
    allRecipesElement.appendChild(noRecipesMessageElement)

}



const generateSummaryDOM = (recipeID) => {
    const ingredients = getIngredients().filter((ingredient) => {
        return ingredient.recipeID === recipeID 
    })
    const availableOnes = ingredients.filter((ingredient) => {
        return ingredient.checked
    }).length
    const summaryElement = document.createElement('p')
    if(ingredients.length === 0)
    {
        summaryElement.textContent = 'No ingredients to show.'
    } else if (availableOnes === 0) {
        summaryElement.textContent = 'You have none of the ingredients'
    } else if (availableOnes === ingredients.length)
    {
        summaryElement.textContent = 'You have all of the ingredients'

    } else {
        summaryElement.textContent = 'You have some of the ingredients'
    }

    summaryElement.classList = 'summary'

    return summaryElement

    

}


const renderIngredients = (recipeID) => {
    let ingredients = getIngredients()
    ingredients = ingredients.filter((ingredient) => {
        return ingredient.recipeID === recipeID
    })
    allIngredientsElement.innerHTML = ''
    if (ingredients.length === 0) {
        generateNoIngredients()
        return
    }
    
    ingredients.forEach((ingredient) => {
        generateIngredientsDOM(ingredient)
    })
}

const generateIngredientsDOM = (ingredient) => {
    
        const ingredientEle = document.createElement('span')
        ingredientEle.classList = 'ingredient'
        const checkIngredientEle = document.createElement('input')
        const ingredientTextEle = document.createElement('p')
        const ingredientRemoveEle = document.createElement('button')



        checkIngredientEle.setAttribute('type', 'checkbox')
        checkIngredientEle.classList = 'checkbox'
        checkIngredientEle.checked = ingredient.checked
        

        ingredientRemoveEle.textContent = 'x'
        ingredientRemoveEle.classList = 'remove-ingredient'
        ingredientTextEle.textContent = ingredient.text


        ingredientEle.appendChild(checkIngredientEle)
        ingredientEle.appendChild(ingredientTextEle)
        ingredientEle.appendChild(ingredientRemoveEle)
        allIngredientsElement.appendChild(ingredientEle)
        ingredientRemoveEle.addEventListener('click', () => {
            removeIngredient(ingredient.id)
            renderIngredients(ingredient.recipeID) 
            
        })

        checkIngredientEle.addEventListener('click', () => {
            toggleIngredient(ingredient.id)    
        })
        

}

const generateNoIngredients = () => {
    const noIngredientsMessageElement = document.createElement('p')
    noIngredientsMessageElement.textContent = 'No Ingredients to show.'
    noIngredientsMessageElement.classList = 'no-ingredients'
    allIngredientsElement.appendChild(noIngredientsMessageElement)

}

const viewRecipe = (recipeID) => {
    const titleElement = document.querySelector('#recipe-edit__title')
    const stepsElement = document.querySelector('#recipe-edit__steps')

    const recipe = getRecipes().find((recipe) => {
        return recipe.id === recipeID
    })

    if (!recipe) {
        location.assign('./index.html')
    } else {
        titleElement.setAttribute('value', recipe.title)
        stepsElement.textContent = recipe.steps
    }
}

export { viewRecipe, renderRecipes, renderIngredients}