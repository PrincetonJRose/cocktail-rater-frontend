import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Image, Grid, GridRow, GridColumn, Menu, Button, Modal, Form, Table, Input } from 'semantic-ui-react'
import jwt_decode from 'jwt-decode'
import { getApiCocktail, getCocktail } from '../services/APICalls'

class IngredientInfo extends Component {

    componentDidMount() {
        this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: null })
        this.resetUserReviewLike()
    }

    getCocktailInfo(cocktail) {
        if (cocktail.api_cocktail_id) {
            getApiCocktail(cocktail.id).then(data => {
                this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
                this.resetUserReviewLike()
                this.props.dispatch({ type: "SET_INGREDIENT", ingredientData: null })
            })
        } else {
            getCocktail(cocktail.id).then(data => {
                this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
                this.resetUserReviewLike()
                this.props.dispatch({ type: "SET_INGREDIENT", ingredientData: null })
            })
        }
    }

    resetUserReviewLike =()=> {
        this.props.dispatch({ type: "SET_USER_REVIEW", userReview: null })
        this.props.dispatch({ type: "SET_USER_LIKE", userLike: null })
    }

    getAllCocktailsWithIngredient =()=> {
        let measurementList = []
        let cocktailList = this.props.api_cocktails.filter( c => {
            let include = false
            for (let i = 1; i < 16; i++) {
                if (c[`ingredient_${i}`] === '' || c[`ingredient_${i}`] === ' ' || c[`ingredient_${i}`] === null || c[`ingredient_${i}`] === undefined) {
                    break
                }
                if (c[`ingredient_${i}`]) {
                    if (c[`ingredient_${i}`].toLowerCase().includes(this.props.ingredient.name.toLowerCase())) {
                        include = true
                        if (c[`measurement_${i}`] === '' || c[`measurement_${i}`] === ' ' || c[`measurement_${i}`] === null) {
                            measurementList.push("No measurement given.")
                        } else {
                            measurementList.push(c[`measurement_${i}`])
                        }
                        break
                    }
                }
            }
            return include
        })
        if (this.props.custom_cocktails.length > 0) {
            this.props.custom_cocktails.map( cocktail => {
                for (let ingredient of cocktail.ingredients) {
                    if (ingredient.name.toLowerCase().includes(this.props.ingredient.name.toLowerCase())) {
                        cocktailList.push(cocktail)
                        cocktail.cocktail_ingredients.map( ci => {
                            if (ci.ingredient_id === ingredient.id) {
                                measurementList.push(ci.measurement)
                            }
                        })
                    }
                }
            })
        }
        this.props.dispatch({ type: "SET_MEASUREMENTS", measurementData: measurementList })
        this.props.dispatch({ type: "SET_COCKTAIL_LIST", cocktailListData: cocktailList })
    }

    render() {
        let i = this.props.ingredient
        let index = -1
        if (this.props.api_cocktails && this.props.api_cocktails.length > 0 && this.props.cocktailList === null) {
            this.getAllCocktailsWithIngredient()
        }
        return (
            <Segment className="container" style={{ width: `100%`, height: `100%`, overflowY: `auto` }}>
                <Grid  >
                    <GridRow centered>
                        <GridColumn textAlign="centered" centered width={8}>
                            <p></p>
                            <Segment style={{ borderStyle: `groove`, borderColor: `pink`, borderRadius: `12px` }}>
                                <h1><u>{i.name}</u></h1>
                            </Segment>
                        </GridColumn>
                    </GridRow>
                    <GridRow stretched centered >
                        <GridColumn width={12}>
                        <Segment className="container" style={{ borderStyle: `groove`, borderRadius: `12px`, borderColor: `pink`, alignItems: `center` }}>
                            <Segment fluid style={{ marginLeft: `auto`, marginRight: `auto`, marginBottom: `auto`, marginTop: `auto`, display: `flex`, justifyContent: `center` }}>
                                <Menu fluid vertical style={{ marginLeft: `auto`, marginRight: `auto`, marginBottom: `auto`, marginTop: `auto` }}>
                                    <Menu.Item ><b><u>Category</u>:</b> {'  '}{i.category ? i.category : <span>No category listed.</span>}</Menu.Item>
                                    <Menu.Item><b><u>Description</u>:</b>{'  '}{i.description ? i.description : <span>No description given.</span>}</Menu.Item>
                                </Menu>
                            </Segment>
                        </Segment>
                        </GridColumn>
                    </GridRow>
                    <GridRow centered>
                        <GridColumn width={12}>
                            <Segment  style={{ borderStyle: `groove`, borderRadius: `12px`, borderColor: `pink` }}>
                                <h3 style={{ textAlign: `center` }}><b><u>Cocktails with this ingredient</u></b></h3>
                                <div className="sub-content" style={{ textAlign: `center` }}>( Click on a cocktail to see its details )</div>
                                <Table singleLine celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell textAlign="center">Cocktail</Table.HeaderCell>
                                            <Table.HeaderCell textAlign="center">Amount Needed</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                            { this.props.cocktailList && this.props.measurements ?
                                                this.props.cocktailList.map( cocktail => {
                                                    index++
                                                    return (
                                                        <Table.Row onClick={()=> {
                                                            this.getCocktailInfo(cocktail)
                                                            }}>
                                                            <Table.Cell>{cocktail.name}</Table.Cell>
                                                            <Table.Cell>{this.props.measurements[index]}</Table.Cell>
                                                        </Table.Row>
                                                    )
                                                })
                                                : null
                                            }
                                    </Table.Body>
                                </Table>
                            </Segment>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </Segment>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        cocktail: state.cocktails.cocktail,
        api_cocktails: state.cocktails.api_cocktails,
        custom_cocktails: state.cocktails.custom_cocktails,
        ingredient: state.ingredients.ingredient,
        measurements: state.ingredients.measurements,
        cocktailList: state.ingredients.cocktailList,
    }
}

export default connect(mapStateToProps)(IngredientInfo)
