import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Grid, Header, Icon, Image, Form, Modal, Dropdown } from 'semantic-ui-react'
import { createCocktail, updateCocktail, getCocktails } from '../services/APICalls'
import ErrorModal from './ErrorModal'
import jwt_decode from 'jwt-decode'

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
                videoURL: '',
                imageUrl: '',
                ingredients: [],
                measurements: [],
                cocktail_ingredients: [],
            },
            modalCreateOpen: false,
            filter: '',
            loading: false,
        }
    }
    
    componentWillReceiveProps() {
        this.setState({ modalCreateOpen: this.props.open, results: this.props.ingredients })
    }

    setAlcoholic = (e, { value }) => this.setState({ cocktail: {...this.state.cocktail, alcoholic: value} })

    handleCreateOpen =()=> this.setState({ modalCreateOpen: true })
    
    handleCreateClose =()=> {
        if (this.props.editCocktail) {
            this.props.dispatch({ type: "SET_EDIT_COCKTAIL", cocktailData: null })
            this.setState({
                cocktail: {
                    name: '',
                    alcoholic: '',
                    category: '',
                    instructions: '',
                    glass: '',
                    videoURL: '',
                    imageUrl: '',
                    ingredients: [],
                    measurements: [],
                    cocktail_ingredients: [],
                },
                modalCreateOpen: false,
                filter: '',
                loading: false,
            })
        }
        this.setState({ modalCreateOpen: false })
    }

    handleEditCocktail =()=> {
        updateCocktail(this.state.cocktail, this.props.jwt_user).then( data => {
            if (data.errors) {
                this.props.dispatch({ type: "SET_ERRORS", errors: data.errors })
                this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: null })
                this.setState({ loading: false })
            } else {
                this.props.dispatch({ type: "SET_COCKTAILS", cocktailData: data })
                this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: null })
                this.setState({ loading: false, modalCreateOpen: false })
            }
        })
    }
    
    handleCreateCocktail =()=> {
        createCocktail(this.state.cocktail, this.props.jwt_user).then( data => {
            if (data.errors || data.error) {
                if (data.errors) {
                    this.props.dispatch({ type: "SET_ERRORS", errors: data.errors })
                    this.setState({ loading: false })
                } else {
                    this.props.dispatch({ type: "SET_ERRORS", errors: data.error })
                    this.setState({ loading: false })
                }
            } else {
                this.props.dispatch({ type: "SET_COCKTAILS", cocktailData: data })
                this.setState({ loading: false, modalCreateOpen: false })
            }
        })
    }
    
    // filterIngredients =()=> {
    //     if (this.state.filter !== '') {
    //         let search = this.props.ingredients.filter(ingredient => {
    //             if (ingredient.name.toLowerCase().includes(this.state.filter.toLowerCase()) || (ingredient.category && ingredient.category.toLowerCase().includes(this.state.filter.toLowerCase())))
    //             return true
    //         })
    //         return search
    //     } else {
    //         return this.props.ingredients
    //     }
    // }

    render() {
        
        const categories = ["Milk / Float / Shake", "Cocktail", "Ordinary Drink", "Beer", "Homemade Liqueur", "Soft Drink / Soda", "Punch / Party Drink", "Coffee / Tea", "Shot", "Cocoa", "Other / Unknown"].map(choice => ({
            key: choice,
            text: choice,
            value: choice,
        }))

        const glasses = ["Beer mug", "White wine glass", "Old-fashioned glass", "Cocktail glass", "Champagne flute", "Beer pilsner", "Hurricane glass", "Collins glass", "Whiskey sour glass", "Martini Glass", "Highball Glass", "Balloon Glass", "Old-Fashioned glass", "Pint glass", "Nick and Nora Glass", "Irish coffee cup", "Punch bowl", "Coffee mug", "Shot glass", "Brandy snifter", "Margarita / Coupette glass", "Pousse cafe glass", "Shot Glass", "Coffee Mug", "Wine Glass", "Mason jar", "Champagne Flute", "Beer Glass", "Punch Bowl", "Jar", "Copper Mug", "Pitcher", "Parfait glass", "Margarita glass", "Cordial glass", "Coupe Glass"].map(choice => ({
            key: choice,
            text: choice,
            value: choice,
        }))

        // ingredients category list ["Beverage", "Fortified Wine", "Liquor", "Whisky", "Liqueur", "Brandy", nil, "Spirit", "Wine", "Whiskey", "Vodka", "Rum", "Syrup", "Fortified wine", "Aperitif", "Drink", "Fruit", "Cream", "Soft Drink", "Coffee", "Water", "Juice", "Beer", "Cider", "Schnapps", "liqueur", "Flower", "stout", "beverage"] 

        const alcoholic = this.state.cocktail.alcoholic

        return (
            <Modal
                raised 
                open={this.state.modalCreateOpen}
                onClose={this.handleCreateClose}
                closeIcon
                size="large"
                trigger={
                    <Grid textAlign="center">
                        <Grid.Column verticalAlign="middle" >
                            {
                                this.props.editCocktail && window.location.pathname.includes("/cocktails/edit") ?
                                    <Button size="huge" verticalAlign="middle" 
                                        onClick={()=> {
                                            let cocktail = {...this.props.editCocktail, measurements: []}
                                            cocktail.cocktail_ingredients.map( m => {
                                                cocktail.measurements.push(m.measurement)
                                            })
                                            this.setState({ cocktail: cocktail })
                                            this.handleCreateOpen()
                                            }}
                                    >
                                    <Icon name='cocktail' />Click here for a remix!!!</Button>
                                :
                                    <Button size="huge" verticalAlign="middle"  
                                        onClick={()=> {
                                            this.handleCreateOpen()
                                            }}
                                    >
                                    <Icon name='cocktail' />Click here if you're ready to start mixing!</Button>
                            }
                        </Grid.Column>
                    </Grid>
                }
            >
                {/* <Modal.Header>Add a new cocktail!</Modal.Header> */}
                <Modal.Content image scrolling>
                    <Image raised fluid size='medium' src={this.state.cocktail.imageUrl} wrapped />
                    <Modal.Description>
                        <Header raised >Enter Cocktail Information:</Header>
                        <Form raised loading={this.state.loading}>
                            <Form.Input  raised fluid label={`Cocktail's name`} placeholder={'Enter name here...'} onChange={(e)=>this.setState({ cocktail: {...this.state.cocktail, name: e.target.value} })} value={this.state.cocktail.name} required />
                            <Form.Group  raised widths='equal'>
                                <Form.Select label={`Category?`} options={categories} value={this.state.cocktail.category} placeholder='Type of drink' onChange={(e, data)=> this.setState({ cocktail: {...this.state.cocktail, category: data.value} }) } required />
                                <Form.Select label={`Drinking glass?`} options={glasses} value={this.state.cocktail.glass} placeholder='Type of glass' onChange={(e, data)=> this.setState({ cocktail: {...this.state.cocktail, glass: data.value} }) } required/>
                            </Form.Group>
                            <Form.Group inline>
                                <label>Alcohol content?&emsp;</label>
                                <Form.Radio
                                    raised 
                                    label='Alcoholic'
                                    value='Alcoholic'
                                    checked={alcoholic === 'Alcoholic'}
                                    onChange={this.setAlcoholic}
                                />
                                <Form.Radio
                                    raised 
                                    label='Non Alcoholic'
                                    value='Non Alcoholic'
                                    checked={alcoholic === 'Non Alcoholic'}
                                    onChange={this.setAlcoholic}
                                />
                                <Form.Radio
                                    raised 
                                    label='Optional'
                                    value='Optional'
                                    checked={alcoholic === 'Optional'}
                                    onChange={this.setAlcoholic}
                                />
                            </Form.Group>
                            <Form.Input raised onChange={(e)=> this.setState({ cocktail: {...this.state.cocktail, imageUrl: e.target.value } })} value={this.state.cocktail.imageUrl} label="Image:" />
                            <Form.Input raised onChange={(e)=> this.setState({ cocktail: {...this.state.cocktail, videoURL: e.target.value } })} value={this.state.cocktail.videoURL} label="Instructional video (optional)" />
                            <label><strong>Ingredients & Measurements:</strong></label>
                            <br></br>
                            <Dropdown 
                                placeholder='Choose flavors...'
                                raised 
                                fluid 
                                search // to allow filtered search... still not working 100%    search={()=>this.filterIngredients()}
                                onSearchChange={(e)=>this.setState({ filter: e.target.value }) }
                                multiple
                                selection
                                value={this.state.cocktail.ingredients}
                                options={this.props.ingredients.map( i => ({ key: i.name, text: i.name, value: i }) ) }
                                onChange={(e, data)=>{this.setState({ cocktail: {...this.state.cocktail, ingredients: data.value} })} }
                                required
                            />
                            <br></br>
                            {
                                this.state.cocktail.ingredients.map((i, index) => {
                                    return (
                                        <Form.Group>
                                            <Icon name="food" />
                                            <Icon name="beer" />
                                            <Form.Input label={i.name} placeholder="How much?" key={index} required onChange={(e)=> {
                                                let newMeasurements = this.state.cocktail.measurements
                                                newMeasurements[index] = e.target.value
                                                this.setState({ cocktail: {...this.state.cocktail, measurements: newMeasurements} })
                                            }} value={this.state.cocktail.measurements[index]} 
                                            />
                                        </Form.Group>
                                    )
                                })
                            }
                            <br></br>
                            <Form.TextArea raised label='Instructions:' value={this.state.cocktail.instructions} placeholder='How to mix this...' required onChange={(e)=> this.setState({ cocktail: {...this.state.cocktail, instructions: e.target.value} })}/>
                            <br></br>
                            <Form.Checkbox raised label='I acknowledge that this concoction is fun and amazing and ready to be shared!!!' required/>
                            <br></br>
                            <br></br>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {
                        this.props.editCocktail && window.location.pathname.includes("/cocktails/edit") ?
                            <Button raised positive onClick={()=> {
                                this.setState({ loading: true })
                                this.handleEditCocktail()
                            } }><Icon name="clipboard check"/>&emsp;Remix!&emsp;</Button>
                        :
                            <Button raised positive onClick={()=> {
                                this.setState({ loading: true })
                                this.handleCreateCocktail()
                            } }><Icon name="smile"/>&emsp;Bottoms up!&emsp;<Icon name="smile"/></Button>
                    }
                    {
                        this.props.errors.length > 0 ?
                            <ErrorModal open={true} errors={this.props.errors}/>
                        : null
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
        ingredients: state.ingredients.ingredients,
        errors: state.users.errors,
        editCocktail: state.cocktails.editCocktail,
    }
}

export default connect(mapStateToProps)(CreateCocktail)