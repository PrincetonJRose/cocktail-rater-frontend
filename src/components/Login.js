import React, { Component } from 'react'
import { Form, Button, Message, Grid, Segment, Header } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: [],
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
                this.setState({ errors: data.errors })
            } else {
                localStorage.setItem("jwt_user", data.jwt_user)
                this.props.dispatch({ type: "SET_AUTH" })
                this.props.history.push("/home")
            }
        })
        e.target.reset()
    }

    render() {
        if (this.props.jwt_user) {
            return <Redirect to="/home"/>
        }
        return (
            <Grid textAlign='center' style={{ height: '90%' }} verticalAlign='middle' >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='black' textAlign='center'>
                        <i className="icon cocktail"></i> Enter Account Information
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
                                New to the site? Click <Link to="/register"><span>here</span></Link> to sign up!
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