import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Cocktails from './components/Cocktails'
import Ingredients from './components/Ingredients'
import Homepage from './components/Homepage'
import Register from './components/Register'
import Mainpage from './components/Mainpage'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getApiCocktails, getIngredients, getCocktails } from './services/APICalls'

class App extends Component {
  
  componentDidMount() {
    getApiCocktails().then(apiData => this.props.dispatch({ type: "SET_API_DATA", apiData: apiData }))
    getIngredients().then(ingredientData => this.props.dispatch({ type: "SET_INGREDIENTS", ingredientData: ingredientData }))
    getCocktails().then(cocktailData => this.props.dispatch({ type: "SET_COCKTAILS", cocktailData: cocktailData }))
    if (localStorage.getItem("jwt_user")) {
      this.props.dispatch({ type: "SET_AUTH" })
    }
  }

  render() {
    return (
      <div className="App container" style={{ backgroundImage: `url(./Cocktail-Backgrounds/pink-cocktail-background.jpg)`, backgroundSize: `cover`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, width: `100vw`, height: `100vh`, overflow: `hidden`}}>
        <NavBar />
        <Switch>
          <Route path="/cocktails" component={Cocktails} />
          <Route path="/ingredients" component={Ingredients} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Homepage} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Mainpage} />
        </Switch>
      </div>
    )
  }
}

let mapStateToProps =(state)=> {
  return {
    jwt_user: state.jwt_user
  }
}

export default connect(mapStateToProps)(App)