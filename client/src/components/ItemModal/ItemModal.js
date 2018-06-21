import React from 'react'
import {Modal, Image, Header,Icon,Segment,Container,Message} from 'semantic-ui-react'

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
      <Image rounded src={props.itemImage} wrapped />

      <Message className = {props.isRecyclable ?"positive":"negative"} >
        <Message.Header>This {props.itemName} {props.isRecyclable ? <span><u>IS</u> recyclable.</span> : <span>is <u>NOT</u> recyclable.</span>}</Message.Header>
        <p>
          Appropriate Disposal: In <b>Aluminum Bin</b>
        </p>
      </Message>


    <Modal.Description>
      <Header></Header>

        <Segment>
              <Header>Closest Recycling Station {props.binLocation}</Header>
              <p centered> Aluminum Bin {props.binType}</p>
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



    </Modal.Description>

  </Modal.Content>
        
 </Modal> 

export default ItemModal;