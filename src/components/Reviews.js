import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Comment, Modal, Form, Image } from 'semantic-ui-react'
import { deleteReview, updateReview, createComment, updateComment, deleteComment } from '../services/APICalls'
import ErrorModal from './ErrorModal'
import jwt_decode from 'jwt-decode'

class Reviews extends Component {
    constructor() {
        super()
        this.state = {
            modalReviewEditToggle: false,
            modalCommentEditToggle: false,
            modalCommentCreateToggle: false,
            review: {},
            commentOnReview: {},
            comment: {
                content: '',
                review_id: null,
            },
            usersComments: [],
            showComments: [],
            loading: false,
        }
    }

    handleReviewEditOpen =()=> this.setState({ modalReviewEditToggle: true })
    handleReviewEditClose =()=> this.setState({ modalReviewEditToggle: false })
    handleEditCommentOpen =()=> this.setState({ modalCommentEditToggle: true })
    handleEditCommentClose =()=> this.setState({ modalCommentEditToggle: false })
    handleNewCommentOpen =()=> this.setState({ modalCommentCreateToggle: true, comment: { content: '', review_id: null } })
    handleNewCommentClose =()=> this.setState({ modalCommentCreateToggle: false })

    handleDelete =()=> {
        deleteReview(this.state.review, this.props.jwt_user).then( data => {
            this.setCocktail(data)
        })
    }
    
    handleUpdate =()=> {
        updateReview(this.state.review, this.props.jwt_user).then(data => {
            this.setCocktail(data)
            this.setState({ loading: false })
            this.handleReviewEditClose()
        })
    }

    handleCommentDelete =(comment)=> {
        deleteComment(comment, this.props.jwt_user).then( data => {
            this.setCocktail(data)
        })
    }

    handleCommentCreate =()=> {
        let comment = this.state.comment
        comment.review_id = this.state.commentOnReview.id
        createComment(comment, this.props.jwt_user).then(data => {
            this.setCocktail(data)
            this.setState({ loading: false })
            this.handleNewCommentClose()
        })
    }

    handleCommentEdit =()=> {
        updateComment(this.state.comment, this.props.jwt_user).then(data => {
            this.setCocktail(data)
            this.setState({ loading: false })
            this.handleEditCommentClose()
        })
    }


    setCocktail =(data)=> {
        if (data.errors || data.error) {
            if (data.errors) {
                this.props.dispatch({ type: "SET_ERRORS", errors: data.errors })
            } else {
                this.props.dispatch({ type: "SET_ERRORS", errors: data.error })
            }
        } else {
            this.props.dispatch({ type: "SET_COCKTAIL", cocktailData: data })
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
                                {
                                    this.state.showComments.includes(review) ?
                                        <Comment.Action onClick={()=>{
                                            let hide = this.state.showComments.filter( r => {
                                                if (r.id !== review.id)
                                                    return true
                                            })
                                            this.setState({ showComments: hide })
                                        }}>Hide replies</Comment.Action>
                                    :
                                        <Comment.Action onClick={()=>{
                                            let show = this.state.showComments
                                            show.push(review)
                                            this.setState({ showComments: show })
                                        }} >Show replies</Comment.Action>
                                }
                                <Comment.Action onClick={()=>{
                                    this.setState({ commentOnReview: review})
                                    this.handleNewCommentOpen()
                                }}>Reply</Comment.Action>
                                {
                                    this.props.userReview && review.id === this.props.userReview.id ?
                                    <Comment.Action textAlign="right" onClick={()=> {
                                        this.setState({ review: this.props.userReview })
                                        this.handleReviewEditOpen()
                                    }}>Edit</Comment.Action>
                                    : null
                                }
                                {
                                    this.props.userReview && review.id === this.props.userReview.id ?
                                    <Comment.Action textAlign="right" onClick={()=> {
                                        this.handleDelete()
                                    }}>Delete</Comment.Action>
                                    : null
                                }
                            </Comment.Actions>

                            <Modal
                                dimmer="blurring"
                                size="large"
                                closeIcon
                                onClose={this.handleReviewEditClose}
                                open={this.state.modalReviewEditToggle}
                            >
                                <Modal.Header>Your review:</Modal.Header>
                                <Modal.Content scrolling>
                                    <Form size="large" loading={this.state.loading}>
                                        <Form.Select label={<h3><b><u>Rating</u>:</b></h3>} value={this.state.review.rating} options={ratings} onChange={(e, data) => this.setState({ review: {...this.state.review, rating: data.value} })} required />
                                        <br></br>
                                        <div><p></p></div>
                                        <Form.TextArea label={<h3><b><u>Share your thoughts</u>!</b></h3>} type="text" fluid transparent name="Content:" value={this.state.review.content} onChange={(e)=> this.setState({ review: {...this.state.review, content: e.target.value} })} required />
                                    </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    { this.props.errors.length > 0 ?
                                        <ErrorModal open={true} errors={this.props.errors} />
                                        :
                                        null
                                    }
                                    <Button positive onClick={()=>{
                                        this.handleUpdate()
                                        this.setState({ loading: true })
                                    }}>Submit Changes!</Button>
                                </Modal.Actions>
                                </Modal>

                            <Modal
                                dimmer="blurring"
                                size="large"
                                closeIcon
                                onClose={this.handleNewCommentClose}
                                open={this.state.modalCommentCreateToggle}
                            >
                                <Modal.Header>Share your thoughts</Modal.Header>
                                <Modal.Content scrolling>
                                    <Modal.Description>
                                        <Image avatar src={this.state.commentOnReview.user_avatar_image} /> {this.state.commentOnReview.user_name}
                                        <p>{this.state.commentOnReview.content}</p>
                                    </Modal.Description>
                                    <div><p><br></br></p></div>
                                    <Form size="large" loading={this.state.loading}>
                                        <div><p></p></div>
                                        <Form.TextArea label={<h3><b><u>Make a comment</u>:</b></h3>} type="text" fluid transparent name="Content:" value={this.state.comment.content} onChange={(e)=> this.setState({ comment: {...this.state.comment, content: e.target.value} })} required />
                                    </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    { this.props.errors.length > 0 ?
                                        <ErrorModal open={true} errors={this.props.errors} />
                                        :
                                        null
                                    }
                                    <Button positive onClick={()=>{
                                        this.handleCommentCreate()
                                        this.setState({ loading: true })
                                    }}>Submit!</Button>
                                </Modal.Actions>
                            </Modal>

                            <Modal
                                dimmer="blurring"
                                size="large"
                                closeIcon
                                onClose={this.handleEditCommentClose}
                                open={this.state.modalCommentEditToggle}
                            >
                                <Modal.Header>Edit your comment</Modal.Header>
                                <Modal.Content scrolling>
                                    <Modal.Description>
                                        <Image avatar src={this.state.commentOnReview.user_avatar_image} /> {this.state.commentOnReview.user_name}
                                        <p>{this.state.commentOnReview.content}</p>
                                    </Modal.Description>
                                    <div><p><br></br></p></div>
                                    <Form size="large" loading={this.state.loading}>
                                        <div><p></p></div>
                                        <Form.TextArea label={<h3><b><u>New comment</u>:</b></h3>} type="text" fluid transparent name="Content:" value={this.state.comment.content} onChange={(e)=> this.setState({ comment: {...this.state.comment, content: e.target.value} })} required />
                                    </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    { this.props.errors.length > 0 ?
                                        <ErrorModal open={true} errors={this.props.errors} />
                                        :
                                        null
                                    }
                                    <Button positive onClick={()=>{
                                        this.handleCommentEdit()
                                        this.setState({ loading: true })
                                    }}>Submit Changes!</Button>
                                </Modal.Actions>
                            </Modal>

                            </Comment.Content>
                            {
                                this.state.showComments.includes(review) ?
                                    <Comment.Group>
                                        { review.comments.map( comment => {
                                            return (
                                                <Comment>
                                                    <Comment.Avatar src={comment.user_avatar_image} />
                                                    <Comment.Content>
                                                        <Comment.Author as='a'>{comment.user_name}</Comment.Author>
                                                        <Comment.Metadata>
                                                        <div></div>
                                                        </Comment.Metadata>
                                                        <Comment.Text>{comment.content}</Comment.Text>
                                                        <Comment.Actions>
                                                            {
                                                                comment.user_id === jwt_decode(this.props.jwt_user).user_id ?
                                                                <Comment.Action textAlign="right" onClick={()=> {
                                                                    this.setState({ comment: comment, commentOnReview: review })
                                                                    this.handleEditCommentOpen()
                                                                    }}>Edit</Comment.Action>
                                                                : null
                                                            }
                                                            {
                                                                comment.user_id === jwt_decode(this.props.jwt_user).user_id ?
                                                                <Comment.Action textAlign="right" onClick={()=> {
                                                                    this.handleCommentDelete(comment)
                                                                    }}>Delete</Comment.Action>
                                                                : null
                                                            }
                                                            <Comment.Action>
                                                                
                                                            </Comment.Action>
                                                        </Comment.Actions>
                                                    </Comment.Content>
                                                </Comment>
                                            )
                                        })}
                                    </Comment.Group>
                                : null
                            }
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
        errors: state.users.errors,
    }
}

export default connect(mapStateToProps)(Reviews)