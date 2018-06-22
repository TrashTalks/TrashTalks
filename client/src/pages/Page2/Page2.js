import React, { Component } from "react";
import {Container,Image,Segment} from "semantic-ui-react";
import "./Page2.css";

class Page2 extends Component {

    render() {
		return(
			<div>
                <Container className = "page2Container">
                    <Segment.Group >
                        <Segment inverted className="landingTitle" id="EELandingTitle">
                            <h1>Yo momma so innovative....</h1>
                        </Segment>
                        
                        <Segment className="landingWords"> 
                            <p>She made these nice easter eggs!</p>
                            <Image src="https://www.impactbnd.com/hubfs/internet-easter-eggs.jpg?t=1527282880128" wrapped/>
                        </Segment>
				    </Segment.Group>
                    
                </Container>
            </div>
        )
    }
}   

export default Page2;
