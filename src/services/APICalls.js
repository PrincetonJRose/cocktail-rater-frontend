import jwt_decode from 'jwt-decode'
const localUrl = `http://localhost:3000/`
const cocktailsUrl = `http://localhost:3000/cocktails/`
const ingredientsUrl = `http://localhost:3000/ingredients/`
const apiCocktailsUrl = `http://localhost:3000/api_cocktail_infos/`
const usersUrl = `http://localhost:3000/users/`
const reviewsUrl = `http://localhost:3000/reviews/`
const likesUrl = `http://localhost:3000/likes/`
const loginUrl = `http://localhost:3000/login/`
const commentsUrl = `http://localhost:3000/comments/`

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

export function createCocktail(cocktail, jwt_user) {
    return fetch(cocktailsUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            'JWT-Auth-Key': jwt_user,
        },
        body: JSON.stringify(cocktail)
    })
    .then(res => res.json())
}

export function updateCocktail(cocktail, jwt_user) {
    return fetch(cocktailsUrl + cocktail.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            'JWT-Auth-Key': jwt_user,
        },
        body: JSON.stringify(cocktail)
    })
    .then(res => res.json())
}

export function deleteCocktail(cocktail, jwt_user) {
    return fetch(cocktailsUrl + cocktail.id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            'JWT-Auth-Key': jwt_user,
        },
    })
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

export function updateUser(user, jwt_user) {
    return fetch(usersUrl + jwt_decode(jwt_user).user_id, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'JWT-Auth-Key': jwt_user,
            },
            body: JSON.stringify(user)
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
        .then(res => res.json())
}

export function createReview(review, jwt_user) {
    return fetch(reviewsUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'JWT-Auth-Key': jwt_user,
            },
            body: JSON.stringify(review)
        })
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
        })
        .then(res => res.json())
}

export function createLike(like, jwt_user) {
    return fetch(likesUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            'JWT-Auth-Key': jwt_user,
        },
        body: JSON.stringify(like)
    })
    .catch(errors => console.log(errors))
    .then(res => res.json())
}

export function deleteLike(like, jwt_user) {
    return fetch(likesUrl + like.id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            'JWT-Auth-Key': jwt_user,
        },
    })
    .catch(errors => console.log(errors))
    .then(res => res.json())
}

export function createComment(comment, jwt_user) {
    return fetch(commentsUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            'JWT-Auth-Key': jwt_user,
        },
        body: JSON.stringify(comment)
    })
    .then(res => res.json())
}

export function updateComment(comment, jwt_user) {
    return fetch(commentsUrl + comment.id, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            'JWT-Auth-Key': jwt_user,
        },
        body: JSON.stringify(comment)
    })
    .then(res => res.json())
}

export function deleteComment(comment, jwt_user) {
    return fetch(commentsUrl + comment.id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            'JWT-Auth-Key': jwt_user,
        },
    })
    .then(res => res.json())
}