export default (state = { api_cocktails: [], custom_cocktails: [], cocktail: null, userReview: null, userLike: null }, action) => {
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
        case "SET_COCKTAIL": {
            return {
                ...state, cocktail: action.cocktailData
            }
        }
        case "SET_USER_REVIEW": {
            return {
                ...state, userReview: action.userReview
            }
        }
        case "SET_USER_LIKE": {
            return {
                ...state, userLike: action.userLike
            }
        }
        default: return state
    }
}