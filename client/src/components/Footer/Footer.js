import React, { Component } from 'react';
import { Icon, Image,Grid, List } from 'semantic-ui-react'
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
            <div className="container">
                <Grid centered>
                      <List horizontal size="huge" divided relaxed>
                        <List.Item id="Navitem1">
                          <a><Image as="a"src="http://startupsummer.gatech.edu/images/launch.png" href="http://startupsummer.gatech.edu/" target="_blank" size="mini" centered/></a>
                        </List.Item>
                        <List.Item id="Navitem2">
                          <a href="https://www.instagram.com/trashtalksinc" target="_blank" rel="noopener noreferrer">
                            <Icon  name='instagram' size='big'  className = "footerIcons"/>
                          </a>
                          </List.Item>
                        <List.Item id="Navitem3">
                          <a href="https://twitter.com/trashtalksinc" target="_blank" rel="noopener noreferrer">
                            <Icon  name='twitter' size='big'  className = "footerIcons"/>
                          </a>
                        </List.Item >
                      </List>
                    </Grid>
                    <div className="copyright">
                      Copyright &copy;<a href = "/easteregg">.</a> TrashTalks 2018
                    </div>
            </div>
      </div>
    );
  }
}

export default Footer;
