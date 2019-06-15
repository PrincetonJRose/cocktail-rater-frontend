import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Mainpage extends Component {

    render() {
        if (this.props.current_user) {
            return <Redirect to="/home"/>
        }
        return (
            <div>
                Mainpage
            </div>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        jwt_user: state.users.jwt_user,
        current_user: state.users.current_user,
    }
}

export default connect(mapStateToProps)(Mainpage)