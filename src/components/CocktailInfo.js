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
        this.state = { modalToggle: false, userReview: false, review: {}}
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

    }

    handleDelete =()=> {

    }

    render() {
        const ratings = [1,2,3,4,5,6,7,8,9,10].map(number => ({
            key: number,
            text: number,
            value: number,
        }))
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

        if (this.props.jwt_user && c.reviews.length > 0 && this.state.userReview === false) {
            c.reviews.map( review => {
                if (review.user_id === jwt_decode(this.props.jwt_user).user_id) {
                    this.setState({ review: review, userReview: true })
                }
            })
        } else if (c.reviews.length === 0 && this.state.userReview) {
            this.setState({ userReview: false })
        }
        
        console.log(c.reviews.length, this.state.userReview)
        
        let avg = 0
        c.reviews.map( review => {
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
                                                this.state.userReview ?
                                                    <Modal dimmer="blurring" size="large" closeIcon onClose={()=> this.toggleModal()} inverted color="black" open={this.state.modalToggle} trigger={<Button primary onClick={()=> this.toggleModal()}>Edit Your Review</Button>}>
                                                        <Modal.Header>Your review:</Modal.Header>
                                                        <Modal.Content scrolling>
                                                            <Form size="large">
                                                                <Form.Select label={<h3><b><u>Rating</u>:</b></h3>} placeholder={this.state.review.rating} options={ratings} onChange={(e, data) => this.setState({ review: {...this.state.review, rating: data.value} })} required/>
                                                                <br></br>
                                                                <div><p></p></div>
                                                                <Form.TextArea label={<h3><b><u>Share your thoughts</u>!</b></h3>} type="text" fluid transparent name="Content:" placeholder={this.state.review.content} onChange={(e)=> this.setState({ review: {...this.state.review, content: e.target.value} })} required/>
                                                            </Form>
                                                        </Modal.Content>
                                                        <Modal.Actions>
                                                            <Button positive onClick={()=>{
                                                                this.toggleModal()
                                                                this.handleEdit(c)
                                                                }}>Submit Changes!</Button>
                                                            <Button negative onClick={()=>{
                                                                this.toggleModal()
                                                                this.handleDelete(c)
                                                                }}>Delete Review</Button>
                                                        </Modal.Actions>
                                                    </Modal>
                                                :
                                                    <Modal dimmer="blurring" size="large" closeIcon onClose={()=> this.toggleModal()} inverted color="black" open={this.state.modalToggle} trigger={<Button primary onClick={()=> this.toggleModal()}>Create Review</Button>}>
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
                                                            this.handleCreate(c)
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
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        jwt_user: state.users.jwt_user,
        cocktail: state.cocktails.cocktail
    }
}

export default connect(mapStateToProps)(CocktailInfo)