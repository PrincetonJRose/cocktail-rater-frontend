import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Image, Grid, GridRow, GridColumn, Menu, SegmentGroup } from 'semantic-ui-react'

class CocktailInfo extends Component {
    
    render() {
        const c = this.props.cocktail
        let ingredients = []
        for (let i = 1; i < 16; i++) {
            let ing = {}
            if (c[`ingredient_${i}`] == '' || c[`ingredient_${i}`] == ' ' || c[`ingredient_${i}`] == null) {
                break
            }
            ing.ingredient = c[`ingredient_${i}`]
            if (c[`measurement_${i}`] == '' || c[`measurement_${i}`] == ' ' || c[`measurement_${i}`] == null) {
                ing.measurement = "No measurement given."
            } else {
                ing.measurement = c[`measurement_${i}`]
            }
            ingredients.push(ing)
        }
        console.log(ingredients)
        return (
            <Grid className="container" style={{ width: `100%`, height: `100%`, overflowY: `auto` }}>
                <GridRow centered>
                    <GridColumn textAlign="centered" centered><h1><u>{c.name}</u></h1></GridColumn>
                    
                </GridRow>
                <GridRow stretched centered >
                    <GridColumn width={7}>
                        <Image className="ui medium image" src={c.imageUrl ? c.imageUrl : <span>No Image Provided</span>} style={{ borderStyle: `groove` }}/>
                    </GridColumn>
                    <Segment textAlign="left" inverted color="black" floated="left">
                        <Menu fluid vertical >
                            <Menu.Item ><b><u>Category</u>:</b> {'  ' + c.category}</Menu.Item>
                            <Menu.Item><b><u>Alcoholic</u>?</b> {'  ' + c.alcoholic}</Menu.Item>
                            <Menu.Item><b><u>Glass</u>:</b>{'  ' + c.glass}</Menu.Item>
                            <Menu.Item><b><u>Video</u>?</b>{c.videoUrl ? c.videoUrl : <span>{'  '}No video provided.</span>}</Menu.Item>
                            <Menu.Item><b><u>Likes</u>:</b>{'  ' + c.likes.length}</Menu.Item>
                            <Menu.Item><b><u>Reviews</u>:</b>{'  ' + c.reviews.length}</Menu.Item>
                        </Menu>
                    </Segment>
                </GridRow>
                <GridRow centered>
                    <GridColumn width={12}>
                        <Segment inverted color="black" style={{  }}>
                            <h3 style={{ textAlign: `center` }}><b><u>What's required</u></b></h3>
                            <table border="1" style={{ width: `100%`, borderStyle: `dotted` }}>
                                <tr>
                                    <th style={{ textAlign:`center`, width:"50%" }}>Ingredient:</th>
                                    <th style={{ textAlign:`center`, width:"50%" }}>Measurement:</th>
                                </tr>
                                {
                                    ingredients.map( i => { 
                                        return (
                                            <tr>
                                                <td style={{ width:"50%" }}>{i.ingredient}</td>
                                                <td style={{ width:"50%" }}>{i.measurement}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                            <h3 style={{ textAlign: `center` }}><b><u>How to create</u></b></h3>
                            <div>{c.instructions}</div>
                        </Segment>
                    </GridColumn>
                </GridRow>
                <GridRow centered>
                    <GridColumn width={12} >
                        <Segment inverted color="black" >
                        </Segment>
                    </GridColumn>
                </GridRow>
            </Grid>
        )
    }
}
    export default connect()(CocktailInfo)

    // <div className="container" style={{ width: `100%`, height: `100%`, overflowY: `auto` }}>
    //     <h1 style={{ textAlign: `center` }}>{c.name}</h1>
    //     <div>
    //         <Image className="ui medium image" src={c.imageUrl ? c.imageUrl : <span>No Image Provided</span>} style={{ float: `left`, borderStyle: `groove` }}/>
    //         <div style={{  }}>
    //             <li><b>{c.alcoholic} bevarage</b></li>
    //             <li><b><u>Category</u>: {c.category}</b></li>
    //         </div>
    //     </div>
    // </div>