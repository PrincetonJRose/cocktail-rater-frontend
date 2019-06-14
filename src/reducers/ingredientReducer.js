export default (state = { ingredients: [], ingredient: null, measurements: null, cocktailList: null }, action) => {
    switch (action.type) {
        case "SET_INGREDIENTS": {
            return {
                ...state, ingredients: action.ingredientData
            }
        }
        case "SET_INGREDIENT": {
            return {
                ...state, ingredient: action.ingredientData
            }
        }
        case "SET_MEASUREMENTS": {
            return {
                ...state, measurements: action.measurementData
            }
        }
        case "SET_COCKTAIL_LIST": {
            return {
                ...state, cocktailList: action.cocktailListData
            }
        }
        default: return state
    }
}