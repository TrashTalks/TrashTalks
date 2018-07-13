//-------------- Imports ----------------------//
	import React from "react";
	import { Modal, Container, Button, Grid, Form, 
		 Message, Loader, Dimmer, Checkbox} from 'semantic-ui-react';
	import "./emailSignUp.css";
//--------------------------------------------//

//-------------- Sign-up Log-In MODAL with the form -----------------//
var EmailSignUp = props =>

	<Modal 
		onClose={props.handleCloseESU} 
		open={props.isModalOpen} 
		size = "small" 
		closeIcon={{ name: 'close', color: 'grey' }}
	>
		
		<Modal.Header> 
			{"Join Our Mailing List"}
		</Modal.Header>

		<Modal.Content>
			<Modal.Description>
				<Container>
					<Grid stackable >
						<Grid.Row centered verticalAlign='middle'>
							
							<Grid.Column mobile={16} tablet={14} computer={12} largeScreen={12} widescreen={12}>

								{props.showMessage ?
									<Message className = {props.isMsgPositive ?"positive": "warning"} size="large" >
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
										<Form.Field>
											<Checkbox
												label='Join our mailing list'
												name='checkToJoinMailingList'
												onChange={props.handleCheckboxChange}
												checked = {props.isChecked}
											/>
										</Form.Field>
										<Button type = "submit" onClick = {props.addEmailToDB} id = "businessSignUpButton">
											{"Submit to join our list " }

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
export default EmailSignUp;