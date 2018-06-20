import React, { Component } from "react";
import { Container, Segment, Grid, Form, Button } from "semantic-ui-react";
import "./ItemInfo.css";
import API from "../../utils/API";

class ItemInfo extends Component {

    state = { 
        materialSearch: "",
        components: [],
        material_name: "",
        producing_company: "",
        product_description: ""
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
                this.setState({material_name:res.data[0].material_name});
                this.setState({producing_company:res.data[0].producing_company});
                this.setState({product_description:res.data[0].product_description});
                this.setState({components:res.data[0].components});
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
                                    <Button type = "submit" onClick = {this.searchMaterialDB} color="teal">
										Submit
									</Button>
                                </Form>
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>

                        <Grid.Column>
                            <Segment.Group>
                                <Segment inverted color="teal" className="landingTitle">
                                    <h1>The Item Information/ Bin Location</h1>
                                </Segment>
                                
                                <Segment className="landingWords"> 
                                    <Container>
                                        <Grid centered columns = "equal" stackable>
                                            <div>{this.state.material_name}</div>
                                            <div>{this.state.producing_company}</div>
                                            <div>{this.state.product_description}</div>
                                            {this.state.components.map((component, index) => {
                                                return (<div key={index}>{component}</div>)
                                            })}
                                        </Grid>
                                    </Container>
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
