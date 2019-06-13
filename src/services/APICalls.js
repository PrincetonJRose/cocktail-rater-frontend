import jwt_decode from 'jwt-decode'
const localUrl = `http://localhost:3000/`
const cocktailsUrl = `http://localhost:3000/cocktails/`
const ingredientsUrl = `http://localhost:3000/ingredients/`
const apiCocktailsUrl = `http://localhost:3000/api_cocktail_infos/`
const usersUrl = `http://localhost:3000/users/`
const reviewsUrl = `http://localhost:3000/reviews/`
const loginUrl = `http://localhost:3000/login/`

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

export function createUser(userInfo) {
    return fetch(usersUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(userInfo)
        })
        .then(res => res.json())
}

export function getLocal() {
    return fetch(localUrl)
        .then(res => res.json())
}

export function updateReview(review, jwt_user) {
    return fetch(reviewsUrl + review.id, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'JWT-Auth-Key': jwt_user,
            },
            body: JSON.stringify(review)
        })
        .catch(errors => console.log(errors))
        .then(res => res.json())
}

export function createReview(review, jwt_user) {
    console.log(jwt_user)
    console.log(jwt_decode(jwt_user))
    return fetch(reviewsUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'JWT-Auth-Key': jwt_user,
            },
            body: JSON.stringify(review)
        })
        .catch(errors => console.log(errors))
        .then(res => res.json())
}

export function deleteReview(review, jwt_user) {
    return fetch(reviewsUrl + review.id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'JWT-Auth-Key': jwt_user,
            },
            body: JSON.stringify(review)
        })
        .catch(errors => console.log(errors))
        .then(res => res.json())
}