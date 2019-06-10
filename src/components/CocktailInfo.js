import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Image, Grid, GridRow, GridColumn, Menu, SegmentGroup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Reviews from './Reviews'

class CocktailInfo extends Component {
    
    render() {
        const c = this.props.cocktail
        let ingredients = []
        if (this.props.cocktail.api_cocktail_id) {
            for (let i = 1; i < 16; i++) {
                let ing = {}
                if (c[`ingredient_${i}`] == '' || c[`ingredient_${i}`] == ' ' || c[`ingredient_${i}`] == null) {
                    break
                }
                ing.ingredient = c[`ingredient_${i}`]
                if (c[`measurement_${i}`] == '' || c[`measurement_${i}`] == ' ' || c[`measurement_${i}`] == null) {
                    ing.measurement = "No measurement given."
                } else {
                    ing.measurement = c[`measurement_${i}`]
                }
                ingredients.push(ing)
            }
        } else {
            for (let i=0; i < c.ingredients.length; i++) {
                let ing = {}
                ing.ingredient = c.ingredients[i].name
                ing.measurement = c.cocktail_ingredients[i].measurement
                ingredients.push(ing)
            }
        }

        return (
            <Grid className="container" style={{ width: `100%`, height: `100%`, overflowY: `auto` }}>
                <GridRow centered>
                    <GridColumn textAlign="centered" centered width={8}>
                        <p></p>
                        <Segment inverted color="black">
                            <h1><u>{c.name}</u></h1>
                        </Segment>
                    </GridColumn>
                </GridRow>
                <GridRow stretched centered >
                    <GridColumn width={7}>
                        <Image className="ui medium image" src={c.imageUrl ? c.imageUrl : <span>No Image Provided</span>} style={{ borderStyle: `groove` }}/>
                    </GridColumn>
                    <Segment textAlign="left" inverted color="black" floated="left">
                        <Menu fluid vertical >
                            <Menu.Item ><b><u>Category</u>:</b> {'  ' + c.category}</Menu.Item>
                            <Menu.Item><b><u>Alcoholic</u>?</b> {'  ' + c.alcoholic}</Menu.Item>
                            <Menu.Item><b><u>Glass</u>:</b>{'  ' + c.glass}</Menu.Item>
                            <Menu.Item><b><u>Video</u>?</b>{c.videoUrl ? c.videoUrl : <span>{'  '}No video provided.</span>}</Menu.Item>
                            <Menu.Item><b><u>Likes</u>:</b>{'  ' + c.likes.length}</Menu.Item>
                            <Menu.Item><b><u>Reviews</u>:</b>{'  ' + c.reviews.length}</Menu.Item>
                            <Menu.Item><b><u>Avg. Rating</u>:</b>{'  ' + c.likes.length}</Menu.Item>
                        </Menu>
                    </Segment>
                </GridRow>
                <GridRow centered>
                    <GridColumn width={12}>
                        <Segment inverted color="black" style={{  }}>
                            <h3 style={{ textAlign: `center` }}><b><u>What's required</u></b></h3>
                            <table border="1" style={{ width: `100%`, borderStyle: `dotted` }}>
                                <tr>
                                    <th style={{ textAlign:`center`, width:"50%" }}>Ingredients:</th>
                                    <th style={{ textAlign:`center`, width:"50%" }}>Measurements:</th>
                                </tr>
                                {
                                    ingredients.map( i => { 
                                        return (
                                            <tr>
                                                <td style={{ width:"50%" }}>{i.ingredient}</td>
                                                <td style={{ width:"50%" }}>{i.measurement}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                            <h3 style={{ textAlign: `center` }}><b><u>How to create</u></b></h3>
                            <p>{c.instructions}</p>
                        </Segment>
                    </GridColumn>
                </GridRow>
                {
                    this.props.jwt_user ?
                        <GridRow centered>
                            <GridColumn width={12} >
                                <Segment inverted color="black" >
                                <h3 style={{ textAlign: `center` }}><b><u>Reviews</u>:</b></h3>
                                    {
                                        <Reviews c={c}/>
                                    }
                                </Segment>
                            </GridColumn>
                        </GridRow>
                    :
                        <GridRow centered>
                            <GridColumn width={12} >
                                <Segment inverted color="black" >
                                    <h3 style={{ textAlign: `center` }}><b>To see and write reviews you must be <Link to="/login" ><u>logged</u></Link> in.</b></h3>
                                    <h3 style={{ textAlign: `center` }}><b>Don't have an account? You can click  <Link to="/register" ><u>here</u></Link> to create one.</b></h3>
                                </Segment>
                            </GridColumn>
                        </GridRow>
                }
            </Grid>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        jwt_user: state.users.jwt_user
    }
}

export default connect(mapStateToProps)(CocktailInfo)