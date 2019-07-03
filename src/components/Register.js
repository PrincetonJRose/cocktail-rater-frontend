import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Grid, Button, Segment, Header, Message } from 'semantic-ui-react'
import { createUser, getUser } from '../services/APICalls'
import jwt_decode from 'jwt-decode'

class Register extends Component {
    constructor() {
        super()
        this.state = { 
            user: {
                email: '',
                password: '',
                password_confirmation: '',
                first_name: '',
                last_name: '',
                username: '',
                bio: '',
                img_url: '',
            },
            errors: [],
            loading: false,
        }
    }

    handleSubmit =(e)=> {
        e.preventDefault()
        createUser(this.state).then(data => {
            if (data.errors) {
                this.setState({ errors: data.errors, loading: false })
            } else {
                this.loginNewUser(data)
            }
        })
    }

    loginNewUser =(user)=> {
        fetch("https://cocktail-rater-api.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(this.state.user)
        })
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                this.setState({ errors: data.errors, loading: false })
            } else {
                getUser(jwt_decode(data.jwt_user).user_id).then( userData => {
                    localStorage.setItem("jwt_user", data.jwt_user)
                    this.props.dispatch({ type: "SET_AUTH" })
                    this.props.dispatch({ type: "SET_USER", user: userData })
                })
                this.props.history.push("/home")
            }
        })
    }

    render() {
        if (this.props.jwt_user) {
            return <Redirect to="/home" />
        }
        return (
            <Grid raised textAlign='center' style={{ height: '90%', overflowY: `auto` }} verticalAlign='middle' >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='black' textAlign='center'>
                            <p><i className="icon cocktail"></i> Enter Account Information <i className = "icon cocktail"></i></p>
                        </Header>
                        <Form raised loading={this.state.loading} size='large' onSubmit={(e)=> {this.handleSubmit(e);this.setState({loading: true}) }} error>
                            <Segment raised stacked>
                                {this.state.errors.map( error => {
                                    return <Message error content={error}/>
                                })}
                                <Form.Input 
                                    fluid 
                                    icon='user' 
                                    type="text" 
                                    name="email" 
                                    iconPosition='left' 
                                    placeholder='Email...' 
                                    required  
                                    onChange={(e) => this.setState({ user: {...this.state.user, email: e.target.value} })}
                                />
                                <Form.Input 
                                    fluid 
                                    icon='user' 
                                    type="text" 
                                    name="username" 
                                    iconPosition='left' 
                                    placeholder='Username (must be between 6-16 characters)' 
                                    required  
                                    onChange={(e) => this.setState({ user: {...this.state.user, username: e.target.value} })}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password (must be between 6-16 characters)'
                                    type='password'
                                    required
                                    onChange={(e) => this.setState({ user: {...this.state.user, password: e.target.value} })}
                                />
                                < Form.Input
                                    fluid
                                    icon = 'lock'
                                    iconPosition = 'left'
                                    placeholder = 'Confirm Password...'
                                    type = 'password'
                                    required
                                    onChange = { (e) => this.setState({ user: {...this.state.user, password_confirmation: e.target.value} })}
                                />
                                <Form.Input 
                                    fluid 
                                    icon='user' 
                                    type="text" 
                                    name="first_name" 
                                    iconPosition='left' 
                                    placeholder='First Name' 
                                    onChange={(e) => this.setState({ user: {...this.state.user, first_name: e.target.value} })}
                                />
                                <Form.Input 
                                    fluid 
                                    icon='user' 
                                    type="text" 
                                    name="last_name" 
                                    iconPosition='left' 
                                    placeholder='Last Name' 
                                    onChange={(e) => this.setState({ user: {...this.state.user, last_name: e.target.value} })}
                                />
                                <Form.TextArea 
                                    fluid
                                    placeholder='Tell everyone a bit about yourself...'
                                    type='text'
                                    onChange={(e)=>this.setState({ user: {...this.state.user, bio: e.target.value} })}
                                />
                                <Button color='pink' fluid size='large' type="submit">
                                    Create Account!
                                </Button>
                            </Segment>
                        </Form>
                </Grid.Column>
            </Grid>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        jwt_user: state.users.jwt_user
    }
}

export default connect(mapStateToProps)(Register)