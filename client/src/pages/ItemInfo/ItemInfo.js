import React, { Component } from "react";
import { Segment, Grid, Form, Button, Modal, Dimmer, Loader } from "semantic-ui-react";
import "./ItemInfo.css";
import ItemModal from "../../components/ItemModal";
import API from "../../utils/API";

class ItemInfo extends Component {

    state = {
        materialInput: "",
        upcInput: "no",
        components: [],
        material_name: "",
        producing_company: "",
        product_description: "",
        isItemInfoShown: false,
        isRecyclable: "",
        isVerified:"",
        itemImage: "",
        binLocation:"",
        binType:"",
        isScannerContentShown:false,
        isModalOpen:false,
        showLoader:false,
        test:"did it work?"
    }
    printsomething = () =>{
                console.log(this.state.test)
    }
    componentDidMount() {
        this.props.onRef(this)
    }

    handleChanges = (e) =>{
        const {target:{name,value}} = e;
        this.setState({[name]:value});
    };

    searchMaterialDB = event => {
        event.preventDefault();
        this.setState({showLoader:true})
        var material = {
            material_name: this.state.materialInput.trim(),
            upc_code: this.state.upcInput.trim()
        };
        
        API.searchMaterial(material)
            .then(res => {
                this.setState({
                    material_name:res.data.material_name,
                    producing_company:res.data.producing_company,
                    product_description:res.data.product_description,
                    components:res.data.components,
                    isItemInfoShown: true,
                    isRecyclable:res.data.wholly_recyclable,
                    isVerified:res.data.verified,
                    itemImage: res.data.img_url
                })

                res.data.bin_location !== "g"
                    ? this.setState({binLocation:res.data.bin_location}) 
                    : this.setState({binLocation:"g"})
                
                res.data.bin_type !== "g"
                    ? this.setState({binType:res.data.bin_type}) 
                    : this.setState({binType:"g"})
                this.setState({showLoader:false})
                this.hideScannerContent()
                this.showItemContent()
            }).catch((error) => {
                console.log(error);
                this.setState({showLoader:false})
                this.hideScannerContent()
                this.showItemContent()
            });
    }; 
        
    openThisModal = () => {
        // personClicked.target === undefined 
        // ? this.displayPersonModalInfo(personClicked):
        this.setState({isModalOpen: true})
        this.setState({isScannerContentShown:true})
        
    };
    hideScannerContent = () =>{
        this.setState({isScannerContentShown:false});
    };
    showItemContent = () => {
        this.setState({isItemInfoShown:true});
    };
    scanAnother = () => {
        this.setState({isScannerContentShown:true});
        this.setState({isItemInfoShown:false});
    };
    handleClose = () => {
        this.setState({isModalOpen:false})
    };

    render() {
		return(
			<div>
            {/* <Button id = "isModalOpen" onClick = {this.openThisModal}> To the Scanner </Button> */}
 
            <Modal scrolling
                open={this.state.isModalOpen}
                onClose={this.props.parentRefToCloseModal}
                closeIcon
            >
                
                <Modal.Header floated="left"> 
                    {this.state.isScannerContentShown
                        ? "Find out if an item is recyclable"
                        : this.state.components !== undefined
                        ? this.state.material_name
                        : null
                    }
                </Modal.Header>
                    
                <Modal.Content>
                    {this.state.isScannerContentShown  

                    ? 
                        <Grid columns={1} centered>
                            <Grid.Column>
                                <Segment.Group>
                                    <Segment inverted  className="landingTitle" id="landingTitleBackground">
                                        <h1>Search Waste Material</h1>
                                    </Segment>
                                    
                                    <Segment className="landingWords"> 
                                    <div id="scanner-container">
                                        <Button  id="scannerButton" >Scan an Item </Button>
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
               
                    : this.state.isItemInfoShown

                    ? 
                    <div>
                        <ItemModal
                            modalOpen = {this.state.isItemInfoShown}
                            scanAnother = {this.scanAnother}
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
                    </div>
                    :null}
                </Modal.Content>
                <Dimmer active = {this.state.showLoader}>
                    <Loader indeterminate>Searching Our Database ...</Loader>
                </Dimmer>
            </Modal>

            </div>
        )
    }
}   

export default ItemInfo;
