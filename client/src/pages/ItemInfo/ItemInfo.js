import React, { Component } from "react";
import { Container, Segment, Grid, Form, Button } from "semantic-ui-react";
import "./ItemInfo.css";
import ItemModal from "../../components/ItemModal";
import API from "../../utils/API";

class ItemInfo extends Component {

    state = { 
        materialInput: "",
        upcInput: "",
        components: [],
        material_name: "",
        producing_company: "",
        product_description: "",
        isItemOpen: false,
        isRecyclable: "",
        isVerified:"",
        itemImage: "",
        binLocation:"",
        binType:""
    }

    handleChanges = (e) =>{
        const {target:{name,value}} = e;
		this.setState({[name]:value});
    };

    searchMaterialDB = event => {
		event.preventDefault();
		var material = {
            material_name: this.state.materialInput.trim(),
            upc_code: this.state.upcInput.trim()
		};
		
		API.searchMaterial(material)
			.then(res => {
                this.setState({material_name:res.data[0].material_name});
                this.setState({producing_company:res.data[0].producing_company});
                this.setState({product_description:res.data[0].product_description});
                this.setState({components:res.data[0].components});
                this.setState({isItemOpen: true})
                this.setState({isRecyclable:res.data[0].wholly_recyclable})
                this.setState({isVerified:res.data[0].verified})
                this.setState({itemImage: res.data[0].img_url})

                res.data[0].bin_location !== ""
                    ? this.setState({binLocation:res.data[0].bin_location}) 
                    : this.setState({binLocation:""})
                
                res.data[0].bin_type !== ""
                    ? this.setState({binType:res.data[0].bin_type}) 
                    : this.setState({binType:""})
                
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
                                <Segment inverted  className="landingTitle" id="landingTitleBackground">
                                    <h1 >Barcode Scanner/Search Bar</h1>
                                </Segment>
                                
                                <Segment className="landingWords"> 
                                <div id="scanner-container">
                                    <Button  id="scannerButton" > Start/Stop the Scanner </Button>
                                </div>
                                <Form>
									<Form.Field>
										<label> Material Search: </label>
										<Form.Input
										className = "form-control"
										placeholder = "Waste Material"
										id = "wasteMaterialSearch"
										type = "text"
										onChange = {this.handleChanges}
                                        name = "materialInput"
										/>
                                        <label> UPC Search: </label>
										<Form.Input
										className = "form-control"
										placeholder = "UPC Code"
										id = "wasteUpcSearch"
										type = "text"
										onChange = {this.handleChanges}
                                        name = "upcInput"
										/>
									</Form.Field>
                                    <Button type = "submit" onClick = {this.searchMaterialDB} id="MatSearchButton">
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
                            itemImage = {this.state.itemImage}
                            isRecyclable = {this.state.isRecyclable}
                            isVerified = {this.state.isVerified}
                            productDescription = {this.state.product_description}
                            companyName = {this.state.producing_company}
                            binLocation = {this.state.binLocation}
                            binType = {this.state.binType}
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
