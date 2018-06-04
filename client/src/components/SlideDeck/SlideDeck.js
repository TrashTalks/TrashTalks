import React from 'react'
import {Modal, Image, Header,Icon,Button} from 'semantic-ui-react'
import "./SlideDeck.css";
var SlideDeckModal =(props) => 
      <Modal 
        open={props.modalOpen}
        onClose={props.handleClose}
      >

        <Header floated = "left" id="SDmodalHeader1"> {props.SDtitle} </Header>

        <Header floated="right" id="SDmodalHeader2">
            <Icon corner name="close" size="big" color="grey"  onClick={props.handleClose} />
        </Header>

        <Modal.Content image id="SDmodalContent">
        
          <Image src={props.modalImage} rounded centered wrapped/>
      
        </Modal.Content>
        <Button.Group fluid>
            <Button labelPosition='left' icon='left chevron' content='Back' onClick={props.slideBack}/>
            <Button.Or/>
            <Button labelPosition='right' icon='right chevron' content='Forward' onClick={props.slideForward}/>
        </Button.Group>
 </Modal> 

export default SlideDeckModal;