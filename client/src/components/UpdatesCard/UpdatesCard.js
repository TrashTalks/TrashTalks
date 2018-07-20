import React from "react";
import "./UpdatesCard.css";
import { Container, Segment, Icon, Card } from "semantic-ui-react";

var UpdatesCard = props => (
  <Container id="updates">
    <Segment.Group>
      <Segment inverted className="updatesTitle" id="updatesCardSegment">
        <h1>
          <Icon name="newspaper" />Updates
        </h1>
      </Segment>
      <Segment
        className="updatesWords"
        centered
        style={{ "overflow-y": "auto", height: 350 }}
      >
        <Card.Group centered>{props.children}</Card.Group>
      </Segment>
    </Segment.Group>
  </Container>
);

export default UpdatesCard;
