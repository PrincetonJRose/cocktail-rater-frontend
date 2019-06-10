import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Cocktails from './components/Cocktails'
import Ingredients from './components/Ingredients'
import Homepage from './components/Homepage'
import Register from './components/Register'
import Mainpage from './components/Mainpage'
import { Switch, Route, Redirect } from 'react-router-dom'
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
      <div className="App container" style={{ width: `100vw`, height: `100vh`, overflow: `hidden`}}>
        <NavBar />
        <Switch>
          <Route exact path="/cocktails/*" component={Cocktails} />
          <Route exact path="/cocktails" component={Cocktails} />
          {/* <Route exact path="/cocktails/" render={()=>(
                                              this.props.cocktail ? (
                                                <Redirect to={'/cocktails/' + this.props.cocktail.id}/>
                                                ):(
                                                <Cocktails/>))}/> */}
          <Route exact path="/ingredients/*" component={Ingredients} />
          <Route exact path="/ingredients" component={Ingredients} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Mainpage} />
        </Switch>
      </div>
    )
  }
}

let mapStateToProps =(state)=> {
  return {
    jwt_user: state.users.jwt_user,
    cocktail: state.cocktails.cocktail
  }
}

export default connect(mapStateToProps)(App)