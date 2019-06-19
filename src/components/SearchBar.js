import React, { Component } from  'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Input, Search, } from 'semantic-ui-react'

class SearchBar extends Component {
    constructor() {
        super()
        this.state = { }
    }

    render() {
        return (
            <Segment verticalAlign="center">
                Coming Soon!!!
            </Segment>
        )
    }
}

let mapStateToProps =(state)=> {
    return {

    }
}

export default connect(mapStateToProps)(SearchBar)