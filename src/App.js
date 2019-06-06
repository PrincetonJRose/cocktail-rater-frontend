import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Cocktails from './components/Cocktails'
import Ingredients from './components/Ingredients'
import Homepage from './components/Homepage'
import Register from './components/Register'

export default class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundImage: `url(./Cocktail-Backgrounds/pink-cocktail-background.jpg)`, backgroundSize: `cover`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, width: `100vw`, height: `100vh`}}>
        <NavBar />
        <Switch>
          <Route path="/cocktails" component={Cocktails} />
          <Route path="/ingredients" component={Ingredients} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Homepage} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    )
  }
}
