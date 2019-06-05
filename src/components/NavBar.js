import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'semantic-ui-react'

export default class NavBar extends Component {
    constructor() {
        super()
    }
    
    render() {
        const menuClasses = `ui inverted pink menu`
        const iconClasses = `icon cocktail`
        return (
            <div className="container">
                <div className={menuClasses}>
                    <Link to="/" className="item">
                    <h2 className="ui header">
                        <i className={iconClasses}></i>
                        <div className="content">Cocktail Rater</div>
                        <div className="sub header">Come taste and rate!</div>
                    </h2>
                    </Link>
                    <div className="center menu">
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
                        localStorage.getItem("jwt_user") ?
                        <Link to="/" className="item" style={{ color: 'black' }}
                                onClick={(e) => localStorage.clear() } >
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