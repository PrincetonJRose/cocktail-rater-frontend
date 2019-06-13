import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Image, Grid, GridRow, GridColumn, Menu, SegmentGroup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Reviews extends Component {

    render() {
        let c = this.props.c
        return (
            <div className="container" style={{ overflowY: `auto`, maxHeight: `45%`}} >
                {
                    c.reviews.map( review => {
                        return (
                            <div style={{ borderStyle: `dashed`, borderRadius: `12px`, borderColor: `purple` }}>
                                <div style={{ marginLeft: `10px`, marginRight: `10px` }}><b><u>User</u>:</b> {'  '}{review.user_name}</div>
                                <div style={{ marginLeft: `10px`, marginRight: `10px` }}><b><u>Rating</u>:</b> {'  '}{review.rating}</div>
                                <div style={{ marginLeft: `10px`, marginRight: `10px` }}><b><u>Content</u>:</b>{'  '}{review.content}</div>
                            </div>
                        )})
                }
            </div>
        )
    }
}

export default connect()(Reviews)