import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getIngredient } from '../services/APICalls'
import { Segment, Grid, GridRow, GridColumn, Menu, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import IngredientInfo from './IngredientInfo'
import CocktailInfo from './CocktailInfo'

class Ingredients extends Component {
    constructor() {
        super()
        this.state = { filter: '', }
    }

    componentDidMount() {
        this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: null })
        this.props.dispatch({ type: "SET_MEASUREMENTS", measurementData: null })
        this.props.dispatch({ type: "SET_COCKTAIL_LIST", cocktailListData: null })
    }

    componentDidUpdate() {
        let iUrl
        if (window.location.pathname.split("/").length > 1 && !this.props.ingredient) {
            iUrl = this.props.ingredients.filter( i => {
                if (i.id == window.location.pathname.split("/")[2])
                return true
            })
            if (iUrl && iUrl.length > 0) {
                this.getIngredientInfo(iUrl[0])
            }
        }
    }

    filterIngredients =()=> {
        if (this.state.filter !== '') {
            let search = this.props.ingredients.filter(ingredient => {
                if (ingredient.name.toLowerCase().includes(this.state.filter.toLowerCase()) || (ingredient.category && ingredient.category.toLowerCase().includes(this.state.filter.toLowerCase())))
                    return true
            })
            return search
        } else {
            return this.props.ingredients
        }
    }

    getIngredientInfo =(ingredient)=> {
        getIngredient(ingredient.id).then(data => {
            this.props.dispatch({ type: "SET_INGREDIENT", ingredientData: data })
            this.resetIngredientData()
        })
    }

    resetIngredientData =()=> {
        this.props.dispatch({ type: "SET_MEASUREMENTS", measurementData: null })
        this.props.dispatch({ type: "SET_COCKTAIL_LIST", cocktailListData: null })
    }

    render () {
        return (
            <div className="container" id="full-fit">
                <div className="container" style={{ width: `65%`, height: `100%`, overflowY: `auto`, overflowX: `hidden`, float: `right` }}>
                    {
                        this.props.cocktail ?
                            <CocktailInfo />
                        :
                            <div className="container">
                            {
                                this.props.ingredient ?
                                    <IngredientInfo />
                                :
                                    <Grid raised verticalAlign="middle">
                                        <GridRow centered verticalAlign="middle">
                                            <GridColumn  width={10} verticalAlign="middle">
                                                <Segment inverted color="black" verticalAlign="middle" style={{ marginLeft: `auto`, marginRight: `auto`, marginBottom: `auto`, marginTop: `auto`, position: `relative` }}>
                                                ( Click one of the ingredients in the list to see it's details! )
                                                </Segment>
                                            </GridColumn>
                                        </GridRow>
                                    </Grid>
                            }
                            </div>
                    }
                </div>
                <div className="container" id="center-text" style={{ width: `35%`, height: `100%`, float: `left` }}>
                    <p></p>
                    <div><h3><b><u>Ingredients</u>:</b></h3></div>
                    <Input onChange={(e)=>this.setState({ filter: e.target.value })} placeholder="Search cocktails here..."/>
                    <div className="container" id="center-text" style={{ width: `70%`, height: `80%`, maxHeight: `84%`, overflowX: `auto`, overflowY: `auto`, borderStyle: `groove`, borderColor: `pink`, textAlign: `center`, borderRadius: `12px`, marginLeft: `auto`, marginRight: `auto`, marginBottom: `auto`, marginTop: `auto`, justifyContent: `center` }}>
                        <Menu raised fluid vertical>
                            {
                                this.filterIngredients().map(ingredient => {
                                    return <Menu.Item onClick={() => {
                                                if (this.props.cocktail)
                                                    this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: null })
                                                this.getIngredientInfo(ingredient)
                                                }}><Link to={"/ingredients/" + ingredient.id}>
                                            { 
                                                ingredient.category ? 
                                                    <i>
                                                        {
                                                                ingredient.category.toLowerCase().includes("beverage") || ingredient.category.toLowerCase().includes("wine") || ingredient.category.toLowerCase().includes("liqour") || ingredient.category.toLowerCase().includes("liqueur") || ingredient.category.toLowerCase().includes("whiskey") || ingredient.category.toLowerCase().includes("brandy") || ingredient.category.toLowerCase().includes("spirit") || ingredient.category.toLowerCase().includes("vodka")|| ingredient.category.toLowerCase().includes("rum")|| ingredient.category.toLowerCase().includes("drink")|| ingredient.category.toLowerCase().includes("whisky") || ingredient.category.toLowerCase().includes("juice") || ingredient.category.toLowerCase().includes("beer") ?
                                                                <i className="icon beer" style={{ float: `left` }}></i> 
                                                            :
                                                                <i className="icon food" style={{ float: `left` }}></i>
                                                        }
                                                    </i>
                                                :
                                                    <i className="icon food" style={{ float: `left` }}></i>
                                            }
                                        {ingredient.name}</Link></Menu.Item>
                                })
                            }
                        </Menu>
                    </div>
                </div>
            </div>
        )
    }
}


let mapStateToProps =(state)=> {
    return {
        ingredient: state.ingredients.ingredient,
        ingredients: state.ingredients.ingredients,
        api_cocktails: state.cocktails.api_cocktails,
        custom_cocktails: state.cocktails.custom_cocktails,
        cocktail: state.cocktails.cocktail
    }
}

export default connect(mapStateToProps)(Ingredients)