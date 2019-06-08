import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'

class CocktailInfo extends Component {

    render() {
        return (
            <div className="container" style={{ width: `100%`, height: `100%` }}>
                {this.props.cocktail.name}
            </div>
        )
    }
}

export default connect()(CocktailInfo)