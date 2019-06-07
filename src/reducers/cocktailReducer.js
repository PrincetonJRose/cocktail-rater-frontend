export default (state = { api_cocktails: [], custom_cocktails: [], cocktail: null }, action) => {
    switch (action.type) {
        case "SET_API_DATA": {
            return {
                ...state, api_cocktails: action.apiData
            }
        }
        case "SET_COCKTAILS": {
            return {
                ...state, custom_cocktails: action.cocktailData
            }
        }
        default: return state
    }
}