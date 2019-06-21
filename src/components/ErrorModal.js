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
        if (this.props.errors) {
            console.log(this.props.errors)
            return (
                <Modal
                    raised
                    closeIcon
                    open={this.state.modalErrorOpen}
                    onClose={this.handleErrorClose}
                >
                    <Header icon='exclamation triangle' content='There were some errors:' />
                    <Modal.Content>
                        {
                            this.props.errors === "Not Found" ?
                                <Message error content="Sorry, that content could not be found." />
                            :
                                <div>
                                    {this.props.errors.map( error => {
                                        return <Message error content={error} />
                                    })}
                                </div>
                        }
                    </Modal.Content>
                    <Modal.Actions>
                    </Modal.Actions>
                </Modal>
            )
        } else {
            return null
        }
    }
}

let mapStateToProps =(state)=> {
    return {
        errors: state.users.errors,
    }
}

export default connect(mapStateToProps)(ErrorModal)