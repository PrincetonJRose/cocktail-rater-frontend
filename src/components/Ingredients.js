import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getIngredient } from '../services/APICalls'

class Ingredients extends Component {
    constructor() {
        super()
        this.state = { }
    }

    render () {
        return (
            <div></div>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        ingredient: state.ingredients.ingredient,
        ingredients: state.ingredients.ingredients,
        api_cocktails: state.cocktails.api_cocktails,
        custom_cocktails: state.cocktails.custom_cocktails
    }
}

export default connect(mapStateToProps)(Ingredients)