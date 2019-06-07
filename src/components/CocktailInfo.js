import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import { getCocktail } from '../services/APICalls'
import { getApiCocktail } from '../services/APICalls'

class CocktailInfo extends Component {
    constructor() {
        super()
        this.state = { cocktail: {} }
    }

    componentWillReceiveProps() {
        if (this.props.cocktail.api_cocktail_id) {
            getApiCocktail(this.props.cocktail.id).then(data => {
                this.setState({ cocktail: data })
                console.log(this.state.cocktail)
            })
        } else {
            getCocktail(this.props.cocktail.id).then(data => {
                this.setState({ cocktail: data })
                console.log(this.state.cocktail)
            })
        }
    }

    render() {
        return (
            <div className="container" style={{ width: `100%`, height: `100%` }}>
                cocktail info
            </div>
        )
    }
}

export default connect()(CocktailInfo)