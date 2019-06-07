import React, { Component } from 'react'
import { connect } from 'react-redux'

class CocktailInfo extends Component {

    render() {
        console.log(this.props.cocktail)
        return (
            <div className="container">
                
            </div>
        )
    }
}

export default connect()(CocktailInfo)