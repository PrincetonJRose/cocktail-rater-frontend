import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Grid, Header, Icon, Image, Menu, Segment, Card, Modal, Form, Message, } from 'semantic-ui-react'
import { getApiCocktail, getCocktail, updateUser } from '../services/APICalls'
import ErrorModal from './ErrorModal'

class Homepage extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                username: '',
                bio: '',
                img_url: '',
                password_confirmation: '',
            },
            loading: false,
            modalOpen: false,
            modalFormOpen: false,
            loading: false,
        }
    }

    handleOpen =()=> this.setState({ modalOpen: true })

    handleClose =()=> this.setState({ modalOpen: false })

    handleFormOpen =()=> this.setState({ modalFormOpen: true })

    handleFormClose =()=> this.setState({ modalFormOpen: false })
    
    getCocktailInfo(cocktail) {
        if (cocktail.api_cocktail_id) {
            getApiCocktail(cocktail.id).then(data => {
                this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
                this.resetUserReviewLike()
                this.props.history.push(`/cocktails/api/${data.id}`)
            })
        } else {
            getCocktail(cocktail.id).then(data => {
                this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
                this.resetUserReviewLike()
                this.props.history.push(`/cocktails/custom/${data.id}`)
            })
        }
    }

    editCocktailInfo(cocktail) {
        getCocktail(cocktail.id).then(data => {
            this.props.dispatch({ type: "SET_EDIT_COCKTAIL", cocktailData: data })
            this.props.history.push(`/cocktails/edit`)
        })
    }

    submitChanges =()=> {
        updateUser(this.state.user, this.props.jwt_user).then( data => {
            if (data.errors) {
                this.props.dispatch({ type: "SET_ERRORS", errors: data.errors })
            } else {
                this.props.dispatch({ type: "SET_USER", user: data })
                this.handleFormClose()
            }
            this.setState({ loading: false })
            this.handleClose()
        })
    }

    resetUserReviewLike =()=> {
        this.props.dispatch({ type: "SET_USER_REVIEW", userReview: null })
        this.props.dispatch({ type: "SET_USER_LIKE", userLike: null })
    }

    getFavorites =()=> {
        let favorites = []
        this.props.current_user.likes.map( like => {
            if (like.api_cocktail_info_id) {
                this.props.api_cocktails.map( cocktail => {
                    if (like.api_cocktail_info_id === cocktail.id)
                        favorites.push(cocktail)
                })
            } else {
                this.props.custom_cocktails.map( cocktail => {
                    if (like.cocktail_id === cocktail.id)
                        favorites.push(cocktail)
                })
            }
        })
        return favorites
    }

    getReviewed =()=> {
        let reviews = []
        this.props.current_user.reviews.map( review => {
            if (review.api_cocktail_info_id) {
                this.props.api_cocktails.map( cocktail => {
                    if (review.api_cocktail_info_id === cocktail.id)
                        reviews.push(cocktail)
                })
            } else {
                this.props.custom_cocktails.map( cocktail => {
                    if (review.cocktail_id === cocktail.id)
                        reviews.push(cocktail)
                })
            }
        })
        return reviews
    }

    render() {
        if (this.props.current_user) {
            return (
                <Segment style={{ padding: '4em 0em' }} vertical  verticalAlign='middle'>
                    <Grid container stackable verticalAlign='middle'>
                        <Grid.Row  verticalAlign='middle'>
                            <Grid.Column floated='left' width={6}  verticalAlign='middle'>
                                <Card raised floated="right"  verticalAlign='middle'>
                                    <Image size="medium" src={this.props.current_user.img_url} wrapped ui={false} />
                                    <Card.Content>
                                    <Card.Header textAlign="center">{this.props.current_user.username}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Joined: {this.props.current_user.created_at.split("T")[0]}</span>
                                    </Card.Meta>
                                    <Card.Meta>
                                        Email: {this.props.current_user.email}
                                    </Card.Meta>
                                    { (this.props.current_user.first_name && this.props.current_user.last_name) || this.props.current_user.first_name ?
                                    <Card.Description>
                                        Name: {this.props.current_user.first_name} {this.props.current_user.last_name ? <span>{' ' + this.props.current_user.last_name}</span> : null }
                                    </Card.Description>
                                    :
                                    null
                                    }
                                    <Card.Description>
                                        {this.props.current_user.bio}
                                    </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Modal
                                            raised 
                                            open={this.state.modalFormOpen}
                                            onClose={this.handleFormClose}
                                            closeIcon
                                            trigger={<a onClick={()=> {
                                                this.handleFormOpen()
                                                let user = this.props.current_user
                                                this.setState({ user: {...this.state.user, email: user.email, username: user.username, bio: user.bio, img_url: user.img_url, first_name: user.first_name, last_name: user.last_name} })
                                            }} 
                                        >
                                            <Icon name='user' />Edit Profile</a>}>
                                            <Modal.Header>Your Profile</Modal.Header>
                                            <Modal.Content image scrolling>
                                            <Image size='medium' src={this.state.user.img_url} wrapped />
                                            <Modal.Description>
                                                <Header>Update information:</Header>
                                                <Form fluid>
                                                    <Form.Input fluid onChange={(e)=> this.setState({ user: {...this.state.user, username: e.target.value} })} value={this.state.user.username} label="User name:" required/>
                                                    <Form.Input fluid onChange={(e)=> this.setState({ user: {...this.state.user, email: e.target.value} })} value={this.state.user.email} label="Email:" required/>
                                                    <Form.Input onChange={(e)=> this.setState({ user: {...this.state.user, img_url: e.target.value } })} value={this.state.user.img_url} label="Image:" required/>
                                                    <Form.Input onChange={(e)=> this.setState({ user: {...this.state.user, first_name: e.target.value} })} value={this.state.user.first_name} label="First name:" />
                                                    <Form.Input onChange={(e)=> this.setState({ user: {...this.state.user, last_name: e.target.value} })} value={this.state.user.last_name} label="Last name:" />
                                                    <Form.TextArea onChange={(e)=> this.setState({ user: {...this.state.user, bio: e.target.value} })} value={this.state.user.bio} label="What would you like for others to know about you?" />
                                                </Form>
                                            </Modal.Description>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                { this.props.errors.length > 0 ?
                                                    <ErrorModal open={true} errors={this.props.errors} />
                                                    :
                                                    null
                                                }
                                            <Modal
                                                raised 
                                                loading
                                                trigger={<Button positive onClick={this.handleOpen}>Submit Changes!</Button>}
                                                open={this.state.modalOpen}
                                                onClose={this.handleClose}
                                                basic
                                                closeIcon
                                                size='small'
                                            >
                                                <Header icon='user' content='Enter your password:' />
                                                <Modal.Content>
                                                    <Form loading={this.state.loading}>
                                                        <Form.Input
                                                            fluid
                                                            icon='lock'
                                                            iconPosition='left'
                                                            placeholder='Password...'
                                                            type='password'
                                                            required
                                                            onChange={(e) => this.setState({ user: {...this.state.user, password: e.target.value} })}
                                                        />
                                                    </Form>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                <Button color='green' onClick={()=> {
                                                    this.setState({ loading: true })
                                                    this.submitChanges()
                                                    }} inverted>
                                                    <Icon name='smile' /> Confirm!
                                                </Button>
                                                </Modal.Actions>
                                            </Modal>
                                            </Modal.Actions>
                                        </Modal>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column centered width={8} verticalAlign='middle'>
                                <Segment raised scrollable scrolling verticalAlign='middle'>
                                    <div className="content"><h3>Concoctions you've shared:</h3></div>
                                    <div className="sub-content"><p>&emsp;&emsp;( Click on one to edit it )</p></div>
                                        {
                                            this.props.current_user.cocktails.length > 0 ?
                                            <Menu fluid vertical>
                                                {this.props.current_user.cocktails.map( cocktail => {
                                                    return <Menu.Item onClick={() => this.editCocktailInfo(cocktail)}><Image floated="left" src={cocktail.imageUrl} avatar />{cocktail.name}</Menu.Item>
                                                })}
                                            </Menu>
                                            :
                                            <div className="sub-content">( Unlock your inner mad scientist, then get out there and start experimenting! )</div>
                                        }
                                        <br></br>
                                    <div className="content"><h3>Favorites:</h3></div>
                                        {
                                            this.props.current_user.likes.length > 0 ?
                                            <Menu raised fluid vertical>
                                                {this.getFavorites().map( cocktail => {
                                                    return <Menu.Item onClick={() => this.getCocktailInfo(cocktail)}><Image floated="left" src={cocktail.imageUrl} avatar />{cocktail.name}</Menu.Item>
                                                })}
                                            </Menu>
                                            :
                                            <div className="sub-content">( More drinking (responsibly!) needs to be happening! )</div>
                                        }
                                        <br></br>
                                    <div className="content"><h3>Reviewed:</h3></div>
                                    {
                                        this.props.current_user.reviews.length > 0 ?
                                        <Menu fluid vertical>
                                            {this.getReviewed().map( cocktail => {
                                                return <Menu.Item onClick={() => this.getCocktailInfo(cocktail)}><Image floated="left" src={cocktail.imageUrl} avatar />{cocktail.name}</Menu.Item>
                                            })}
                                        </Menu>
                                        :
                                        <div className="sub-content">( More sharing of the thoughts please! )</div>
                                    }
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            )
        } else {
            return <Redirect to="/" />
        }
    }
}

let mapStateToProps =(state)=> {
    return {
        jwt_user: state.users.jwt_user,
        current_user: state.users.current_user,
        api_cocktails: state.cocktails.api_cocktails,
        custom_cocktails: state.cocktails.custom_cocktails,
        errors: state.users.errors,
    }
}

export default connect(mapStateToProps)(Homepage)