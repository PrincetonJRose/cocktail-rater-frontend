import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Search } from 'semantic-ui-react'
import { connect } from 'react-redux'

class NavBar extends Component {
    render() {
        const menuClasses = `ui inverted pink menu`
        const iconClasses = `icon cocktail`
        return (
            <div className="container">
                <div className={menuClasses}>
                    <Link to={this.props.jwt_user ? "/home" : "/"} className="item">
                        <h2 className="ui header">
                            <i className={iconClasses}></i>
                            <div className="content">Cocktail Rater</div>
                            <div className="sub header">Come to taste. Come to rate.</div>
                        </h2>
                    </Link>
                    <div className="middle menu">
                        <Link to="/cocktails" className="item" style={{ color: 'black' }} >
                            <div className="content">Cocktails</div>
                        </Link>
                        <Link to="/ingredients" className="item" style={{ color: 'black' }} >
                            <div className="content">Ingredients</div>
                        </Link>
                    </div>
                    <div className="right menu">
                        <Search placeholder="Search..." className="item"/>
                        {
                        this.props.jwt_user ?
                        <Link to="/" className="item" style={{ color: 'black' }}
                                onClick={(e) => {
                                    localStorage.clear()
                                    this.props.dispatch({ type: "CLEAR_AUTH" })
                                    }} >
                                <div className="content">Logout</div>
                        </Link> 
                        :
                        <Link to="/login" className="item" style={{ color: 'black' }} >
                            <div className="content">Login</div>
                        </Link>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        jwt_user: state.users.jwt_user
    }
}

export default connect(mapStateToProps)(NavBar)