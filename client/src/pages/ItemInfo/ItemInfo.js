import React, { Component } from "react";
import {Container, Segment, Grid} from "semantic-ui-react";
import "./ItemInfo.css";

class ItemInfo extends Component {

    render() {
		return(
			<div>
                <Container id="infoBinColumns"> 
                    <Grid columns={2} stackable>
                        <Grid.Column>
                            <Segment.Group>
                                <Segment inverted color="teal" className="landingTitle">
                                    <h1>??? Barcode Scanner/Search Bar ???</h1>
                                </Segment>
                                
                                <Segment className="landingWords"> 
                                    <p>Barcode Scanner</p>
                                    <p>Search Bar </p>
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>

                        <Grid.Column>
                            <Segment.Group>
                                <Segment inverted color="teal" className="landingTitle">
                                    <h1>??? The Item Information/ Bin Location ???</h1>
                                </Segment>
                                
                                <Segment className="landingWords"> 
                                    <p>Item Infor</p>
                                    <p>Bin Location </p>
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}   

export default ItemInfo;
