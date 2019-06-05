import { createStore, combineReducers } from 'redux'
import cocktailReducer from './reducers/cocktailReducer'
import ingredientReducer from './reducers/ingredientReducer'

const rootReducer = combineReducers({
    cocktails: cocktailReducer,
    ingredient: ingredientReducer
})

export default createStore(rootReducer)