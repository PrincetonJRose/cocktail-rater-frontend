import React, { Component } from 'react'
import { Modal, Message, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

class ErrorModal extends Component {
    constructor() {
        super()
        this.state = { modalErrorOpen: false }
    }
    
    componentWillReceiveProps() {
        this.setState({ modalErrorOpen: this.props.open })
    }

    handleErrorClose =()=> {
        this.props.dispatch({ type: "SET_ERRORS", errors: [] })
        this.setState({ modalErrorOpen: false })
    }

    render() {
        return (
            <Modal
            raised
            closeIcon
            open={this.state.modalErrorOpen}
            onClose={this.handleErrorClose}
            >
                <Header icon='exclamation triangle' content='There were some errors:' />
                <Modal.Content>
                    {this.props.errors.map( error => {
                        return <Message error>{error}</Message>
                    })}
                </Modal.Content>
                <Modal.Actions>
                </Modal.Actions>
            </Modal>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        errors: state.users.errors,
    }
}

export default connect(mapStateToProps)(ErrorModal)