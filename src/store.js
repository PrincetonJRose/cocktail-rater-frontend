import { createStore, combineReducers } from 'redux'
import cocktailReducer from './reducers/cocktailReducer'
import ingredientReducer from './reducers/ingredientReducer'
import userReducer from './reducers/userReducer'

const mainReducer = combineReducers({
    cocktails: cocktailReducer,
    ingredients: ingredientReducer,
    users: userReducer
})

export default createStore(mainReducer)