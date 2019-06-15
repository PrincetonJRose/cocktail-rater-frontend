import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Homepage extends Component {
    
    render() {
        if (this.props.current_user) {
            return (
                <div>
                    Homepage
                </div>
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
    }
}

export default connect(mapStateToProps)(Homepage)