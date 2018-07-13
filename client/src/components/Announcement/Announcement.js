import React from 'react'
import "./Announcement.css"
import { Container, Segment, Icon, Button} from 'semantic-ui-react'


var Announcement = props =>
    <Container id="announcement">
        <Segment.Group>
            <Segment inverted   className="landingTitle" id="landingAnnouncements" >
                <h1 id="h1Announcement"><Icon name="announcement" />Announcement</h1>
            </Segment>
            <Segment className="landingWords"> 
                <br/>
                <p>
                {props.theAnnoucement}
                </p>
                <br/>	
            </Segment>
            {props.showButton 
                ?<Button 
                        as ="a" 
                        id="AnnouncementButton" 
                        href = {props.buttonLink}
                        target="_blank" 
                        attached="bottom"
                    >
                        <Icon name = {props.iconName}/> {props.buttonText}
                </Button> 
                : null
            }
        </Segment.Group>
    </Container>
export default Announcement;