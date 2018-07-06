import React, { Component } from "react";
import { Grid, Form, Button, Modal, Dimmer, Loader } from "semantic-ui-react";
import "./ContactUs.css";
// import ItemModal from "../../components/ItemModal";
import API from "../../utils/API";

class ContactUs extends Component {

    state = {
      test: "",
      isModalOpen: false,
      ContactEmail:"",
      ContactName:"",
      ContactOrg:"",
      ContactPhone:"",
      ContactMessage:"",
      showLoader: false

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

    sendTrashTalksAnEmail = event => {
        event.preventDefault();
        this.setState({showLoader:true})
        var theEmail = {
            ContactEmail:this.state.ContactEmail.trim(),
            ContactName:this.state.ContactName.trim(),
            ContactOrg:this.state.ContactOrg.trim(),
            ContactPhone:this.state.ContactPhone.trim(),
            ContactMessage:this.state.ContactMessage.trim(),
        };
        console.log(theEmail)
        // API.sendTrashTalksAnEmail(theEmail)
        // .then( res => 
        //     console.log(res),
        //     this.setState({showLoader:false})
        // )
        // .catch( err => console.log(err))
    }; 
        
    openThisModal = () => {
        this.setState({isModalOpen: true})    
    };

    handleClose = () => {
        this.setState({isModalOpen:false})
    };

    render() {
		return(
			<div>

            <Modal scrolling
                open={this.state.isModalOpen}
                onClose={this.props.parentRefToCloseModal}
                closeIcon
            >
                
                <Modal.Header floated="left"> 
                    Contact Us
                </Modal.Header>
                    
                <Modal.Content>
                    
                    <Grid columns={1} centered>
                        <Grid.Column>
                            <Form>
                                <Form.Field>
                                    <Form.Input 
                                        required
                                        label = "Name"
                                        className = "form-control"
                                        placeholder = "First and Last Name"
                                        id = "ContactName"
                                        type = "text"
                                        onChange = {this.handleChanges}
                                        name = "ContactName"
                                    />
                                    <Form.Input
                                        required
                                        label = "Email Address:"
                                        className = "form-control"
                                        placeholder = "Your Email Adress"
                                        id = "ContactEmail"
                                        type = "text"
                                        onChange = {this.handleChanges}
                                        name = "ContactEmail"
                                    />
                                    <Form.Input
                                        label = "Phone #:"
                                        className = "form-control"
                                        placeholder = "Optional"
                                        id = "ContactPhone"
                                        type = "text"
                                        onChange = {this.handleChanges}
                                        name = "ContactPhone"
                                    />
                                    <Form.Input
                                        label =  "Your Orginaztion/Company"
                                        className = "form-control"
                                        placeholder = "Orginazation Name"
                                        id = "ContactOrg"
                                        type = "text"
                                        onChange = {this.handleChanges}
                                        name = "ContactOrg"
                                    />
                                    <Form.TextArea 
                                        required
                                        label='Message: ' 
                                        className = "form-control"
                                        placeholder='Tell us how we can assist you...' 
                                        id = "ContactMessage"
                                        onChange = {this.handleChanges}
                                        name = "ContactMessage"
                                        
                                    />
                                </Form.Field>
                                <Button type = "submit" onClick = {this.sendTrashTalksAnEmail} id="sendTrashTalksAnEmailButton">
                                    Send TrashTalks An Email
                                </Button>
                            </Form>
                        </Grid.Column>
                    </Grid>
               

                </Modal.Content>
                <Dimmer active = {this.state.showLoader}>
                    <Loader indeterminate>Sending Email ...</Loader>
                </Dimmer>
            </Modal>

            </div>
        )
    }
}   

export default ItemInfo;
