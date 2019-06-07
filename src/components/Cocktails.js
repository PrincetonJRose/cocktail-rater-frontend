import React, { Component } from 'react'
import { connect } from 'react-redux'
import CocktailInfo from './CocktailInfo'
import { Grid, Search } from 'semantic-ui-react'

class Cocktails extends Component {
    constructor() {
        super()
        this.state = { cocktail: null, info: false }
    }

    filterCocktails =()=> {
        return this.props.api_cocktails
    }

    getCocktailInfo(cocktail) {
        this.setState({
            cocktail: cocktail
        })
    }

    render() {
        return (
            <div className="container">
                <div className="container" style={{ width: `70vw`, height: `100vh`, float: `right` }}>
                    <div className="container" style={{ height: `100vh`, overflowY: `auto`, overflowX: `hidden` }}>
                        { this.state.cocktail ?
                            <CocktailInfo cocktail={this.state.cocktail}/>
                            :
                            null
                        }
                    </div>
                </div>
                <div className="container" style={{ width: `30vw`, height: `100vh`, float: `left` }}>
                    <div className="container" style={{ width: `100%`, height: `65%`, justifyContent: `middle` }}>
                        <p></p>
                        <h3><b><u>Cocktails</u></b></h3>
                        <div className="container" style={{ width: `80%`, height: `90%`, overflowX: `auto`, overflowY: `auto`, borderStyle: `groove`, textAlign: `center`, borderRadius: `15px` }}>
                            <ul>
                                {this.filterCocktails().map( cocktail => {
                                    return <p><button onClick={()=> this.getCocktailInfo(cocktail)}>{cocktail.name}</button></p>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div style={{ overflowX: `hidden`, overflowY: `auto`, height: `35%` }}>
                        <h3><b><u>Custom Drinks</u></b></h3>
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        api_cocktails: state.cocktails.api_cocktails,
        custom_cocktails: state.cocktails.custom_cocktails
    }
}

export default connect(mapStateToProps)(Cocktails)