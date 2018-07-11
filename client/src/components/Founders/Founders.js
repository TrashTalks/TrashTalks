import React from 'react'
import "./Founders.css"
import {Grid, Container, Segment, Icon} from 'semantic-ui-react'


var Founders = props =>


			<Segment.Group >

				<Segment inverted className="foundersTitle" id = "foundersTitleBackground">
					<h1><Icon name="users" />{props.titleHeading}</h1>
				</Segment>

				<Segment>

				<Container>
				<Grid centered columns = "equal" stackable>
					{props.children}
				</Grid>
				</Container>
				</Segment>

			</Segment.Group>


export default Founders;