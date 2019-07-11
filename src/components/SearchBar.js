import React, { Component } from  'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Input, Search, GridColumn, } from 'semantic-ui-react'

class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            
        }
    }

    render() {
        return (
            <Segment textAlign="center" verticalAlign="center">
                <Grid>
                    <GridColumn width={6}>
                    <h1>Coming Soon!!!</h1>
                    </GridColumn>
                    <GridColumn width={10}>
                        <h1>Hiya!!!!</h1>
                    </GridColumn>
                </Grid>
            </Segment>
        )
    }
}

let mapStateToProps =(state)=> {
    return {

    }
}

export default connect(mapStateToProps)(SearchBar)