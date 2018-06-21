import React, { Component } from "react";
import { Container, Segment, Grid, Form, Button } from "semantic-ui-react";
import "./ItemInfo.css";
import ItemModal from "../../components/ItemModal";
import API from "../../utils/API";

class ItemInfo extends Component {

    state = { 
        materialSearch: "",
        upcSearch: "",
        components: [],
        material_name: "",
        producing_company: "",
        product_description: "",
        isItemOpen: false,
        isRecyclable: ""
    }

    handleMaterialSearchChange = (e) =>{
		this.setState({materialSearch: e.target.value});
    };

    handleUpcSearchChange = (e) =>{
		this.setState({upcSearch: e.target.value});
    };

    searchMaterialDB = event => {
		event.preventDefault();
		var material = {
            material_name: this.state.materialSearch.trim(),
            upc_code: this.state.upcSearch.trim()
		};
		
		API.searchMaterial(material)
			.then(res => {
                this.setState({material_name:res.data[0].material_name});
                this.setState({producing_company:res.data[0].producing_company});
                this.setState({product_description:res.data[0].product_description});
                this.setState({components:res.data[0].components});
                this.setState({isItemOpen: true})
                this.setState({isRecyclable:res.data[0].wholly_recyclable})
			}).catch((error) => {
				console.log(error);
			});
	}; 
    closeItem = () => {
        this.setState({isItemOpen: false})
    };

    render() {
		return(
			<div>
                <Container id="infoBinColumns"> 
                    <Grid columns={1} centered>
                        <Grid.Column>
                            <Segment.Group>
                                <Segment inverted color="teal" className="landingTitle">
                                    <h1>Barcode Scanner/Search Bar</h1>
                                </Segment>
                                
                                <Segment className="landingWords"> 
                                <div id="scanner-container">
                                    <Button  id="scannerButton" color = "teal" > Start/Stop the Scanner </Button>
                                </div>
                                <Form>
									<Form.Field>
										<label> Material Search: </label>
										<Form.Input
										className = "form-control"
										placeholder = "Waste Material"
										id = "wasteMaterialSearch"
										type = "text"
										value = {this.materialSearch}
										onChange = {this.handleMaterialSearchChange}
										/>
                                        <label> UPC Search: </label>
										<Form.Input
										className = "form-control"
										placeholder = "UPC Code"
										id = "wasteUpcSearch"
										type = "text"
										value = {this.upcSearch}
										onChange = {this.handleUpcSearchChange}
										/>
									</Form.Field>
                                    <Button type = "submit" onClick = {this.searchMaterialDB} color="teal">
										Submit
									</Button>
                                </Form>
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>

                    </Grid>

                    {this.state.components !== undefined ?
                        <ItemModal
                            modalOpen = {this.state.isItemOpen}
                            handleClose = {this.closeItem}
                            itemName = {this.state.material_name}
                            itemImage = "http://www.imsrecycling.com/wp-content/uploads/2012/08/soda-can.jpeg"
                            isRecyclable = {this.state.isRecyclable}
                            productDescription = {this.state.product_description}
                            companyName = {this.state.producing_company}
                            binLocation = "Starbucks - Across Info Desk"
                            binType = "Aluminum Bin"
                            binMapImage = "Culc2ndFloor.png"
                        >
                            {this.state.components.map((component, index) => {
                                return (<div key={index}>{component}</div>)
                            })}
                        </ItemModal>
                :null}
                
                </Container>

            </div>
        )
    }
}   

export default ItemInfo;
