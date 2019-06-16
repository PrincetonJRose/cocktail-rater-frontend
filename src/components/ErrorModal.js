import React, { Component } from 'react'
import { Modal, Message, Header } from 'semantic-ui-react'

class ErrorModal extends Component {
    constructor() {
        super()
        this.state = { modalErrorOpen: false }
    }
    
    componentWillReceiveProps() {
        this.setState({ modalErrorOpen: this.props.open })
    }

    handleErrorClose =()=> this.setState({ modalErrorOpen: false })

    render() {
        return (
            <Modal
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

export default ErrorModal