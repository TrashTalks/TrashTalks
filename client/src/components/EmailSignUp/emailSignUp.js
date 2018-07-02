//-------------- Imports ----------------------//
	import React from "react";
	import { Modal, Container, Button, Grid, Form, 
		Segment, Header, Icon, Message,
		Loader, Dimmer} from 'semantic-ui-react';
	import "./emailSignUp.css";
//--------------------------------------------//

//-------------- Sign-up Log-In MODAL with the form -----------------//
var EmailSignUp = props =>
<div id="emailButtonContainer"><span onClick={props.handleOpenESU}>{props.signUpClickWords}</span>

	<Modal onClose={props.handleCloseESU} open={props.isModalOpen} size = "small">
		<Segment clearing>
			<Header floated="left">{"Sign up for our mailing list!"}</Header>
			<Header floated="right">
					<Icon corner name="close" size="big" color="grey"  onClick={props.handleCloseESU} />
			</Header>
		</Segment>
		<Modal.Content>
			<Modal.Description>
				<Container>
					<Grid stackable >
						<Grid.Row centered verticalAlign='middle'>
							
							<Grid.Column mobile={16} tablet={14} computer={12} largeScreen={12} widescreen={12}>

								{props.showMessage ?
									<Message className = {props.msgHeader[0]==="T" ?"positive": "warning"} >
										<Message.Header>
											{props.msgHeader}
										</Message.Header>
										{props.msgContent}
									</Message>
								: null}

								{props.showForm ?
									<Form>

										<Form.Field required>
											<label> First Name: </label>
											<Form.Input
											className = "form-control"
											placeholder = "Preferred-First-Name"
											id = "signUpFName"
											type = "text"
											value = {props.signUpFName}
											onChange = {props.handleFNameChange}
											name ="PersonFirstName"
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
											name="PersonLastName"
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
											name = "PersonEmail"
											/>
										</Form.Field>

										<Button type = "submit" onClick = {props.addEmailToDB} id = "emailSignUpButton">
											Sign Up

										</Button>
									</Form>
								: null}

							</Grid.Column>
							
						</Grid.Row>	
					</Grid>
				</Container>
				
				<Dimmer active = {props.showLoader}>
					<Loader indeterminate>Checking mailing list ...</Loader>
				</Dimmer>
			</Modal.Description>
		</Modal.Content>
	</Modal>
</div>
export default EmailSignUp;