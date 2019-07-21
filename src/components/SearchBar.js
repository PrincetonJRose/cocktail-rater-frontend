import React, { Component } from  'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Input, Search, GridColumn, } from 'semantic-ui-react'

class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            filter: '',
            ingredients: [],

        }
    }

    render() {
        return (
            <Segment textAlign="center" verticalAlign="center">
                <h1>Coming Soon!!!</h1>
                <Grid>
                    <GridColumn width={6}>
                        <div>
                        <Dropdown 
                                placeholder='Choose ingredients:'
                                raised 
                                fluid 
                                search // to allow filtered search... still not working 100%    search={()=>this.filterIngredients()}
                                onSearchChange={(e)=>this.setState({ filter: e.target.value }) }
                                multiple
                                selection
                                value={this.state.ingredients}
                                options={this.props.allIngredients.map( i => ({ key: i.name, text: i.name, value: i }) ) }
                                onChange={(e, data)=>{this.setState({ ingredients: data.value} )} }
                            />
                        </div>
                    </GridColumn>
                    <GridColumn width={10}>
                        <h1>Hiya!!!!</h1>
                    </GridColumn>
                </Grid>
            </Segment>
        )
    }
}

let mapStateToProps =(state)=> {
    return {
        allIngredients: state.ingredients.ingredients,
        allApiCocktails: state.cocktails.api_cocktails,
        allCustomCocktails: state.cocktails.custom_cocktails,
    }
}

export default connect(mapStateToProps)(SearchBar)