import React from "react";
import "./AboutUs.css";
import { Container, Segment, Icon, Button } from "semantic-ui-react";

var AboutUs = props => (
  <Container id="aboutContainer">
    <Segment.Group>
      <Segment inverted className="landingTitle" id="landingAboutUs">
        <h1 id="h1AboutUs">
          <Icon name="inbox" />About Us
        </h1>
      </Segment>
      <Segment className="landingWords">
        <br />
        <p>
          TrashTalks is a technology solutions company aspiring to disrupt the
          waste industry. Currently our focus is on solving inefficiencies with
          bin right-sizing. Through customer interviews, we've documented the
          frustrations of materials processors, recycling coordinators, and
          sustainability coordinators. This has lead us to our current
          hypothesis:
          <br />
          <br />
          <Container textAlign="center">
            <b>
              {" "}
              "Waste project managers will buy TrashTalks automated hauling
              services to eliminate inconsistent and unreliable waste hauling
              services"{" "}
            </b>
          </Container>
          <br />
          To share your experiences regarding trash disposal, please complete
          our
          <span onClick={props.openContactUsModal}> "Contact Us" form: </span>
          <Icon link name="wpforms" onClick={props.openContactUsModal} />
          . To join our mailing list, click the button below.
        </p>
        <br />
      </Segment>
      <Button
        id="isemailModalOpen"
        onClick={props.openThisModal}
        attached="bottom"
        className="emailButton"
      >
        <Icon name="vcard" />Join our mailing list
      </Button>
    </Segment.Group>
  </Container>
);
export default AboutUs;
