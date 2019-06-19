import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Cocktails from './components/Cocktails'
import Ingredients from './components/Ingredients'
import ProfilePage from './components/ProfilePage'
import Register from './components/Register'
import HomePage from './components/HomePage'
import SearchBar from './components/SearchBar'
import CreateCocktail from './components/CreateCocktail'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, getIngredients, getCocktails, getApiCocktails } from './services/APICalls'
import jwt_decode from 'jwt-decode'

class App extends Component {
  
  componentDidMount() {
    if (this.props.api_cocktails.length === 0 || this.props.custom_cocktails.length === 0) {
      getApiCocktails().then(apiData => this.props.dispatch({ type: "SET_API_DATA", apiData: apiData }))
      getCocktails().then(cocktailData => this.props.dispatch({ type: "SET_COCKTAILS", cocktailData: cocktailData }))
    }
    if (this.props.ingredients.length === 0) {
        getIngredients().then(ingredientData => this.props.dispatch({ type: "SET_INGREDIENTS", ingredientData: ingredientData }))
    }
    if (localStorage.getItem("jwt_user")) {
      this.props.dispatch({ type: "SET_AUTH" })
      getUser(jwt_decode(localStorage.getItem("jwt_user")).user_id).then( userData => {
        this.props.dispatch({ type: "SET_USER", user: userData })
      })
    }
    
  }

  render() {
    return (
      <div className="App container" style={{ width: `100vw`, height: `100vh`, overflow: `hidden`}}>
        <NavBar />
        <Switch>
          <Route exact path="/cocktails/new" component={CreateCocktail} />
          <Route exact path="/cocktails/edit" component={CreateCocktail} />
          <Route exact path="/cocktails/*" component={Cocktails} />
          <Route exact path="/cocktails" component={Cocktails} />
          {/* <Route exact path="/cocktails/" render={()=>(
                                              this.props.cocktail ? (
                                                <Redirect to={'/cocktails/' + this.props.cocktail.id}/>
                                                ):(
                                                <Cocktails/>))}/> */}
          <Route exact path="/ingredients/*" component={Ingredients} />
          <Route exact path="/ingredients" component={Ingredients} />
          <Route exact path="/search/*" component={SearchBar} />
          <Route exact path="/search" component={SearchBar} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/user_profile/*" component={ProfilePage} />
          <Route exact path="/user_profile" component={ProfilePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    )
  }
}

let mapStateToProps =(state)=> {
  return {
    jwt_user: state.users.jwt_user,
    ingredients: state.ingredients.ingredients,
    api_cocktails: state.cocktails.api_cocktails,
    custom_cocktails: state.cocktails.custom_cocktails
  }
}

export default connect(mapStateToProps)(App)