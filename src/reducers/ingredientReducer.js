export default (state = { ingredients: [], ingredient: null }, action) => {
    switch (action.type) {
        case "SET_INGREDIENTS": {
            return {
                ...state, ingredients: action.ingredientData
            }
        }
        default: return state
    }
}