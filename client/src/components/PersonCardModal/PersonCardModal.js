import React from 'react'
import {Modal, Image, Header,Icon} from 'semantic-ui-react'

var PersonCardModal =(props) => 
      <Modal scrolling
        open={props.modalOpen}
        onClose={props.handleClose}
      >

        <Header floated="right" id="PCmodalHeader">
            <Icon corner name="close" size="big" color="grey"  onClick={props.handleClose} />
        </Header>

        <Modal.Content image>
        
          <Image rounded src={props.modalImage} />
      
          <Modal.Description>
            <Header>{props.modalName}</Header>
            <p>{props.modalBio}</p>

          </Modal.Description>

        </Modal.Content>
        
 </Modal> 

export default PersonCardModal;