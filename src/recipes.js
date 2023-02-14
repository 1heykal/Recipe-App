import { v4 as uuidv4 } from 'uuid'

let recipes = []

const loadRecipes = () => {
    try {
        const recipesData = localStorage.getItem('recipes')
        recipes = recipesData ? JSON.parse(recipesData) : []
    } catch (e) {
        recipes = []
    }
}

loadRecipes()

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const getRecipes = () => recipes

const setRecipes = ({title, steps, id}) => {
    const recipe = recipes.find((recipe) => {
        return recipe.id === id
    })
    if(typeof title === 'string')
    {
        recipe.title = title
    }
    if(typeof steps === 'string')
    {
        recipe.steps = steps
    }

    saveRecipes()

}

const addRecipe = () => {
    const recipe = {
        title: '',
        steps: '',
        id: uuidv4()
    }
    recipes.push(recipe)
    saveRecipes()
    return recipe.id
}

const removeRecipe = (id) => {
    const recipeToRemove = recipes.findIndex((recipe) => {
        return recipe.id == id
    })
    if (recipeToRemove > -1) {
        recipes.splice(recipeToRemove, 1)
        saveRecipes()
    }
}

export {getRecipes, setRecipes, addRecipe, removeRecipe, saveRecipes, loadRecipes}

