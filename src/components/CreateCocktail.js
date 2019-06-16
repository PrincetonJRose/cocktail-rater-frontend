import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Input, Search, Comment, Modal, Form } from 'semantic-ui-react'
import { deleteReview, updateReview } from '../services/APICalls'
import ErrorModal from './ErrorModal'

class CreateCocktail extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div>
                Creation
            </div>
        )
    }
}

let mapStateToProps =(state)=> {
    return {

    }
}

export default connect(mapStateToProps)(CreateCocktail)