import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Sidebar,Icon,Menu,Segment } from "semantic-ui-react";
import Landing from "./pages/Landing";
import Page2 from "./pages/Page2";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

class App extends Component {

  state={
    visible:false,
    leftMenuItems: [
			{word:"About",link:"#about"},
			{word:"Founders",link:"#founders"}
			]
  }
  handlePusher = () =>{ 
    const visible = this.state.visible;
    if (visible) this.setState({ visible: false });}
  toggleMenu = () =>this.setState({ visible: !this.state.visible })
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  render() {
    return (
      <Router>
        <div className="App">
        <Sidebar.Pushable as={Segment}>

          <Sidebar as={Menu} onClick={this.toggleMenu} icon = "labeled" animation='overlay' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
		      	{this.state.leftMenuItems.map( item => <Menu.Item href={item.link}><h3>{item.word}</h3></Menu.Item>)}
          </Sidebar>

          <Sidebar.Pusher dimmed={this.state.visible} onClick={this.handlePusher}>
            <Navbar
              toggleMenu = {this.toggleMenu}
              handlePusher = {this.handlePusher}
              visible={this.state.visible}
            />

            <Switch>
              <Route exact path = "/" component = {Landing} />
              <Route exact path = "/EasterEgg" component = {Page2}/>
            </Switch>

            <Footer />
          </Sidebar.Pusher>
		    </Sidebar.Pushable>
        </div>
      </Router>
    )
  }
}


export default App;
