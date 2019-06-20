import React, { Component } from  'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Input, Search, } from 'semantic-ui-react'

class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            
        }
    }

    render() {
        return (
            <Segment textAlign="center" verticalAlign="center">
                <h1>Coming Soon!!!</h1>
            </Segment>
        )
    }
}

let mapStateToProps =(state)=> {
    return {

    }
}

export default connect(mapStateToProps)(SearchBar)