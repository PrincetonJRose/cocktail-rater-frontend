import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Input, Search, Card, Modal, Form, Message, } from 'semantic-ui-react'

class Homepage extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                username: '',
                bio: '',
                img_url: '',
            },
            errors: [],
            loading: false,
            modalOpen: false,
            modalFormOpen: false,
            loading: false,
        }
    }

    handleOpen =()=> this.setState({ modalOpen: true })

    handleClose =()=> this.setState({ modalOpen: false })

    handleFormOpen =()=> this.setState({ modalFormOpen: true })

    handleFormClose =()=> this.setState({ modalFormOpen: false })
    
    render() {
        if (this.props.current_user) {
            return (
                <Segment style={{ padding: '4em 0em' }} vertical>
                    <Modal trigger={this.state.errors.length > 0} closeIcon>
                        <Header icon='archive' content='There were some errors.' />
                        <Modal.Content>
                            {this.state.errors.map( error => {
                                return <Message error>{error}</Message>
                            })}
                        </Modal.Content>
                        <Modal.Actions>
                        </Modal.Actions>
                    </Modal>
                    <Grid container stackable verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column floated='left' width={6}>
                                <Card>
                                    <Image src={this.props.current_user.img_url} wrapped ui={false} />
                                    <Card.Content>
                                    <Card.Header textAlign="center">{this.props.current_user.username}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Joined: {this.props.current_user.created_at}</span>
                                    </Card.Meta>
                                    { (this.props.current_user.first_name && this.props.current_user.last_name) || this.props.current_user.first_name ?
                                    <Card.Description>
                                        Name: {this.props.current_user.first_name} {this.props.current_user.last_name ? <span>{' ' + this.props.current_user.last_name}</span> : null }
                                    </Card.Description>
                                    :
                                    null
                                    }
                                    <Card.Description>
                                        {this.props.current_user.bio}
                                    </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Modal 
                                            open={this.state.modalFormOpen}
                                            onClose={this.handleFormClose}
                                            trigger={<a onClick={()=> {
                                                this.handleFormOpen()
                                                let user = this.props.current_user
                                                this.setState({ user: {...this.state.user, email: user.email, username: user.username, bio: user.bio, img_url: user.img_url, first_name: user.first_name, last_name: user.last_name} })
                                            }} 
                                        >
                                            <Icon name='user' />Edit Profile</a>}>
                                            <Modal.Header>Your Profile</Modal.Header>
                                            <Modal.Content image scrolling>
                                            <Image size='medium' src={this.state.user.img_url} wrapped />
                                            <Modal.Description>
                                                <Header>Enter in new information here</Header>
                                                <Form fluid>
                                                    <Form.Input fluid onChange={(e)=> this.setState({ user: {...this.state.user, username: e.target.value} })} value={this.state.user.username} label="User name:" required/>
                                                    <Form.Input onChange={(e)=> this.setState({ user: {...this.state.user, img_url: e.target.value } })} value={this.state.user.img_url} label="Image:" required/>
                                                    <Form.Input onChange={(e)=> this.setState({ user: {...this.state.user, first_name: e.target.value} })} value={this.state.user.first_name} label="First name:" />
                                                    <Form.Input onChange={(e)=> this.setState({ user: {...this.state.user, last_name: e.target.value} })} value={this.state.user.last_name} label="Last name:" />
                                                    <Form.TextArea onChange={(e)=> this.setState({ user: {...this.state.user, bio: e.target.value} })} value={this.state.user.bio} label="What would you like for others to know about you?" />
                                                </Form>
                                            </Modal.Description>
                                            </Modal.Content>
                                            <Modal.Actions>
                                            <Modal
                                                loading
                                                trigger={<Button positive onClick={this.handleOpen}>Submit Changes!</Button>}
                                                open={this.state.modalOpen}
                                                onClose={this.handleClose}
                                                basic
                                                size='small'
                                            >
                                                <Header icon='user' content='Confirm your password:' />
                                                <Modal.Content>
                                                    <Form loading={this.state.loading}>
                                                        <Form.Input
                                                            fluid
                                                            icon='lock'
                                                            iconPosition='left'
                                                            placeholder='Password...'
                                                            type='password'
                                                            required
                                                            onChange={(e) => this.setState({ user: {...this.state.user, password: e.target.value} })}
                                                        />
                                                    </Form>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                <Button color='green' onClick={()=> {
                                                    this.handleClose()
                                                    this.handleFormClose()
                                                    this.setState({ loading: true })
                                                    }} inverted>
                                                    <Icon name='checkmark' /> Got it
                                                </Button>
                                                </Modal.Actions>
                                            </Modal>
                                            </Modal.Actions>
                                        </Modal>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Segment>
                                    Hi there!
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                            <Button size='huge'>Get in on the fun!</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            )
        } else {
            return <Redirect to="/" />
        }
    }
}

let mapStateToProps =(state)=> {
    return {
        jwt_user: state.users.jwt_user,
        current_user: state.users.current_user,
    }
}

export default connect(mapStateToProps)(Homepage)