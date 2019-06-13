import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Input, Grid, Button, Segment, Header, Message } from 'semantic-ui-react'
import { createUser } from '../services/APICalls'

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
        }
    }

    handleSubmit =(e)=> {
        e.preventDefault()
        console.log(this.state.user)
        createUser(this.state)
            .then(data => {
                if (data.errors) {
                    console.log(data.errors)
                    this.setState({ errors: data.errors })
                } else {
                    // this.loginNewUser(data)
                    console.log(data, "Yay")
                }
            })
    }

    render() {
        if (this.props.jwt_user) {
            return <Redirect to="/home" />
        }
        return (
            <Grid textAlign='center' style={{ height: '90%', overflowY: `auto` }} verticalAlign='middle' >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='black' textAlign='center'>
                        <p><i className="icon cocktail"></i> Enter Account Information <i className = "icon cocktail"></i></p>
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit} error>
                            <Segment stacked>
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
                                placeholder='Username...' 
                                required  
                                onChange={(e) => this.setState({ user: {...this.state.user, username: e.target.value} })}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password...'
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
                            <Button color='green' fluid size='large' type="submit">
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