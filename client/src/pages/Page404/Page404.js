import React, { Component } from "react";
import { Container, Image, Segment } from "semantic-ui-react";
import "./Page404.css";

class Page404 extends Component {
  render() {
    return (
      <div>
        <Container className="Page404Container">
          <Segment.Group>
            <Segment inverted className="landingTitle" id="EELandingTitle">
              <h1>404 Page</h1>
            </Segment>

            <Segment className="landingWords">
              <p>404 Puppies</p>
              <Image src="Puppies404.jpg" wrapped />
            </Segment>
          </Segment.Group>
        </Container>
      </div>
    );
  }
}

export default Page404;
