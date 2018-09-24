import React, { Component } from "react";
import { Container, Image, Segment } from "semantic-ui-react";
import "./Pickup.css";
import API from "../../utils/API";

class Pickup extends Component {
  state = {
    binInfo: []
  };
  componentDidMount() {
    API.grabBinInfo()
      .then(res => {
        this.setState({ binInfo: res.data });
        console.log("API.grabBinInfo res: " + res.data);
      })
      .catch(error => {
        console.log("API.grabBinInfo Error: " + error);
      });
  }
  render() {
    return (
      <div>
        <Container className="PickupContainer">
          <Segment.Group>
            <Segment inverted className="landingTitle" id="EELandingTitle">
              <h1>Bins</h1>
            </Segment>

            <Segment className="landingWords">
              {this.state.binInfo.map((eachBin, index) => {
                return <div>{JSON.stringify(eachBin)}</div>;
              })}
            </Segment>
          </Segment.Group>
        </Container>
      </div>
    );
  }
}

export default Pickup;
