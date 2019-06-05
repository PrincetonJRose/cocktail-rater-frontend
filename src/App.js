import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import { Switch, Route } from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundImage: `url(./Cocktail-Backgrounds/pink-cocktail-background.jpg)`, backgroundSize: `cover`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, width: `100vw`, height: `100vh`}}>
        <NavBar />
      </div>
    )
  }
}
