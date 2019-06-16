import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode'

class NavBar extends Component {
    render() {
        const menuClasses = `ui inverted pink menu`
        const iconClasses = `icon cocktail`
        return (
            <div className="container">
                <div className={menuClasses}>
                    <Link to="/home" className="item">
                        <h2 className="ui header">
                            <i className={iconClasses}></i>
                            <div className="content">Taste & Rate</div>
                            <div className="sub header" style={{ textAlign: `center` }}>Come to taste. Stay to rate.</div>
                        </h2>
                    </Link>
                    <div className="middle menu">
                        <Link to="/cocktails/" className="item" style={{ color: 'black' }} >
                            <div className="content">Cocktails</div>
                        </Link>
                        <Link to="/ingredients/" className="item" style={{ color: 'black' }} >
                            <div className="content">Ingredients</div>
                        </Link>
                    </div>
                    <div className="right menu">
                        { this.props.current_user?
                            <Link to={`/user_profile/${jwt_decode(this.props.jwt_user).user_id}`} className="item" >
                                <div className="content" style={{ color: `black` }}>
                                    <Image src={this.props.current_user.img_url} avatar/>{'  '}{this.props.current_user.username}
                                </div>
                            </Link>
                        :
                            null
                        }
                        <Link to="/search/" className="item" style={{ color: `black` }} >
                            <div className="content">Search <i className="icon search"></i></div>
                        </Link>
                        {
                            this.props.current_user ?
                            <Link to="/home" className="item" style={{ color: 'black' }}
                                    onClick={(e) => {
                                        localStorage.clear()
                                        this.props.dispatch({ type: "CLEAR_USER" })
                                        this.props.dispatch({ type: "CLEAR_AUTH" })
                                        this.props.dispatch({ type: "SET_USER_REVIEW", userReview: null })
                                        this.props.dispatch({ type: "SET_USER_LIKE", userLike: null })
                                        this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: null })
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
        jwt_user: state.users.jwt_user,
        current_user: state.users.current_user
    }
}

export default connect(mapStateToProps)(NavBar)