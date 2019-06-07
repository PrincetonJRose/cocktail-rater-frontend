const localUrl = `http://localhost:3000/`
const cocktailsUrl = `http://localhost:3000/cocktails`
const ingredientsUrl = `http://localhost:3000/ingredients/`
const apiCocktailsUrl = `http://localhost:3000/api_cocktail_infos/`
const usersUrl = `http://localhost:3000/users/`

export function getApiCocktails() {
    return fetch(apiCocktailsUrl)
            .then(res => res.json())
}

export function getApiCocktail(id) {
    return fetch(apiCocktailsUrl + id)
            .then(res => res.json())
}

export function getCocktails() {
    return fetch(cocktailsUrl)
            .then(res => res.json())
}

export function getCocktail(id) {
    return fetch(cocktailsUrl + id)
            .then(res => res.json())
}

export function getIngredients() {
    return fetch(ingredientsUrl)
    .then(res => res.json())
}

export function getIngredient(id) {
    return fetch(ingredientsUrl + id)
            .then(res => res.json())
}

export function getUsers() {
    return fetch(usersUrl)
            .then(res => res.json())
}

export function getUser(id) {
    return fetch(usersUrl + id)
            .then(res => res.json())
}


