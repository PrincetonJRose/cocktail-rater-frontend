import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Image, Grid, GridRow, GridColumn, Menu, Button, Modal, Header, Icon, Form, Input, Select, Dropdown, DropdownMenu, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Reviews from './Reviews'
import jwt_decode from 'jwt-decode'
import { createReview, deleteReview, updateReview, getUser } from '../services/APICalls'

class CocktailInfo extends Component {
    constructor() {
        super()
        this.state = { modalToggle: false, review: {}, userLike: false}
    }
    
    componentDidUpdate() {
        this.checkReviews(this.props.cocktail)
    }
    
    toggleModal =()=> {
        this.setState({ modalToggle: !this.state.modalToggle })
    }
    
    handleEdit =()=> {
        updateReview(this.state.review, this.props.jwt_user).then(data => {
            this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
        })
    }
    
    handleCreate =()=> {
        getUser(jwt_decode(this.props.jwt_user).user_id).then( user => {
            let review = {...this.state.review, user_id: user.id, user_name: user.username }
            if (this.props.cocktail.api_cocktail_id) {
                review = { ...review, cocktail_id: null, api_cocktail_info_id: this.props.cocktail.id}
            } else {
                review = { ...review, cocktail_id: this.props.cocktail.id, api_cocktail_info_id: null}
            }
            createReview(review, this.props.jwt_user).then( data => {
                this.checkData(data)
            }
        )})
    }

    handleDelete =()=> {
        deleteReview(this.state.review, this.props.jwt_user).then( data => {
            this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
        })
    }

    checkData =(data)=> {
        if (data.error || data.errors) {
            
        } else {
            this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
        }
    }

    listIngredients =(c)=> {
        let ingredients = []
        if (c.api_cocktail_id && c) {
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
        } else if (c.id) {
            for (let i=0; i < c.ingredients.length; i++) {
                let ing = {}
                ing.ingredient = c.ingredients[i].name
                ing.measurement = c.cocktail_ingredients[i].measurement
                ingredients.push(ing)
            }
        }
        return ingredients
    }

    checkReviews =(c)=> {
        if (this.props.jwt_user) {
            if (c.reviews.length > 0 && this.props.userReview == null) {
                c.reviews.map( review => {
                    if (review.user_id === jwt_decode(this.props.jwt_user).user_id) {
                        this.props.dispatch({ type: "SET_USER_REVIEW", userReview: review })
                        this.setState({ review: review })
                    }
                })
            }
        }
    }

    getAverageRating =(c)=> {
        let avg = 0
        if (c.reviews.length > 0) {
            c.reviews.map( review => {
                avg += review.rating
            })
            avg = avg/c.reviews.length
        }
        return avg
    }

    render() {
        
        const c = this.props.cocktail
        let ingredients = this.listIngredients(c)
        
        this.checkReviews(c)
        let average = this.getAverageRating(c)
        const ratings = [1,2,3,4,5,6,7,8,9,10].map(number => ({
            key: number,
            text: number,
            value: number,
        }))
        
        return (
                <Segment inverted color="black"className="container" style={{ width: `100%`, height: `100%`, overflowY: `auto` }}>
            <Grid inverted color="black" >
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
                        <Image className="ui medium image" src={c.imageUrl ? c.imageUrl : <span>No Image Provided</span>} style={{ borderStyle: `inset` }}/>
                    </GridColumn>
                    <Segment textAlign="left" inverted color="black" floated="left" style={{ borderStyle: `inset`, borderRadius: `12px` }}>
                        <Menu fluid vertical inverted color="black">
                            <Menu.Item ><b><u>Category</u>:</b> {'  ' + c.category}</Menu.Item>
                            <Menu.Item><b><u>Alcoholic</u>?</b> {'  ' + c.alcoholic}</Menu.Item>
                            <Menu.Item><b><u>Glass</u>:</b>{'  ' + c.glass}</Menu.Item>
                            <Menu.Item><b><u>Video</u>?</b>{c.videoUrl ? c.videoUrl : <span>{'  '}No video provided.</span>}</Menu.Item>
                            <Menu.Item><b><u>Likes</u>:</b>{'  ' + c.likes.length} <Button basic color="red" circular icon="empty heart" /></Menu.Item>
                            <Menu.Item><b><u>Reviews</u>:</b>{'  ' + c.reviews.length}</Menu.Item>
                            <Menu.Item><b><u>Avg. Rating</u>:</b>{'  ' + average + ' / 10'}</Menu.Item>
                        </Menu>
                    </Segment>
                </GridRow>
                <GridRow centered>
                    <GridColumn width={12}>
                        <Segment inverted color="black" style={{ borderStyle: `inset`, borderRadius: `12px` }}>
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
                                <Segment inverted color="black" style={{ borderStyle: `inset`, borderRadius: `12px`, borderColor: `hot pink` }}>
                                <h3 style={{ textAlign: `center` }}><b><u>Reviews</u>:</b></h3>
                                    {
                                        <Reviews c={c}/>
                                    }
                                    <div><br></br></div>
                                            {
                                                this.props.userReview ?
                                                    <Modal dimmer="blurring" size="large" closeIcon onClose={()=> {
                                                        this.toggleModal()
                                                        this.props.dispatch({ type: "SET_USER_REVIEW", userReview: null })
                                                    }} basic inverted color="black" open={this.state.modalToggle} trigger={<Button primary onClick={()=> {
                                                        

                                                        this.toggleModal()
                                                        }}>Edit Your Review</Button>}>
                                                        <Modal.Header>Your review:</Modal.Header>
                                                        <Modal.Content scrolling>
                                                            <Form size="large">
                                                                <Form.Select label={<h3><b><u>Rating</u>:</b></h3>} placeholder={this.props.userReview.rating} options={ratings} onChange={(e, data) => this.setState({ review: {...this.state.review, rating: data.value} })} required error/>
                                                                <br></br>
                                                                <div><p></p></div>
                                                                <Form.TextArea label={<h3><b><u>Share your thoughts</u>!</b></h3>} type="text" fluid transparent name="Content:" placeholder={this.props.userReview.content} onChange={(e)=> this.setState({ review: {...this.state.review, content: e.target.value} })} required error/>
                                                            </Form>
                                                        </Modal.Content>
                                                        <Modal.Actions>
                                                            <Button positive onClick={()=>{
                                                                this.toggleModal()
                                                                this.handleEdit()
                                                                }}>Submit Changes!</Button>
                                                            <Button negative onClick={()=>{
                                                                this.toggleModal()
                                                                this.handleDelete()
                                                                }}>Delete Review</Button>
                                                        </Modal.Actions>
                                                    </Modal>
                                                :
                                                    <Modal dimmer="blurring" size="large" closeIcon onClose={()=> this.toggleModal()} basic inverted color="black" open={this.state.modalToggle} trigger={<Button primary onClick={()=> this.toggleModal()}>Create Review</Button>}>
                                                    <Modal.Header>Your review:</Modal.Header>
                                                    <Modal.Content scrolling>
                                                        <Form size="large">
                                                            <Form.Select label={<h3><b><u>Rating</u>:</b></h3>} placeholder='Choose rating...' options={ratings} onChange={(e, data) => this.setState({ review: {...this.state.review, rating: data.value} })} required/>
                                                            <br></br>
                                                            <div><p></p></div>
                                                            <Form.TextArea label={<h3><b><u>Share your thoughts</u>!</b></h3>} type="text" fluid transparent name="Content:" placeholder="Enter review here..." onChange={(e)=> this.setState({ review: {...this.state.review, content: e.target.value} })} required/>
                                                        </Form>
                                                    </Modal.Content>
                                                    <Modal.Actions>
                                                        <Button positive onClick={()=>{
                                                            this.toggleModal()
                                                            this.handleCreate()
                                                            }}>Submit Review!</Button>
                                                    </Modal.Actions>
                                                </Modal>
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
            </Segment>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        jwt_user: state.users.jwt_user,
        cocktail: state.cocktails.cocktail,
        userReview: state.cocktails.userReview
    }
}

export default connect(mapStateToProps)(CocktailInfo)