import React, { Component } from  'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Image, Menu, Segment, Input, Search, GridColumn, Dropdown, GridRow, Form } from 'semantic-ui-react'
import CocktailInfo from '../components/CocktailInfo'
import IngredientInfo from '../components/IngredientInfo'
import { getCocktail, getApiCocktail } from '../services/APICalls'

class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            ingredients: [],
            alcoholic: '',
            category: [],
            glass: [],
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: null })
        this.props.dispatch({ type: "SET_INGREDIENT", ingredientData: null })
        this.props.dispatch({ type: "SET_MEASUREMENTS", measurementData: null })
        this.props.dispatch({ type: "SET_COCKTAIL_LIST", cocktailListData: null })
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

    filterCocktails() {
        let allCocktails = this.props.api_cocktails
        allCocktails = [...allCocktails, ...this.props.custom_cocktails]
        if (this.state.category.length === 0 && this.state.glass.length === 0 && this.state.ingredients.length === 0 && (this.state.alcoholic === '' || this.state.alcoholic === "Any")) {
            return allCocktails
        } else {
            let search = allCocktails.filter(c => {
                let include = false
                let hasCategory = false
                let hasGlass = false
                let hasAlcoholic = false
                let hasIngredients = false
                if (this.state.ingredients.length > 0 && c.api_cocktail_id) {
                    let ingredientCount = 0
                    for (let i = 1; i < 16; i++) {
                        if (c[`ingredient_${i}`] === '' || c[`ingredient_${i}`] === ' ' || c[`ingredient_${i}`] === null || c[`ingredient_${i}`] === undefined) {
                            break
                        }
                        if (c[`ingredient_${i}`]) {
                            this.state.ingredients.map( ing => {
                                if (ing.name.toLowerCase().includes(c[`ingredient_${i}`].toLowerCase()))
                                ingredientCount += 1
                            })
                        }
                    }
                    if (ingredientCount === this.state.ingredients.length)
                        hasIngredients = true
                } else if (this.state.ingredients.length > 0) {
                    let ingredientCount = 0
                    c.ingredients.map( i => {
                        this.state.ingredients.map( ing => {
                            if (ing.name.toLowerCase().includes(i.name.toLowerCase()))
                                ingredientCount += 1
                        })
                    })
                    if (ingredientCount === this.state.ingredients.length)
                        hasIngredients = true
                } else {
                    hasIngredients = true
                }
                if (this.state.category.length === 0 || c.category && this.state.category.includes(c.category))
                    hasCategory = true
                if (this.state.glass.length > 0) {
                    this.state.glass.map( g => {
                        if (g.toLowerCase().includes(c.glass.toLowerCase()))
                        hasGlass = true
                    })
                } else {
                    hasGlass = true
                }
                if (this.state.alcoholic === '' || this.state.alcoholic === "Any" || c.alcoholic === this.state.alcoholic)
                    hasAlcoholic = true
                if (hasAlcoholic && hasCategory && hasGlass && hasIngredients)
                    include = true
                return include
            })
            return search
        }
    }

    setAlcoholic = (e, { value }) => this.setState({ alcoholic: value })

    render() {

        const categories = ["Milk / Float / Shake", "Cocktail", "Ordinary Drink", "Beer", "Homemade Liqueur", "Soft Drink / Soda", "Punch / Party Drink", "Coffee / Tea", "Shot", "Cocoa", "Other / Unknown"].map(choice => ({
            key: choice,
            text: choice,
            value: choice,
        }))

        const glasses = ["Beer mug", "White wine glass", "Old-fashioned glass", "Cocktail glass", "Champagne flute", "Beer pilsner", "Hurricane glass", "Collins glass", "Whiskey sour glass", "Martini Glass", "Highball glass", "Balloon Glass", "Old-Fashioned glass", "Pint glass", "Nick and Nora Glass", "Irish coffee cup", "Punch bowl", "Coffee mug", "Shot glass", "Brandy snifter", "Margarita / Coupette glass", "Pousse cafe glass", "Shot Glass", "Coffee Mug", "Wine Glass", "Mason jar", "Champagne Flute", "Beer Glass", "Punch Bowl", "Jar", "Copper Mug", "Pitcher", "Parfait glass", "Margarita glass", "Cordial glass", "Coupe Glass"].map(choice => ({
            key: choice,
            text: choice,
            value: choice,
        }))

        const alcoholic = this.state.alcoholic

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
                                                ( Use search parameters to find specific cocktails! )
                                                </Segment>
                                            </GridColumn>
                                        </GridRow>
                                    </Grid>
                            }
                        </div>
                    }
                </div>
                <div className="container" style={{ width: `35%`, height: `100%`, float: `left`, overflowY: `auto` }}>
                    <Segment className="container" id="center-text" style={{ width: `100%` }}>
                        <div><h3><b><u>Search Cocktails</u></b></h3></div>
                        <br></br>
                        <Form>
                            <label><p><strong>Categories:</strong></p></label>
                            <Dropdown 
                                placeholder='Select categories here...'
                                raised 
                                fluid 
                                search
                                multiple
                                selection
                                value = { this.state.category }
                                options = { categories }
                                onChange = { (e, data) => this.setState({ category: data.value }) }
                            />
                            <br></br>
                            <label><p><strong>Drinking glass:</strong></p></label>
                            <Dropdown 
                                placeholder='Select glasses here...'
                                raised 
                                fluid 
                                search
                                multiple
                                selection
                                value = { this.state.glass }
                                options = { glasses }
                                onChange = { (e, data) => this.setState({ glass: data.value }) }
                            />
                            <br></br>
                            <Form.Group >
                                <label>&emsp;Alcohol content?&emsp;</label>
                                <Form.Radio
                                    raised 
                                    label='Any'
                                    value='Any'
                                    checked={alcoholic === 'Any'}
                                    onChange={ this.setAlcoholic }
                                />
                                <Form.Radio
                                    raised 
                                    label='Alcoholic'
                                    value='Alcoholic'
                                    checked={alcoholic === 'Alcoholic'}
                                    onChange={ this.setAlcoholic }
                                />
                                <Form.Radio
                                    raised 
                                    label='Non Alcoholic'
                                    value='Non Alcoholic'
                                    checked={alcoholic === 'Non Alcoholic'}
                                    onChange={ this.setAlcoholic }
                                />
                            </Form.Group>
                            <label><p><strong>Ingredients:</strong></p></label>
                            <Dropdown 
                                placeholder='Contains these ingredients...'
                                raised 
                                fluid 
                                search // to allow filtered search... still not working 100%    search={()=>this.filterIngredients()}
                                multiple
                                selection
                                value={this.state.ingredients}
                                options={this.props.ingredients.map( i => ({ key: i.name, text: i.name, value: i }) ) }
                                onChange={(e, data)=>{this.setState({ ingredients: data.value} )} }
                            />
                        </Form>
                    </Segment>
                    <div id="center-text" style={{ overflowX: `hidden`, overflowY: `auto`, height: `45%` }}>
                        <div className="container" id="center-text" style={{ width: `100%`, height: `84%`, overflowX: `auto`, overflowY: `auto`, borderStyle: `groove`, textAlign: `center`, borderRadius: `12px`, marginLeft: `auto`, marginRight: `auto`, marginBottom: `auto`, marginTop: `auto`, justifyContent: `center` }}>
                            <Menu fluid vertical>
                                {this.filterCocktails().map( cocktail => {
                                    return <Menu.Item onClick={() => {
                                        if (this.props.ingredient)
                                        this.props.dispatch({ type: "SET_INGREDIENT", ingredientData: null })
                                        this.getCocktailInfo(cocktail)
                                    }}><Image floated="left" verticalAlign="middle" src={cocktail.imageUrl} avatar />{cocktail.name}</Menu.Item>
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
        ingredients: state.ingredients.ingredients,
        api_cocktails: state.cocktails.api_cocktails,
        custom_cocktails: state.cocktails.custom_cocktails,
        ingredient: state.ingredients.ingredient,
        cocktail: state.cocktails.cocktail,
    }
}

export default connect(mapStateToProps)(SearchBar)