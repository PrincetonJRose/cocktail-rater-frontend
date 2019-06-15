import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Input, Search, } from 'semantic-ui-react'

class Reviews extends Component {
    constructor() {
        super()
        this.state = { }
    }

    render() {
        let c = this.props.c
        return (
            <div className="container" style={{ overflowY: `auto`, maxHeight: `45%`}} >
                {
                    c.reviews.map( review => {
                        return (
                            <div style={{ borderStyle: `double`, borderRadius: `12px`, borderColor: `pink` }}>
                                <div style={{ marginLeft: `10px`, marginRight: `10px` }}><Image src={review.user_avatar_image} avatar />{'  '}{review.user_name}</div>
                                <div style={{ marginLeft: `10px`, marginRight: `10px` }}><b><u>Rating</u>:</b> {'  '}{review.rating}</div>
                                <div style={{ marginLeft: `10px`, marginRight: `10px` }}><b>=>&emsp;</b>{'  '}{review.content}</div>
                            </div>
                        )})
                }
            </div>
        )
    }
}

let mapStateToProps =(state)=> {
    return {

    }
}

export default connect(mapStateToProps)(Reviews)