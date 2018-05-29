import React, { Component } from 'react';
import { Icon, Image,Grid } from 'semantic-ui-react'
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
            <div className="container">
                <Grid className="row" columns="equal" divided>
                    <Grid.Row className="socialMedia">
                     <Grid.Column><span></span><Image as="a"src="http://startupsummer.gatech.edu/images/launch.png" href="http://startupsummer.gatech.edu/" target="_blank" size="mini" centered/></Grid.Column>
                      <Grid.Column><a href="https://www.instagram.com/trashtalksinc" target="_blank" rel="noopener noreferrer"><Icon disabled name='instagram' size='big' color='teal'/></a></Grid.Column>
                      <Grid.Column><a href="https://twitter.com/trashtalksinc" target="_blank" rel="noopener noreferrer"><Icon disabled name='twitter' size='big' color='teal'/></a></Grid.Column>
                    </Grid.Row>
                    </Grid>
                    <div className="copyright">
                      Copyright &copy; TrashTalks 2018
                    </div>
            </div>
      </div>
    );
  }
}

export default Footer;
