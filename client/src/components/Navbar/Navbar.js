import React from 'react';
import "./Navbar.css";
import { Menu, Icon, Responsive} from 'semantic-ui-react';

// const dropdownChoices = [
//   { key: 1, text: 'Choice 1', value: 1 },
//   { key: 2, text: 'Choice 2', value: 2 },
//   { key: 3, text: 'Choice 3', value: 3 },
// ];

const leftMenuItems = [
  {word:"About",link:"#about"},
  {word:"Founders",link:"#founders"},
]

const rightMenuItems = [
  {iconName:"instagram",link:"https://www.instagram.com/trashtalksinc"},
  {iconName:"twitter",link:"https://twitter.com/trashtalksinc"}

];

var NavComponent = (props) => 
<div>
  <Responsive minWidth = {Responsive.onlyTablet.minWidth}>
    <Menu borderless pointing >
      <Menu.Item>

        <Icon.Group size='huge'> 
          <Icon name='trash' className = "navbarIcons"/>
        </Icon.Group>

        <h2>TrashTalks</h2>

      </Menu.Item>
     
        
        {leftMenuItems.map( (item,index) => <Menu.Item key={index} href={item.link}><h3>{item.word}</h3></Menu.Item>)}
        
        <Menu.Menu position = "right">
          {rightMenuItems.map( (item,index) => <Menu.Item key={index} href={item.link} target="_blank" rel="noopener noreferrer"><h3>{item.word}</h3><Icon  name={item.iconName} size='big' className = "navbarIcons"/></Menu.Item>)}
        </Menu.Menu>
    </Menu>
  </Responsive>

  <Responsive {...Responsive.onlyMobile}>
        <Menu borderless>

          <Menu.Item >
              <Icon.Group size='huge'> 
               <Icon name='trash' className = "navbarIconsHam"/>
              </Icon.Group>

              <h2>TrashTalks</h2>
          </Menu.Item>

          <Menu.Item position="right" onClick={props.toggleMenu}><Icon name="sidebar" position='right' size="large" className = "navbarIconsHam"/></Menu.Item>
        </Menu>
  </Responsive>
</div>



export default NavComponent;
      