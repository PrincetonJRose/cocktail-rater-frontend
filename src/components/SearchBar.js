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
            <div>
                <Search />
            </div>
        )
    }
}

let mapStateToProps =(state)=> {
    return {

    }
}

export default connect(mapStateToProps)(Search)