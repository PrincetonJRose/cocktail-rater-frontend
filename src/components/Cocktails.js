import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style.css'
import CocktailInfo from './CocktailInfo'
import IngredientInfo from './IngredientInfo'
import { Input, Grid, Segment, GridColumn, GridRow, Menu, Image } from 'semantic-ui-react'
import { getCocktail, getApiCocktail } from '../services/APICalls'
import { Link } from 'react-router-dom'

class Cocktails extends Component {
    constructor() {
        super()
        this.state = { filter: '', }
    }

    componentDidMount() {
        this.props.dispatch({ type: "SET_INGREDIENT", ingredientData: null })
        this.props.dispatch({ type: "SET_MEASUREMENTS", measurementData: null })
        this.props.dispatch({ type: "SET_COCKTAIL_LIST", cocktailListData: null })
    }

    componentDidUpdate() {
        let cUrl
        if (window.location.pathname.split("/").length > 2 && !this.props.cocktail) {
            if (window.location.pathname.split("/")[2] === 'api') {
                cUrl = this.props.api_cocktails.filter( c => {
                    if (c.id == window.location.pathname.split("/")[3])
                    return true
                })
            } else if (window.location.pathname.split("/")[2] === 'custom') {
                cUrl = this.props.custom_cocktails.filter( c => {
                    if (c.id == window.location.pathname.split("/")[3])
                    return true
                })
            }
            if (cUrl && cUrl.length > 0) {
                this.getCocktailInfo(cUrl[0])
            }
        }
    }

    filterCocktails = () => {
        if (this.state.filter !== '') {
            let search = this.props.api_cocktails.filter(c => {
                let include = false
                if (c.name.toLowerCase().includes(this.state.filter.toLowerCase()) || (c.category && c.category.toLowerCase().includes(this.state.filter.toLowerCase()))) {
                    include = true
                }
                for (let i = 1; i < 16; i++) {
                    if (c[`ingredient_${i}`] === '' || c[`ingredient_${i}`] === ' ' || c[`ingredient_${i}`] === null || c[`ingredient_${i}`] === undefined) {
                        break
                    }
                    if (c[`ingredient_${i}`]) {
                        if (c[`ingredient_${i}`].toLowerCase().includes(this.state.filter.toLowerCase())) {
                            include = true
                            break
                        }
                    }
                }
                if (c.glass && c.glass.toLowerCase().includes(this.state.filter.toLowerCase()))
                    include = true
                if (c.alcoholic && c.alcoholic.toLowerCase().includes(this.state.filter.toLowerCase()))
                    include = true
                return include
            })
            return search
        } else {
            return this.props.api_cocktails
        }
    }

    filterCustomCocktails =()=> {
        if (this.state.filter !== '') {
            let search = this.props.custom_cocktails.filter( c => {
                let include = false
                if (c.name.toLowerCase().includes(this.state.filter.toLowerCase()) || (c.category && c.category.toLowerCase().includes(this.state.filter.toLowerCase()))) {
                    include = true
                }
                for (let ingredient of c.ingredients) {
                    if (ingredient.name.toLowerCase().includes(this.state.filter.toLowerCase()) || (ingredient.category && ingredient.category.toLowerCase().includes(this.state.filter.toLowerCase()))) {
                        include = true
                    }
                }
                if (c.glass && c.glass.toLowerCase().includes(this.state.filter.toLowerCase()))
                    include = true
                if (c.alcoholic && c.alcoholic.toLowerCase().includes(this.state.filter.toLowerCase()))
                    include = true
                return include
            })
            return search
        } else  {
            return this.props.custom_cocktails
        }
    }

    getCocktailInfo(cocktail) {
        if (cocktail.api_cocktail_id) {
            getApiCocktail(cocktail.id).then(data => {
                this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
                this.resetUserReviewLike()
            })
        } else {
            getCocktail(cocktail.id).then(data => {
                this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
                this.resetUserReviewLike()
            })
        }
    }

    resetUserReviewLike =()=> {
        this.props.dispatch({ type: "SET_USER_REVIEW", userReview: null })
        this.props.dispatch({ type: "SET_USER_LIKE", userLike: null })
    }
    
    render() {
        return (
            <div className="container" id="full-fit">
                <div className="container" style={{ width: `65%`, height: `100%`, overflowY: `auto`, overflowX: `hidden`, float: `right` }}>
                {
                    this.props.ingredient ?
                        <IngredientInfo />
                    :
                        <div className="container">
                            {
                                this.props.cocktail ?
                                    <CocktailInfo />
                                :
                                    <Grid raised verticalAlign="middle">
                                        <GridRow centered verticalAlign="middle">
                                            <GridColumn  width={10} verticalAlign="middle">
                                                <Segment inverted color="black" verticalAlign="middle" style={{ marginLeft: `auto`, marginRight: `auto`, marginBottom: `auto`, marginTop: `auto`, position: `relative` }}>
                                                ( Click one of the cocktails in the list to see it's details! )
                                                </Segment>
                                            </GridColumn>
                                        </GridRow>
                                    </Grid>
                            }
                        </div>
                    }
                </div>
                <div className="container" style={{ width: `35%`, height: `100%`, float: `left` }}>
                    <div className="container" id="center-text" style={{ width: `100%`, height: `65%` }}>
                        <p></p>
                        <div><h3><b><u>Cocktails</u></b></h3></div>
                        <Input onChange={(e)=>this.setState({ filter: e.target.value })} placeholder="Search cocktails here..."/>
                        <div className="container" id="center-text" style={{ width: `70%`, height: `80%`, maxHeight: `84%`, overflowX: `auto`, overflowY: `auto`, borderStyle: `groove`, borderColor: `pink`, textAlign: `center`, borderRadius: `12px`, marginLeft: `auto`, marginRight: `auto`, marginBottom: `auto`, marginTop: `auto`, justifyContent: `center` }}>
                            <Menu raised fluid vertical>
                                {this.filterCocktails().map(cocktail => {
                                    return <Menu.Item onClick={() => {
                                                if (this.props.ingredient)
                                                    this.props.dispatch({ type: "SET_INGREDIENT", ingredientData: null })
                                                this.getCocktailInfo(cocktail)
                                                }}><Link to={"/cocktails/api/" + cocktail.id}><Image floated="left" src={cocktail.imageUrl} avatar />{cocktail.name}</Link></Menu.Item>
                                })}
                            </Menu>
                        </div>
                    </div>
                    <div id="center-text" style={{ overflowX: `hidden`, overflowY: `auto`, height: `35%` }}>
                        <div><h3><b><u>Custom Drinks</u></b></h3></div>
                        <div className="sub-content">( Cocktails users have submitted )</div>
                        <div className="container" id="center-text" style={{ width: `70%`, height: `68%`,maxHeight: `84%`, overflowX: `auto`, overflowY: `auto`, borderStyle: `groove`, textAlign: `center`, borderRadius: `12px`, borderColor: `pink`, marginLeft: `auto`, marginRight: `auto`, marginBottom: `auto`, marginTop: `auto`, justifyContent: `center` }}>
                            <Menu fluid vertical>
                                {this.filterCustomCocktails().map( cocktail => {
                                    return <Menu.Item onClick={() => {
                                                if (this.props.ingredient)
                                                    this.props.dispatch({ type: "SET_INGREDIENT", ingredientData: null })
                                                this.getCocktailInfo(cocktail)
                                                }}><Link to={"/cocktails/custom/" + cocktail.id}><Image floated="left" src={cocktail.imageUrl} avatar />{cocktail.name}</Link></Menu.Item>
                                })}
                            </Menu>
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
        custom_cocktails: state.cocktails.custom_cocktails,
        cocktail: state.cocktails.cocktail,
        ingredients: state.ingredients.ingredients,
        ingredient: state.ingredients.ingredient
    }
}

export default connect(mapStateToProps)(Cocktails)
