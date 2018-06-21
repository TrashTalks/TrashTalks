import React from 'react'
import {Modal, Image, Header,Icon,Segment,Grid,Message} from 'semantic-ui-react'
import "./ItemModal.css";
var ItemModal =(props) => 
  <Modal scrolling
    open={props.modalOpen}
    onClose={props.handleClose}
  >
		<Segment clearing id="ItemmodalHeader">
			<Header floated="left"> {props.itemName}</Header>
			<Header floated="right">
					<Icon corner name="close" size="big" color="grey"  onClick={props.handleClose} />
			</Header>
		</Segment>

  <Modal.Content>
    <Grid centered>
    <Grid.Column mobile={12} tablet={5} computer={5} largeScreen={5} widescreen={5} textAlign = "center" >

      <Image rounded src={props.itemImage} wrapped  size='small'/>

      <Message className = {props.isRecyclable ?"positive":"negative"} >
        <Message.Header>This {props.itemName} {props.isRecyclable ? <span><u>IS</u> recyclable.</span> : <span>is <u>NOT</u> recyclable.</span>}</Message.Header>
        <p>
          Appropriate Disposal: In <b>{props.binType}</b>
        </p>
      </Message>
    </Grid.Column>
    <Grid.Column mobile={12} tablet={11} computer={11} largeScreen={11} widescreen={11}>

        <Segment textAlign = "center">
              <Header>Closest Recycling Station {props.binLocation}</Header>
              <p> <b>{props.binType}</b></p>
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