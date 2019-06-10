import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Register extends Component {

    render() {
        if (this.props.jwt_user) {
            return <Redirect to="/home" />
        }
        return (
            <div>
                Register
            </div>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        jwt_user: state.users.jwt_user
    }
}

export default connect(mapStateToProps)(Register)