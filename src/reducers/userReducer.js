export default (state = { current_user: null, jwt_user: null, errors: [] }, action) => {
    switch (action.type) {
        case "SET_USER": {
            return {
                ...state, current_user: action.user
            }
        }
        case "CLEAR_USER": {
            return {
                ...state, current_user: null
            }
        }
        case "SET_AUTH": {
            if (localStorage.getItem("jwt_user")) {
                return {
                    ...state, jwt_user: localStorage.getItem("jwt_user")
                }
            } else {
                return state
            }
        }
        case "CLEAR_AUTH": {
            return {
                ...state, jwt_user: null
            }
        }
        case "SET_ERRORS": {
            return {
                ...state, errors: action.errors
            }
        }
        default: return state
    }
}