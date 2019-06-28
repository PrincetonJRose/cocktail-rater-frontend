import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Image, Grid, GridRow, GridColumn, Menu, Button, Modal, Form, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Reviews from './Reviews'
import jwt_decode from 'jwt-decode'
import { createReview, getUser, getIngredient, createLike, deleteLike } from '../services/APICalls'
import ErrorModal from './ErrorModal'

class CocktailInfo extends Component {
    constructor() {
        super()
        this.state = {
            modalToggle: false,
            review: {},
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: "SET_INGREDIENT", ingredientData: null })
        this.resetIngredientData()
    }
    
    componentDidUpdate() {
        this.checkReviews(this.props.cocktail)
    }
    
    toggleModal =()=> {
        this.setState({ modalToggle: !this.state.modalToggle })
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
                this.setCocktail(data)
            }
        )})
    }

    setCocktail =(data)=> {
        if (data.errors || data.error) {
            if (data.errors) {
                this.props.dispatch({ type: "SET_ERRORS", errors: data.errors })
            } else {
                this.props.dispatch({ type: "SET_ERRORS", errors: data.error })
            }
        } else {
            this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
        }
    }

    listIngredients =(c)=> {
        let ingredients = []
        if (c.api_cocktail_id && c) {
            for (let i = 1; i < 16; i++) {
                let ing = {}
                if (c[`ingredient_${i}`] === '' || c[`ingredient_${i}`] === ' ' || c[`ingredient_${i}`] === null) {
                    break
                }
                ing.ingredient = c[`ingredient_${i}`]
                if (c[`measurement_${i}`] === '' || c[`measurement_${i}`] === ' ' || c[`measurement_${i}`] === null) {
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

    getIngredientInfo =(name)=> {
        let ingredient
        this.props.ingredients.map( i => {
            if (name.toLowerCase() === i.name.toLowerCase()) {
                ingredient = i
            }
        })
        if (ingredient) {
            getIngredient(ingredient.id).then(data => {
                this.props.dispatch({ type: "SET_INGREDIENT", ingredientData: data })
                this.resetIngredientData()
                this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: null })
            })
        }
    }

    resetIngredientData =()=> {
        this.props.dispatch({ type: "SET_MEASUREMENTS", measurementData: null })
        this.props.dispatch({ type: "SET_COCKTAIL_LIST", cocktailListData: null })
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
            avg = +((avg / c.reviews.length).toFixed(1))
        }
        return avg
    }

    checkUserLiked =()=> {
        let liked
        this.props.cocktail.likes.map( like => {
            if (this.props.jwt_user && like.user_id === jwt_decode(this.props.jwt_user).user_id) {
                liked = true
                this.props.dispatch({ type: "SET_USER_LIKE", userLike: like })
            }
        })
        if (this.props.userLike || liked) {
            return "heart"
        } else {
            return "empty heart"
        }
    }

    toggleLike =()=> {
        if (this.props.userLike) {
            deleteLike(this.props.userLike, this.props.jwt_user).then( data => {
                this.setCocktail(data)
                this.props.dispatch({ type: "SET_USER_LIKE", userLike: null })
            })
        } else {
            let like = {}
            like.user_id = jwt_decode(this.props.jwt_user).user_id
            if (this.props.cocktail.api_cocktail_id) {
                like.api_cocktail_info_id = this.props.cocktail.id
            } else {
                like.cocktail_id = this.props.cocktail.id
            }
            createLike(like, this.props.jwt_user).then( data => {
                this.setCocktail(data)
            })
        }
    }

    render() {
        
        const c = this.props.cocktail
        let ingredients = this.listIngredients(c)
        let average = this.getAverageRating(c)
        const ratings = [1,2,3,4,5,6,7,8,9,10].map( number => ({
            key: number,
            text: number,
            value: number,
        }))
        
        return (
            <Segment raised className="container" style={{ width: `100%`, height: `100%`, overflowY: `auto` }}>
                <Grid raised >
                    <GridRow centered>
                        <GridColumn textAlign="centered" centered width={8}>
                            <p></p>
                            <Segment style={{ borderStyle: `groove`, borderColor: `pink`, borderRadius: `12px` }}>
                                <h1><u>{c.name}</u></h1>
                            </Segment>
                        </GridColumn>
                    </GridRow>
                    <GridRow stretched centered >
                        <GridColumn width={12}>
                            <Segment raised className="container" style={{ borderStyle: `groove`, borderRadius: `12px`, borderColor: `pink`, alignItems: `center` }}>
                                <Image size="medium" spaced="left" fluid floated="left" src={c.imageUrl ? c.imageUrl : <span>No Image Provided</span>} style={{ borderStyle: `inset`, borderColor: `pink`, borderRadius: `12px`, marginLeft: `auto`, marginRight: `auto`, marginBottom: `auto`, marginTop: `auto`, display: `flex`, justifyContent: `center` }}/>
                                <Segment raised raised fluid style={{ marginLeft: `auto`, marginRight: `auto`, marginBottom: `auto`, marginTop: `auto`, display: `flex`, justifyContent: `center` }}>
                                    <Menu raised fluid vertical style={{ marginLeft: `auto`, marginRight: `auto`, marginBottom: `auto`, marginTop: `auto` }}>
                                        <Menu.Item ><b><u>Category</u>:</b> {'  ' + c.category}</Menu.Item>
                                        <Menu.Item><b><u>Alcoholic</u>?</b> {'  ' + c.alcoholic}</Menu.Item>
                                        <Menu.Item><b><u>Glass</u>:</b>{'  ' + c.glass}</Menu.Item>
                                        <Menu.Item><b><u>Video tutorial</u>?</b>{c.videoUrl ? c.videoUrl : <span>{'  '}No video provided.</span>}</Menu.Item>
                                        <Menu.Item ><b><u>Likes</u>:</b>{'  ' + c.likes.length}
                                            {
                                                this.props.current_user ?
                                                    <span style={{ justifyContent: `right`, textAlign: `right` }}>
                                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                                        <Button basic circular color="red" onClick={()=> this.toggleLike()} icon={this.checkUserLiked()} />
                                                    </span>
                                                : null
                                            }
                                        </Menu.Item>
                                        <Menu.Item><b><u>Reviews</u>:</b>{'  ' + c.reviews.length}</Menu.Item>
                                        <Menu.Item><b><u>Avg. Rating</u>:</b>{'  ' + average + ' / 10'}</Menu.Item>
                                    </Menu>
                                </Segment>
                            </Segment>
                        </GridColumn>
                    </GridRow>
                    <GridRow centered>
                        <GridColumn width={12}>
                            <Segment raised style={{ borderStyle: `groove`, borderRadius: `12px`, borderColor: `pink` }}>
                                <h3 style={{ textAlign: `center` }}><b><u>What you'll need</u>:</b></h3>
                                <div className="sub-content" style={{ textAlign: `center` }}>( Click an ingredient to see it's details )</div>
                                <Table raised singleLine celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell textAlign="center">Ingredient</Table.HeaderCell>
                                            <Table.HeaderCell textAlign="center">Measurement</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            ingredients.map( i => { 
                                                return (
                                                    <Table.Row onClick={()=> this.getIngredientInfo(i.ingredient)}>
                                                        <Table.Cell>{i.ingredient}</Table.Cell>
                                                        <Table.Cell>{i.measurement}</Table.Cell>
                                                    </Table.Row>
                                                )
                                            })
                                        }
                                    </Table.Body>
                                </Table>
                                <h3 style={{ textAlign: `center` }}><b><u>How to create</u>:</b></h3>
                                <p>{c.instructions}</p>
                            </Segment>
                        </GridColumn>
                    </GridRow>
                    {
                        this.props.current_user ?
                            <GridRow centered>
                                <GridColumn width={12} >
                                    <Segment raised style={{ borderStyle: `groove`, borderRadius: `12px`, borderColor: `pink` }}>
                                    <h3 style={{ textAlign: `center` }}><b><u>Reviews</u>:</b></h3>
                                        {
                                            <Reviews c={c}/>
                                        }
                                        <div><br></br></div>
                                        {
                                            this.props.userReview ?
                                                null
                                            :
                                                <Modal
                                                dimmer="blurring"
                                                size="large"
                                                closeIcon
                                                onClose={()=> this.toggleModal()} 
                                                open={this.state.modalToggle}
                                                trigger={<Button primary onClick={()=> this.toggleModal()}>Create Review</Button>}
                                                >
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
                                                        {
                                                            this.props.errors.length > 0 ?
                                                                <ErrorModal open={true} errors={this.state.errors} />
                                                            : null
                                                        }
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
                                    <Segment  style={{ borderStyle: `groove`, borderColor: `pink`, borderRadius: `12px` }}>
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
        userReview: state.cocktails.userReview,
        ingredients: state.ingredients.ingredients,
        userLike: state.cocktails.userLike,
        current_user: state.users.current_user,
        errors: state.users.errors,
    }
}

export default connect(mapStateToProps)(CocktailInfo)