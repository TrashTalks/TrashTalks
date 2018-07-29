import React from "react";
import { Modal, Image, Header, Button, Icon } from "semantic-ui-react";

var PersonCardModal = props => (
  <Modal
    scrolling
    open={props.modalOpen}
    onClose={props.handleClose}
    closeIcon={{ name: "close", color: "grey" }}
  >
    {/* <Header floated="right" id="PCmodalHeader">
        <Icon corner name="close" size="big" color="grey"  onClick={props.handleClose} />
    </Header> */}

    <Modal.Content image>
      <Image
        rounded
        src={props.modalImage}
        wrapped
        style={{ "max-width": 450, "max-height": 450 }}
      />

      <Modal.Description>
        <Header>{props.modalName}</Header>
        <p>{props.modalBio}</p>
        <p>{props.modalEmail}</p>
        <Button
          color="linkedin"
          as="a"
          href={props.modalLinkedIn}
          target="_blank"
        >
          <Icon name="linkedin" /> LinkedIn
        </Button>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default PersonCardModal;
