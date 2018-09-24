import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Sidebar, Menu, Segment } from "semantic-ui-react";

//------Pages to render ---------//
import Landing from "./pages/Landing";
import Page2 from "./pages/Page2";
import ItemInfo from "./pages/ItemInfo";
import Page404 from "./pages/Page404";
// -----------------------------//

// ---Components for all pages ---//
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ContactUsModal from "./components/ContactUs";
import MapModal from "./components/MapModal";
// -----------------------------//

class App extends Component {
  state = {
    visible: false,
    leftMenuItems: [
      { word: "Updates", link: "/#updates" },
      { word: "Founders", link: "/#founders" }
    ]
  };
  handlePusher = () => {
    const visible = this.state.visible;
    if (visible) this.setState({ visible: false });
  };
  toggleMenu = () => this.setState({ visible: !this.state.visible });
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }
  openContactUsModal = () => {
    this.ContactUsModal.openThisModal();
  };
  closeContactUsModal = () => {
    this.ContactUsModal.handleClose();
  };
  openMapModal = () => {
    this.MapModal.openThisModal();
  };
  closeMapModal = () => {
    this.MapModal.handleClose();
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Sidebar.Pushable as={Segment} style={{ "margin-bottom": "0px" }}>
            <Sidebar
              as={Menu}
              onClick={this.toggleMenu}
              icon="labeled"
              animation="overlay"
              width="thin"
              visible={this.state.visible}
              vertical
              inverted
            >
              {this.state.leftMenuItems.map((item, index) => (
                <Menu.Item key={index} href={item.link}>
                  <h3>{item.word}</h3>
                </Menu.Item>
              ))}
              {/* <Menu.Item key = {2} href={"/scanner"}> <h3>{"Item Scanner"}</h3></Menu.Item> */}
              <Menu.Item key={3} onClick={this.openContactUsModal}>
                {" "}
                <h3>{"Contact Us"}</h3>
              </Menu.Item>
              <Menu.Item key={4} onClick={this.openMapModal}>
                {" "}
                <h3>{"Life of Trash"}</h3>
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher
              dimmed={this.state.visible}
              onClick={this.handlePusher}
            >
              <Navbar
                toggleMenu={this.toggleMenu}
                handlePusher={this.handlePusher}
                visible={this.state.visible}
                openContactUsModal={this.openContactUsModal}
                openMapModal={this.openMapModal}
              />

              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/EasterEgg" component={Page2} />
                <Route exact path="/scanner" component={ItemInfo} />
                <Route component={Page404} />
              </Switch>

              <Footer />

              <ContactUsModal
                onRef={ref => (this.ContactUsModal = ref)}
                parentRefToCloseModal={this.closeContactUsModal}
              />
              <MapModal
                onRef={ref => (this.MapModal = ref)}
                parentRefToCloseModal={this.closeMapModal}
              />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          {/* <Button
            icon
            secondary
            size="mini"
            color="black"
            style={{
              opacity: 0.5,
              "z-index": 5,
              position: "fixed",
              top: "90vh",
              right: "0vw"
            }}
            href="#topOfPage"
          >
            <Button.Content>
              <Icon name="arrow circle up" />
            </Button.Content>
          </Button> */}
        </div>
      </Router>
    );
  }
}

export default App;
