import React, { Component } from "react";
import { Grid, Form, Button, Modal, Dimmer, Loader, Message, Container} from "semantic-ui-react";
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
      showLoader: false,
      showMessage: false,
      posMsg: false,
      showForm:true

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
        
        API.sendTrashTalksAnEmail(theEmail)
        .then( res => 
            console.log(res),
            this.setState({
                showLoader:false,
                showMessage:true,
                posMsg: true,
                isModalOpen:true,
                showForm:false,
                
            })
        )
        .catch( err => console.log(err))
    }; 
        
    openThisModal = () => {
        this.setState({isModalOpen: true})    
    };

    handleClose = () => {
        this.setState({
            isModalOpen:false,
            showLoader:false,
            showMessage:false,
        })
        
    };

    render() {
		return(
			<div>

            <Modal
                open={this.state.isModalOpen}
                onClose={this.props.parentRefToCloseModal}
                closeIcon
                size = "small"
            >
                
                <Modal.Header floated="left"> 
                    Contact Us
                </Modal.Header>

                <Modal.Content>
                    <Modal.Description>

                        <Grid columns={1} centered>
                            <Grid.Column mobile={14} tablet={14} computer={14} largeScreen={14} widescreen={14}>
                                {this.state.showMessage  
                                    ? <Message className = {this.state.posMsg ? "positive" : this.state.warnMsg ? "warning" :  "negative"} >
                                        <Message.Header>

                                        Hey {this.state.ContactName.split(" ")[0]},
                                        <br/> Thank you  for contacting us! We will reach out to your shortly.
                                        
                                        </Message.Header>
                                    </Message>
                                    :null
                                }
                                <Form>
                                    <Form.Group>
                                        <Form.Input 
                                            required
                                            width = {10}
                                            label = "Name"
                                            placeholder = "First and Last Name"
                                            id = "ContactName"
                                            type = "text"
                                            onChange = {this.handleChanges}
                                            name = "ContactName"
                                        />
                                        <Form.Input
                                            width = {6}
                                            required
                                            label = "Email Address:"
                                            placeholder = "Your Email Adress"
                                            id = "ContactEmail"
                                            type = "text"
                                            onChange = {this.handleChanges}
                                            name = "ContactEmail"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Input
                                            width = {6}
                                            label = "Phone # (Optional)"
                                            placeholder = "888-888-8888"
                                            id = "ContactPhone"
                                            type = "text"
                                            onChange = {this.handleChanges}
                                            name = "ContactPhone"
                                        />
                                        <Form.Input
                                            width = {10}
                                            label =  "Your Orginaztion/Company"
                                            placeholder = "Orginazation Name"
                                            id = "ContactOrg"
                                            type = "text"
                                            onChange = {this.handleChanges}
                                            name = "ContactOrg"
                                        />
                                    </Form.Group>
                                        <Form.TextArea 
                                            required
                                            label='Message: ' 
                                            placeholder='Tell us how we can assist you...' 
                                            id = "ContactMessage"
                                            onChange = {this.handleChanges}
                                            name = "ContactMessage"
                                            
                                        /> 
                                    <Button type = "submit" onClick = {this.sendTrashTalksAnEmail} id="sendTrashTalksAnEmailButton">
                                        Send TrashTalks An Email
                                    </Button>
                                </Form>
                            </Grid.Column>                        

                        </Grid>

                        <Dimmer active = {this.state.showLoader}>
                            <Loader indeterminate>Sending Email ...</Loader>
                        </Dimmer>

                    </Modal.Description>
                </Modal.Content>
            </Modal>

            </div>
        )
    }
}   

export default ContactUs;
