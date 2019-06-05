import React, { Component } from 'react'
import { Form, Button, Input, Checkbox, Radio, Message } from 'semantic-ui-react'

export default class Login extends Component {
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
        }).then(res => res.json())
        .then(data => {
            if (data.errors) {
                this.setState({ errors: data.errors })
            } else {
                localStorage.setItem("jwt_user", data.jwt_user)
                this.props.history.push("/")
            }
        })
    }

    displayErrors =()=> {
        if (this.state.errors.length > 0) {
            return (
            <div className='form-errors'>
                <h3>Form Errors</h3>
                <ul>
                { this.state.errors.map(msg => <p style={{ color: `black` }}><b>{msg}</b></p>) }
                </ul>
            </div>
            )
        } else {
            return null;
        }
    }

    render =()=>
        <form className="ui form" onSubmit={this.handleSubmit} style={{ width: `25%`, display: `inline-block`, margin: `auto auto` }} >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            { this.displayErrors() }
            <div className="field">
                <label><h2>Email:</h2></label>
                <input type="text" name="email" placeholder="Email..."
                onChange={(e) => this.setState({ email: e.target.value })} required />
            </div>
            <div className="field">
                <label><h2>Password:</h2></label>
                <input type="password" name="password" placeholder="Password..."
                onChange={(e) => this.setState({ password: e.target.value })} required />
            </div>
            <button className="ui button" type="submit">Submit</button>
        </form>
}