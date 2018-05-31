import React, { Component } from "react";
import { Container, Segment, Grid, Form, Button } from "semantic-ui-react";
import "./ItemInfo.css";
import API from "../../utils/API";

class ItemInfo extends Component {

    state = { 
        materialSearch: "",
        msgContent:""
    }
    handleMaterialSearchChange = (e) =>{
		this.setState({materialSearch: e.target.value});
    };

    searchMaterialDB = event => {
		event.preventDefault();
		var material = {
            material_name: this.state.materialSearch.trim()
		};
		
		API.searchMaterial(material)
			.then(res => {
				this.setState({msgContent:res.data});
			}).catch((error) => {
				console.log(error);
			});
	}; 
    

    render() {
		return(
			<div>
                <Container id="infoBinColumns"> 
                    <Grid columns={2} stackable>
                        <Grid.Column>
                            <Segment.Group>
                                <Segment inverted color="teal" className="landingTitle">
                                    <h1>Barcode Scanner/Search Bar</h1>
                                </Segment>
                                
                                <Segment className="landingWords"> 
                                <div id="scanner-container">
                                    <input type="button" id="scannerButton" value="Start/Stop the scanner" />
                                </div>
                                <Form>
									<Form.Field>
										<label> Search: </label>
										<Form.Input
										className = "form-control"
										placeholder = "Waste-Material"
										id = "wasteMaterialSearch"
										type = "text"
										value = {this.materialSearch}
										onChange = {this.handleMaterialSearchChange}
										/>
									</Form.Field>
                                    <Button type = "submit" onClick = {this.searchMaterialDB}>
										Submit
									</Button>
                                </Form>
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
