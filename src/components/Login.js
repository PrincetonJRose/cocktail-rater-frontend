import React, { Component } from 'react'
import { Form, Button, Message, Grid, Segment, Header } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../services/APICalls'
import jwt_decode from 'jwt-decode'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: [],
            loading: false
        }
    }

    handleSubmit =(e)=> {
        e.preventDefault()
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state)
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
                    this.props.history.push(`/user_profile/${this.props.jwt_user}`)
                })
            }
        })
        e.target.reset()
    }

    render() {
        if (this.props.jwt_user) {
            return <Redirect to="/home"/>
        }
        return (
            <Grid raised textAlign='center' style={{ height: '90%' }} verticalAlign='middle' >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='black' textAlign='center'>
                        Enter Account Information <i className="icon cocktail"></i>
                        </Header>
                        <Form raised loading={this.state.loading} size='large' onSubmit={(e)=> {this.handleSubmit(e);this.setState({ loading: true }) }} error>
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
                                onChange={(e) => this.setState({ email: e.target.value })}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password...'
                                type='password'
                                required
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                            <Button color='pink' fluid size='large' type="submit">
                                Login
                            </Button>
                            </Segment>
                            <Message>
                                New to the site? Click <Link to="/register"><span><u>here</u></span></Link> to sign up!
                            </Message>
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

export default connect(mapStateToProps)(Login)