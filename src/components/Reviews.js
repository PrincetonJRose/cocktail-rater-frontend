import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Input, Search, Comment, Modal, Form } from 'semantic-ui-react'
import { deleteReview, updateReview } from '../services/APICalls'
import ErrorModal from './ErrorModal'

class Reviews extends Component {
    constructor() {
        super()
        this.state = { modalToggle: false, review: {}, errors: [] }
    }

    handleOpen =()=> this.setState({ modalToggle: true })
    handleClose =()=> this.setState({ modalToggle: false })

    handleDelete =()=> {
        deleteReview(this.state.review, this.props.jwt_user).then( data => {
            this.setCocktail(data)
        })
    }
    
    handleEdit =()=> {
        updateReview(this.state.review, this.props.jwt_user).then(data => {
            this.setCocktail(data)
        })
    }

    setCocktail =(data)=> {
        if (data.errors || data.error) {
            if (data.errors) {
                this.setState({ errors: data.errors })
            } else {
                this.setState({ errors: [...this.state.errors, data.error] })
            }
        } else {
            this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
            this.handleClose()
        }
    }

    render() {
        const ratings = [1,2,3,4,5,6,7,8,9,10].map(number => ({
            key: number,
            text: number,
            value: number,
        }))
        let c = this.props.c
        return (
            <Comment.Group>
                {c.reviews.map( review => {
                    return (
                        <Comment>
                            <Comment.Avatar circular src={review.user_avatar_image} />
                            <Comment.Content>
                            <Comment.Author as='a'>{review.user_name}</Comment.Author>
                            <Comment.Metadata>
                                <div>Rating: {review.rating}</div>
                            </Comment.Metadata>
                            <Comment.Text>{review.content}</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Show replies</Comment.Action>
                                <Comment.Action>Reply</Comment.Action>
                                { this.props.userReview && review.id === this.props.userReview.id ?
                                    <Comment.Action textAlign="right" onClick={()=> {
                                        this.setState({ review: this.props.userReview })
                                        this.handleOpen()
                                    }}>Edit</Comment.Action>
                                    : null
                                }
                                </Comment.Actions>
                            <Modal
                                dimmer="blurring"
                                size="large"
                                closeIcon
                                onClose={this.handleClose}
                                open={this.state.modalToggle}
                            >
                                <Modal.Header>Your review:</Modal.Header>
                                <Modal.Content scrolling>
                                    <Form size="large">
                                        <Form.Select label={<h3><b><u>Rating</u>:</b></h3>} value={this.state.review.rating} options={ratings} onChange={(e, data) => this.setState({ review: {...this.state.review, rating: data.value} })} required />
                                        <br></br>
                                        <div><p></p></div>
                                        <Form.TextArea label={<h3><b><u>Share your thoughts</u>!</b></h3>} type="text" fluid transparent name="Content:" value={this.state.review.content} onChange={(e)=> this.setState({ review: {...this.state.review, content: e.target.value} })} required />
                                    </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    { this.state.errors.length > 0 ?
                                        <ErrorModal open={true} errors={this.state.errors} />
                                        :
                                        null
                                    }
                                    <Button positive onClick={()=>{
                                        this.handleEdit()
                                    }}>Submit Changes!</Button>
                                    <Button negative onClick={()=>{
                                        this.handleDelete()
                                    }}>Delete Review</Button>
                                </Modal.Actions>
                            </Modal>
                            </Comment.Content>
                        </Comment>
                    )
                })}
            </Comment.Group>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        userReview: state.cocktails.userReview,
        jwt_user: state.users.jwt_user,
    }
}

export default connect(mapStateToProps)(Reviews)