import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style.css'
import CocktailInfo from './CocktailInfo'
import { Input, Grid, Segment, GridColumn, GridRow } from 'semantic-ui-react'
import { getCocktail } from '../services/APICalls'
import { getApiCocktail } from '../services/APICalls'

class Cocktails extends Component {
    constructor() {
        super()
        this.state = { cocktail: null, filter: '' }
    }

    filterCocktails =()=> {
        if (this.state.filter !== '') {
            let search = this.props.api_cocktails.filter( cocktail => {
                if (cocktail.name.toLowerCase().includes(this.state.filter.toLowerCase()))
                return true
            })
            return search
        } else  {
            return this.props.api_cocktails
        }
    }

    filterCustomCocktails =()=> {
        if (this.state.filter !== '') {
            return this.props.custom_cocktails.filter( cocktail => {
                if (cocktail.name.toLowerCase().includes(this.state.filter.toLowerCase()))
                return true
            })
        } else  {
            return this.props.custom_cocktails
        }
    }

    getCocktailInfo(cocktail) {
        if (cocktail.api_cocktail_id) {
            getApiCocktail(cocktail.id).then(data => {
                this.setState({
                    cocktail: data
                })
            })
        } else {
            getCocktail(cocktail.id).then(data => {
                this.setState({
                    cocktail: data
                })
            })
        }
    }

    render() {
        return (
            <div className="container" id="full-fit">
                <div className="container" style={{ width: `65%`, height: `100%`, overflowY: `auto`, overflowX: `hidden`, float: `right` }}>
                    { this.state.cocktail ?
                        <CocktailInfo cocktail={this.state.cocktail}/>
                        :
                        <Grid verticalAlign="middle">
                            <GridRow centered verticalAlign="middle">
                                <GridColumn  width={10} verticalAlign="middle">
                                    <Segment inverted color="black" verticalAlign="middle">
                                    (Click one of the cocktails in the list to see it's details!)
                                    </Segment>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    }
                </div>
                <div className="container" style={{ width: `35%`, height: `100%`, float: `left` }}>
                    <div className="container" id="center-text" style={{ width: `100%`, height: `65%` }}>
                        <div><h3><b><u>Cocktails</u></b></h3></div>
                        <Input onChange={(e)=>this.setState({ filter: e.target.value })} placeholder="Search cocktails here..."/>
                        <div className="container" id="center-text" style={{ width: `70%`, height: `80%`, maxHeight: `84%`, overflowX: `auto`, overflowY: `auto`, borderStyle: `groove`, textAlign: `center`, borderRadius: `12px`, marginLeft: `auto`, marginRight: `auto`, marginBottom: `auto`, marginTop: `auto`, justifyContent: `center` }}>
                            <ul id="center-text">
                                {this.filterCocktails().map( cocktail => {
                                    return <div><button onClick={()=> this.getCocktailInfo(cocktail)}>{cocktail.name}</button></div>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div id="center-text" style={{ overflowX: `hidden`, overflowY: `auto`, height: `35%` }}>
                        <div><h3><b><u>Custom Drinks</u></b></h3></div>
                        <div className="sub-content">(Cocktails users have submitted)</div>
                        <div className="container" id="center-text" style={{ width: `70%`, height: `68%`,maxHeight: `84%`, overflowX: `auto`, overflowY: `auto`, borderStyle: `groove`, textAlign: `center`, borderRadius: `12px`, display: `flex`, position: `relative`, marginLeft: `auto`, marginRight: `auto`, marginBottom: `auto`, marginTop: `auto`, justifyContent: `center` }}>
                            <ul>
                                {this.filterCustomCocktails().map( cocktail => {
                                    return <button onClick={()=> this.getCocktailInfo(cocktail)}>{cocktail.name}</button>
                                })}
                            </ul>
                        </div>
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
