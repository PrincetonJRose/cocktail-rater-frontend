export default (state = { current_user: null }, action) => {
    switch (action.type) {
        case "SET_USER": {
            return {
                ...state, current_user: action.user
            }
        }
        case "CLEAR_USER": {
            return {
                ...state, current_user: {}
            }
        }
        default: return state
    }
}