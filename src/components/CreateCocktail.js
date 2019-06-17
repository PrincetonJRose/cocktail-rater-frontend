import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Input, Search, Comment, Form, Modal } from 'semantic-ui-react'
import { createCocktail, updateCocktail } from '../services/APICalls'
import ErrorModal from './ErrorModal'

class CreateCocktail extends Component {
    constructor() {
        super()
        this.state = {
            cocktail: {
                name: '',
                alcoholic: '',
                category: '',
                instructions: '',
                glass: '',
                videoUrl: '',
                imageUrl: '',
            },
            cocktail_ingredients: [],
            errors: [],
            modalCreateOpen: false,
        }
    }
    
    componentWillReceiveProps() {
        this.setState({ modalCreateOpen: this.props.open })
    }

    setAlcoholic = (e, { value }) => this.setState({ cocktail: {...this.state.cocktail, alcoholic: value} })

    handleCreateOpen =()=> this.setState({ modalCreateOpen: true })
    handleCreateClose =()=> this.setState({ modalCreateOpen: false })

    handleChange = (e) => {
        if (["ingredient", "measurement"].includes(e.target.className) ) {
            let cocktail_ingredients = [...this.state.cocktail_ingredients]
            cocktail_ingredients[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ cocktail_ingredients }, () => console.log(this.state.cocktail_ingredients))
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }
    
    addIngredient = (e) => {
        this.setState((prevState) => ({
                cocktail_ingredients: [...prevState.cocktail_ingredients, {ingredient: {}, measurement: ""}],
        }));
    }

    ingredientList =()=> {
        let ingredients = this.state.cocktail_ingredients.map((val, idx)=> {
            let iId = `ingredient-${idx}`, mId = `measurement-${idx}`
            return (
                <div key={idx}>
                    <label htmlFor={iId}>{`Ingredient #${idx + 1}`}</label>
                    <input
                    type="text"
                    name={iId}
                    data-id={idx}
                    id={iId}
                    value={this.state.cocktail_ingredients[idx].ingredient} 
                    className="ingredient"
                    onChange={this.handleChange}
                    />
                    <label htmlFor={mId}>How much?</label>
                    <input
                    type="text"
                    name={mId}
                    data-id={idx}
                    id={mId}
                    value={this.state.cocktail_ingredients[idx].measurement} 
                    className="measurement"
                    onChange={this.handleChange}
                    />
                </div>
            )
        })
        return ingredients
    }

    render() {
        
        const categories = ["Milk / Float / Shake", "Cocktail", "Ordinary Drink", "Beer", "Homemade Liqueur", "Soft Drink / Soda", "Punch / Party Drink", "Coffee / Tea", "Shot", "Cocoa", "Other / Unknown"].map(choice => ({
            key: choice,
            text: choice,
            value: choice,
        }))

        const glasses = ["Beer mug", "White wine glass", "Collins Glass", "Highball glass", "Old-fashioned glass", "Cocktail glass", "Champagne flute", "Beer pilsner", "Hurricane glass", "Collins glass", "Whiskey sour glass", "Martini Glass", "Highball Glass", "Balloon Glass", "Old-Fashioned glass", "Pint glass", "Cocktail Glass", "Nick and Nora Glass", "Irish coffee cup", "Punch bowl", "Coffee mug", "Shot glass", "Brandy snifter", "Margarita / Coupette glass", "Pousse cafe glass", "Shot Glass", "Coffee Mug", "Wine Glass", "Mason jar", "Champagne Flute", "Beer Glass", "Punch Bowl", "Jar", "Copper Mug", "Pitcher", "Parfait glass", "Margarita glass", "Cordial glass", "Coupe Glass"].map(choice => ({
            key: choice,
            text: choice,
            value: choice,
        }))
        const alcoholic = this.state.cocktail.alcoholic

        let {owner, description, cats} = this.state

        return (
            <Modal 
                open={this.state.modalCreateOpen}
                onClose={this.handleCreateClose}
                closeIcon
                trigger={
                    <Grid textAlign="center">
                        <Grid.Column verticalAlign="middle" >
                            <Button size="huge" verticalAlign="middle"  onClick={()=> {this.handleCreateOpen()}} >
                            <Icon name='cocktail' />Click here if you're ready to start mixing!</Button>
                        </Grid.Column>
                    </Grid>
                }
            >
                {/* <Modal.Header>Add a new cocktail!</Modal.Header> */}
                <Modal.Content image scrolling>
                <Image size='medium' src={this.state.cocktail.imageUrl} wrapped />
                <Modal.Description>
                    <Header>Enter Cocktail Information:</Header>
                    <Form>
                        <Form.Input fluid label={`Cocktail's name`} placeholder={'Enter name here...'} onChange={(e)=>this.setState({ cocktail: {...this.state.cocktail, name: e.target.value} })} required />
                        <Form.Group widths='equal'>
                            <Form.Select label={`Category?`} options={categories} placeholder='Type of drink' onChange={(e, data)=> this.setState({ cocktail: {...this.state.cocktail, category: data.value} }) } required />
                            <Form.Select label={`Drinking glass?`} options={glasses} placeholder='Type of glass' onChange={(e, data)=> this.setState({ cocktail: {...this.state.cocktail, category: data.value} }) } required/>
                        </Form.Group>
                        <Form.Group inline>
                        <label>Alcoholic? </label>
                            <Form.Radio
                                label='Alcoholic'
                                value='Alcoholic'
                                checked={alcoholic === 'Alcoholic'}
                                onChange={this.setAlcoholic}
                            />
                            <Form.Radio
                                label='Non Alcoholic'
                                value='Non Alcoholic'
                                checked={alcoholic === 'Non Alcoholic'}
                                onChange={this.setAlcoholic}
                            />
                            <Form.Radio
                                label='Optional'
                                value='Optional'
                                checked={alcoholic === 'Optional'}
                                onChange={this.setAlcoholic}
                            />
                        </Form.Group>
                        <Form.Input onChange={(e)=> this.setState({ cocktail: {...this.state.cocktail, imageUrl: e.target.value } })} value={this.state.cocktail.imageUrl} label="Image:" />
                            <label><strong>Ingredients & Measurements:</strong></label>
                            { this.state.cocktail_ingredients.length > 0 ?
                                <div>
                                {this.ingredientList().map( ci => {
                                    return ci
                                })}
                                </div>
                                : null
                            }
                            { this.state.cocktail_ingredients.length < 15 ?
                                <div><Button icon="plus" onClick={this.addIngredient}></Button></div>
                                : null
                            }
                            <br></br>
                        <Form.TextArea label='Instructions:' placeholder='How to mix this...' />
                        <br></br>
                        <Form.Checkbox label='I acknowledge that this cocktail is fun and amazing and ready to be shared!' />
                        <Form.Button positive>Submit!</Form.Button>
                    </Form>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    { this.state.errors.length > 0 ?
                        <ErrorModal open={true} errors={this.state.errors} />
                        :
                        null
                    }

                </Modal.Actions>
            </Modal>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        current_user: state.users.current_user,
        jwt_user: state.users.jwt_user,
    }
}

export default connect(mapStateToProps)(CreateCocktail)