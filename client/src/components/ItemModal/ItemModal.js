import React from 'react'
import {Modal, Image, Header,Icon,Segment,Grid,Message} from 'semantic-ui-react'
import "./ItemModal.css";
var ItemModal =(props) => 
  <Modal scrolling
    open={props.modalOpen}
    onClose={props.handleClose}
    closeIcon
  >
	
  <Modal.Header floated="left"> {props.itemName}</Modal.Header>

  <Modal.Content>
    <Grid centered>
    <Grid.Column mobile={12} tablet={5} computer={5} largeScreen={5} widescreen={5} textAlign = "center" >

      <Image rounded src={props.itemImage} wrapped  size='small'/>

      <Message className = {props.isRecyclable && props.isVerified ?"positive": props.isRecyclable? "warning" :  "negative"} >
        <Message.Header>
          This {props.itemName} {' '}

          {props.isRecyclable && props.isVerified
          ? <span><u> IS</u> recyclable.</span> 
          : !props.isVerified ? <span> is not in our database yet. We'll make sure to add and verify it soon. Place in landfill to prevent contaminating other recyclables. </span>
          : <span> is <u>NOT</u> recyclable.</span>}
          
        </Message.Header>
  
        {props.binType === "" 
         ? <p> Place in <b> landfill </b> bin </p>
         : <p> Appropriate Disposal: In <b>{props.binType}</b> </p>
        }
      </Message>
    </Grid.Column>
    <Grid.Column mobile={12} tablet={11} computer={11} largeScreen={11} widescreen={11}>

        <Segment textAlign = "center">

          {props.binLocation !== ""  
            ?  <Header>Closest Recycling Station {props.binLocation}</Header>
            :  ""
          }

          <Image rounded src={props.binMapImage} />
          
        </Segment>

        <Segment>
          <Header>Product Information</Header>
            <p>Description: {props.productDescription}</p>
            <p>Manufactorer: {props.companyName}</p>
        </Segment>

        <Segment>
            <Header> Individual Components </Header>
            {props.children}
        </Segment>

    </Grid.Column>
    </Grid>
 </Modal.Content> 
</Modal>
export default ItemModal;