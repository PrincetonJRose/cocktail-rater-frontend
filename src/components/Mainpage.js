import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility,} from 'semantic-ui-react'

class Mainpage extends Component {

    render() {
        if (this.props.current_user) {
            return <Redirect to="/home"/>
        }
        return (
            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={8}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            Welcome to the Cocktail Taste & Rate!
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Tired of looking for new recipes to try? Having a cocktail party
                            and want to serve something fresh and exciting? Well you've come
                            to the right place! Come here to find and learn how to make tons
                            of new concoctions yourself!
                        </p>
                        <Header as='h3' style={{ fontSize: '2em' }}>

                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            And when you're done, come back and let others know about your
                            experiences. Remember to drink responsibly!!! <i className="icon smile"></i>
                        </p>
                        </Grid.Column>
                        <Grid.Column floated='right' width={6}>
                        {/* <Image bordered rounded size='large' src={} /> */}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                        <Link to='/login' ><Button size='huge'>Get in on the fun!</Button></Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        jwt_user: state.users.jwt_user,
        current_user: state.users.current_user,
    }
}

export default connect(mapStateToProps)(Mainpage)