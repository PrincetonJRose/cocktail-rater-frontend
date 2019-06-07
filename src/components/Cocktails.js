import React, { Component } from 'react'
import { connect } from 'react-redux'
import CocktailInfo from './CocktailInfo'

class Cocktails extends Component {

    render() {
        return (
            <div className="container">
                <div className="container" style={{ width: `70vw`, height: `100vh`, float: `right` }}>
                    <div className="container" style={{ height: `100vh`, overflowY: `auto`, overflowX: `hidden` }}>
                        { this.props.cocktail ?
                            <CocktailInfo id={this.props.cocktail}/>
                            :
                            null
                        }
                    </div>
                </div>
                <div className="container" style={{ width: `30vw`, height: `100vh`, float: `left` }}>
                    <div style={{ overflowX: `hidden`, overflowY: `auto`, height: `65vh` }}>
                        Cocktails
                    </div>
                    <div style={{ overflowX: `hidden`, overflowY: `auto`, height: `35vh` }}>
                        Custom Drinks
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Cocktails)