export default (state = { ingredients: [], ingredient: null }, action) => {
    switch (action.type) {
        case "SET_INGREDIENTS": {
            return {
                ...state, ingredients: action.ingredientData
            }
        }
        case "SET_INGREDIENT": {
            return {
                ...state, ingredient: action.ingredient
            }
        }
        default: return state
    }
}