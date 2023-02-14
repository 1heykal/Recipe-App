import { v4 as uuidv4 } from 'uuid'

let ingredients = []

const loadIngredients = () => {
    try {
       const IngredientsData = localStorage.getItem('ingredients')
        ingredients = IngredientsData ? JSON.parse(IngredientsData) : []
    } catch (e) {
        ingredients = []
    }
}

loadIngredients()



const saveIngredients = () => {
    localStorage.setItem('ingredients', JSON.stringify(ingredients))
}


const getIngredients = () => ingredients



const addIngredient = ({ text, recipeID }) => {
    if (typeof text === 'string') {
        const ingredient = {
            text,
            recipeID,
            id: uuidv4(),
            checked: false
        }
        ingredients.push(ingredient)
        saveIngredients()
    }
}

const removeIngredient = (id) => {
    const ingredientIndex = ingredients.findIndex((item) => {
        return item.id === id
    })

    if (ingredientIndex > -1) {
        ingredients.splice(ingredientIndex, 1)
        saveIngredients()
    }

}

const toggleIngredient = (id) => {
    const ingredient = ingredients.find((item) => {
        return item.id === id
    })

    if (ingredient) {
        ingredient.checked = !ingredient.checked
        saveIngredients()
    }

}


export { addIngredient, getIngredients, removeIngredient, toggleIngredient, loadIngredients }