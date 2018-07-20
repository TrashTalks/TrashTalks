import React, { Component } from "react";
import { Container, Segment, Grid, Form, Button } from "semantic-ui-react";
import "./ItemInfo.css";
import ItemModal from "../../components/ItemModal";
import API from "../../utils/API";

class ItemInfo extends Component {
  state = {
    materialInput: "",
    upcInput: "",
    components: [],
    material_name: "",
    producing_company: "",
    product_description: "",
    isItemOpen: false,
    isRecyclable: "",
    isVerified: "",
    itemImage: "",
    binLocation: "",
    binType: ""
  };

  handleChanges = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };

  searchMaterialDB = event => {
    event.preventDefault();
    var material = {
      material_name: this.state.materialInput.trim(),
      upc_code: this.state.upcInput.trim()
    };

    API.searchMaterial(material)
      .then(res => {
        this.setState({ material_name: res.data.material_name });
        this.setState({ producing_company: res.data.producing_company });
        this.setState({ product_description: res.data.product_description });
        this.setState({ components: res.data.components });
        this.setState({ isItemOpen: true });
        this.setState({ isRecyclable: res.data.wholly_recyclable });
        this.setState({ isVerified: res.data.verified });
        this.setState({ itemImage: res.data.img_url });

        res.data.bin_location !== "g"
          ? this.setState({ binLocation: res.data.bin_location })
          : this.setState({ binLocation: "g" });

        res.data.bin_type !== "g"
          ? this.setState({ binType: res.data.bin_type })
          : this.setState({ binType: "g" });
      })
      .catch(error => {
        console.log(error);
      });
  };
  closeItem = () => {
    this.setState({ isItemOpen: false });
  };

  render() {
    return (
      <div>
        <Container id="infoBinColumns">
          <Grid columns={1} centered>
            <Grid.Column>
              <Segment.Group>
                <Segment
                  inverted
                  className="landingTitle"
                  id="landingTitleBackground"
                >
                  <h1>Search Waste Material</h1>
                </Segment>

                <Segment className="landingWords">
                  <div id="scanner-container">
                    <Button id="scannerButton"> Start/Stop the Scanner </Button>
                  </div>
                  <Form>
                    <Form.Field>
                      <label> Material Search: </label>
                      <Form.Input
                        className="form-control"
                        placeholder="Waste Material"
                        id="wasteMaterialSearch"
                        type="text"
                        onChange={this.handleChanges}
                        name="materialInput"
                      />
                      <label> UPC Search: </label>
                      <Form.Input
                        className="form-control"
                        placeholder="UPC Code"
                        id="wasteUpcSearch"
                        type="text"
                        onChange={this.handleChanges}
                        name="upcInput"
                      />
                    </Form.Field>
                    <Button
                      type="submit"
                      onClick={this.searchMaterialDB}
                      id="MatSearchButton"
                    >
                      Submit
                    </Button>
                  </Form>
                </Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid>

          {this.state.components !== undefined ? (
            <ItemModal
              modalOpen={this.state.isItemOpen}
              handleClose={this.closeItem}
              itemName={this.state.material_name}
              itemImage={this.state.itemImage}
              isRecyclable={this.state.isRecyclable}
              isVerified={this.state.isVerified}
              productDescription={this.state.product_description}
              companyName={this.state.producing_company}
              binLocation={this.state.binLocation}
              binType={this.state.binType}
              binMapImage="Culc2ndFloor.png"
            >
              {this.state.components.map((component, index) => {
                return <div key={index}>{component}</div>;
              })}
            </ItemModal>
          ) : null}
        </Container>
      </div>
    );
  }
}

export default ItemInfo;
