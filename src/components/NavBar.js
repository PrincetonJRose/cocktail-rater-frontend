import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default function NavBar (props) {
    const menuClasses = `ui inverted pink menu`
    const iconClasses = `icon cocktail`

    return (
        <div className={menuClasses}>
            <Link to="/" className="item">
            <h2 className="ui header">
                <i className={iconClasses}></i>
                <div className="content">Cocktail Rater</div>
                <div className="sub header">Come to taste and rate!</div>
            </h2>
            </Link>
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
            <Link to="/about" className="item" style={{ color: 'black' }} >
            <div className="content">About</div>
            </Link>
        </div>
    )
}