import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style.css'
import CocktailInfo from './CocktailInfo'
import { Grid, Search, GridColumn, GridRow, Segment } from 'semantic-ui-react'

class Cocktails extends Component {
    constructor() {
        super()
        this.state = { cocktail: null, info: false, filter: '' }
    }

    filterCocktails =()=> {
        return this.props.api_cocktails
    }

    filterCustomCocktails =()=> {
        return this.props.custom_cocktails
    }

    getCocktailInfo(cocktail) {
        this.setState({
            cocktail: cocktail
        })
    }

    render() {
        return (
            <div className="container" id="full-fit">
                <div className="container" style={{ width: `65%`, height: `100%`, overflowY: `auto`, overflowX: `hidden`, float: `right` }}>
                    { this.state.cocktail ?
                        <CocktailInfo cocktail={this.state.cocktail}/>
                        :
                        <div className="container" >Hi there</div>
                    }
                </div>
                <div className="container" style={{ width: `35%`, height: `100%`, float: `left` }}>
                    <div className="container" id="center-text" style={{ width: `100%`, height: `65%` }}>
                        <div><h3><b><u>Cocktails</u></b></h3></div>
                        <div className="sub-content">(Click one to see it's details!)</div>
                        <Search onSearchChange={(e)=>this.setState({ filter: e.target.value })} placeholder="Search cocktails here..."/>
                        <div className="container" id="center-text" style={{ width: `70%`, height: `84%`, overflowX: `auto`, overflowY: `auto`, borderStyle: `groove`, textAlign: `center`, borderRadius: `12px`, display: `flex`, position: `relative`, marginLeft: `auto`, marginRight: `auto` }}>
                            <ul>
                                {this.filterCocktails().map( cocktail => {
                                    return <div><button onClick={()=> this.getCocktailInfo(cocktail)}>{cocktail.name}</button></div>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div id="center-text" style={{ overflowX: `hidden`, overflowY: `auto`, height: `35%` }}>
                        <div><h3><b><u>Custom Drinks</u></b></h3></div>
                        <div className="sub-content">(Cocktails users have submitted)</div>
                        <div className="container" id="center-text" style={{ width: `70%`, height: `84%`, overflowX: `auto`, overflowY: `auto`, borderStyle: `groove`, textAlign: `center`, borderRadius: `12px`, display: `flex`, position: `relative`, marginLeft: `auto`, marginRight: `auto` }}>
                            <ul>
                                {this.filterCustomCocktails().map( cocktail => {
                                    return <div><button onClick={()=> this.getCocktailInfo(cocktail)}>{cocktail.name}</button></div>
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

                // <Grid celled="internally" id="full-fit">
            //     <GridColumn className="container" id="center-text" width={5}>
            //         <GridRow className="container" style={{ height: `65%`, maxHeight: `65%` }}>
            //         <div>
            //             <h3><b><u>Cocktails</u></b></h3>
            //         </div>
            //         <div className="sub-content">(Click One to see it's details!)</div>
            //         <Search onSearchChange={(e)=>this.setState({ filter: e.target.value })} placeholder="Search cocktails here..."/>
            //         <div className="container" id="cocktails-box">
            //             <ul>
            //                 {/* {this.filterCocktails().map( cocktail => {
            //                 return <div><button onClick={()=> this.getCocktailInfo(cocktail)}>{cocktail.name}</button></div>
            //                 })} */}
            //             </ul>
            //         </div>
            //         </GridRow>
            //         <GridRow style={{ height: `38%` }}>
            //         <h3><b><u>Custom Cocktails</u></b></h3>
            //         </GridRow>
            //     </GridColumn>

            //     <GridColumn width={11}>
            //         { this.state.cocktail ?
            //         <CocktailInfo cocktail={this.state.cocktail}/>
            //         :
            //         null
            //         }
            //     </GridColumn>

            // </Grid>