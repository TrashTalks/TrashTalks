//-------------- Imports ----------------------//
	import React from "react";
	import { Modal, Container, Button,Grid, Form, Segment, Header, Icon} from 'semantic-ui-react';
	import "./emailSignUp.css";
//--------------------------------------------//

//-------------- Sign-up Log-In MODAL with the form -----------------//
var EmailSignUp = props =>
<div id="emailButtonContainer"><span onClick={props.handleOpenESU}>{props.signUpClickWords}</span>

	<Modal onClose={props.handleCloseESU} open={props.ESUmodalOpen}>
		<Segment clearing>
			<Header floated="left"> Get placed on our mailing list for updates! </Header>
			<Header floated="right">
					<Icon corner name="close" size="big" color="grey"  onClick={props.handleCloseESU} />
			</Header>
		</Segment>
		<Modal.Content>
			<Modal.Description>
				<Container>
					<Grid stackable >
						<Grid.Row verticalAlign='middle'>

							<Grid.Column mobile={15} tablet={8} computer={8} largeScreen={8} widescreen={8}>
								<Form>
									<h3>Sign Up for our Mailing List </h3>

									<Form.Field required>
										<label> First Name: </label>
										<Form.Input
										className = "form-control"
										placeholder = "Preferred-First-Name"
										id = "signUpFName"
										type = "text"
										value = {props.signUpFName}
										onChange = {props.handleFNameChange}
										/>
									</Form.Field>

									<Form.Field required>
										<label> Last Name: </label>
										<Form.Input
										className = "form-control"
										placeholder = "Last-Name"
										id = "signUpLName"
										type = "text"
										value = {props.signUpLName}
										onChange = {props.handleLNameChange}
										/>
									</Form.Field>

									<Form.Field required>
										<label> Email: </label>
										<Form.Input
										className = "form-control"
										placeholder = "Email Address Here"
										id = "signUpEmail"
										type = "email"
										value = {props.signUpEmail}
										onChange = {props.handleEmailChange}
										/>
									</Form.Field>
									<div>
										<span>
											{props.msgHeader}<br/><br/>
											{props.msgContent}
										</span>
									</div>
									<Button type = "submit" onClick = {props.addEmailToDB}>
										Sign Up

									</Button>
								</Form>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</Modal.Description>
		</Modal.Content>
	</Modal>
</div>
export default EmailSignUp;