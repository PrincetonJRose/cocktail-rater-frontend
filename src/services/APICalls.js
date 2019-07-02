import jwt_decode from 'jwt-decode'
const localUrl = `https://cocktail-rater-api.herokuapp.com/`
const cocktailsUrl = `https://cocktail-rater-api.herokuapp.com/cocktails/`
const ingredientsUrl = `https://cocktail-rater-api.herokuapp.com/ingredients/`
const apiCocktailsUrl = `https://cocktail-rater-api.herokuapp.com/api_cocktail_infos/`
const usersUrl = `https://cocktail-rater-api.herokuapp.com/users/`
const reviewsUrl = `https://cocktail-rater-api.herokuapp.com/reviews/`
const likesUrl = `https://cocktail-rater-api.herokuapp.com/likes/`
const loginUrl = `https://cocktail-rater-api.herokuapp.com/login/`
const commentsUrl = `https://cocktail-rater-api.herokuapp.com/comments/`

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