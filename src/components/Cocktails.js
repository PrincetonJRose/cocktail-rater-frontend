import React, { Component } from 'react'

export default class Cocktails extends Component {

    render() {
        return (
            <div className="container">
                <div className="container" style={{ width: `75vw`, height: `100vh`, float: `right` }}>
                    <div className="container" style={{ height: `60vh`, overflowY: `auto`, overflowX: `hidden` }}>
                        Cocktail info
                    </div>
                    <div className="container" style={{ height: `40vh`, overflowY: `auto`, overflowX: `hidden` }}>
                        Reviews
                    </div>
                </div>
                <div className="container" style={{ width: `25vw`, height: `100vh`, float: `left` }}>
                    <div style={{ overflowX: `hidden`, overflowY: `auto`, height: `65vh` }}>
                        Cocktails
                    </div>
                    <div style={{ overflowX: `hidden`, overflowY: `auto`, height: `35vh` }}>
                        Custom Drinks
                    </div>
                </div>
            </div>
        )
    }
}