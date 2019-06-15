import React, { Component } from  'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Search extends Component {
    constructor() {
        super()
        this.state = { }
    }

    render() {
        return (
            <div>
                Search
            </div>
        )
    }
}

let mapStateToProps =(state)=> {
    return {

    }
}

export default connect(mapStateToProps)(Search)