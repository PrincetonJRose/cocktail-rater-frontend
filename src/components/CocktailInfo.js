import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Image, Grid, GridRow, GridColumn, Menu, Button, Modal, Header, Icon, Form, Input, Select, Dropdown, DropdownMenu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Reviews from './Reviews'
import jwt_decode from 'jwt-decode'
import { createReview, deleteReview, updateReview, getApiCocktail, getCocktail } from '../services/APICalls'

class CocktailInfo extends Component {
    constructor() {
        super()
        this.state = { rating: 0.0, content: '', modal_toggle: false }
    }
    
    getCocktailInfo(cocktail) {
        if (cocktail.api_cocktail_id) {
            getApiCocktail(cocktail.id).then(data => {
                this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
            })
        } else {
            getCocktail(cocktail.id).then(data => {
                this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
            })
        }
    }

    toggleModal =()=> {
        this.setState({ modal_toggle: !this.state.modal_toggle })
    }

    handleSubmit =()=> {
        console.log("Hiya")
    }

    render() {
        const c = this.props.cocktail
        const ratings = [1,2,3,4,5,6,7,8,9,10].map(number => ({
            key: number,
            text: number,
            value: number,
        }))
        const userReview = [false]
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
        if (this.props.jwt_user) {
            c.reviews.map( review => {
                if (review.user_id === jwt_decode(this.props.jwt_user).user_id) {
                    userReview[0] = true
                    userReview.push(review)
                }
            })
        }
        let avg = 0
        let avgRating = c.reviews.map( review => {
            avg += review.rating
        })
        avg = avg/c.reviews.length
            
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
                        <Menu fluid vertical inverted color="black">
                            <Menu.Item ><b><u>Category</u>:</b> {'  ' + c.category}</Menu.Item>
                            <Menu.Item><b><u>Alcoholic</u>?</b> {'  ' + c.alcoholic}</Menu.Item>
                            <Menu.Item><b><u>Glass</u>:</b>{'  ' + c.glass}</Menu.Item>
                            <Menu.Item><b><u>Video</u>?</b>{c.videoUrl ? c.videoUrl : <span>{'  '}No video provided.</span>}</Menu.Item>
                            <Menu.Item><b><u>Likes</u>:</b>{'  ' + c.likes.length} <Button basic color="red" circular icon="empty heart" /></Menu.Item>
                            <Menu.Item><b><u>Reviews</u>:</b>{'  ' + c.reviews.length}</Menu.Item>
                            <Menu.Item><b><u>Avg. Rating</u>:</b>{'  ' + avg + ' / 10'}</Menu.Item>
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
                                    <div><br></br></div>
                                            {
                                                userReview[0] ?
                                                    <Modal dimmer="blurring" size="large" closeIcon onClose={()=> this.toggleModal()} inverted color="black" open={this.state.modal_toggle} trigger={<Button primary onClick={()=> this.toggleModal()}>Edit Review</Button>}>
                                                        <Modal.Header>Your review:</Modal.Header>
                                                        <Modal.Content scrolling>
                                                            <Form size="large">
                                                                <Form.Select label={<h3><b><u>Rating</u>:</b></h3>} placeholder='Choose rating...' options={ratings} onChange={(e, data) => this.setState({rating: data.value})}/>
                                                                <br></br>
                                                                <div><p></p></div>
                                                                <Form.TextArea label={<h3><b><u>Share your thoughts</u>!</b></h3>} type="text" fluid transparent name="Content:" placeholder="Enter review here..." onChange={(e)=> this.setState({content: e.target.value})} required/>
                                                            </Form>
                                                        </Modal.Content>
                                                        <Modal.Actions>
                                                            <Button positive onClick={()=>{
                                                                this.toggleModal()
                                                                console.log("Heya")
                                                                }}>Submit Changes!</Button>
                                                            <Button negative onClick={()=>{console.log("Hiya")}}>Delete Review</Button>
                                                        </Modal.Actions>
                                                    </Modal>
                                                :
                                                <Button primary onClick={() => {console.log("hiya")}} content="Create Review" />
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