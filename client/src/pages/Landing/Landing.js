import React, { Component } from "react";
import {Segment, Grid, Container, Button, Icon, Card} from "semantic-ui-react";
import Founders from "../../components/Founders";
import PersonCard from "../../components/PersonCard";
import PersonCardModal from "../../components/PersonCardModal";
import EmailSignUp from "../../components/EmailSignUp";
// import SlideDeck from "../../components/SlideDeck";
import ContactUsModal from "../../components/ContactUs"
import "./Landing.css";
import API from "../../utils/API";
class LandingPage extends Component {

	state = { 
		isPersonModalOpen: false,
		modalName: "",
		modalImage: "",
		modalBio:"",
		PersonFirstName: "",
		PersonLastName:"",
    	PersonEmail:"",
    	msgHeader:"",
    	msgContent:"",
		className:"",
		leftMenuItems: [
			{word:"About",link:"#about"},
			{word:"Founders",link:"#founders"}
			],
		isemailModalOpen: false,
		foundersInfo:[],
		isSlideDeckOpen: false,
		slideCount: 0,
		slideTitles:["One","Two","Three","Four","Five","Six"],
		showEmailForm:true,
		showMessage: false,
		showLoader: false,
		isBoxChecked: false,
		ContactUsModal:false,
		annoucements: [
			{
				header: "The Beginning",
				meta: "May 15, 2018",
				description: "TrashTalks Inc. began their start-up journey with Create-X and is currently conducting customer interviews. To request a meeting to discuss your experiences with your trash hauler, click here:  "
			},
			{
				header: "Product Day",
				meta: "June 11, 2018",
				description: "TrashTalks Inc. will have a table on the 2nd floor of Georgia Tech's Clough Commons between 4 pm - 8pm."
			},
			{
				header: "Coming Soon",
				meta: "TBA",
				description: "Sign up for our mailing list for general TrashTalks updates and for news about our mobile app."
			}
		]
		

	};

	handleChanges = (e) =>{
		const {name,value} = e.target;
		this.setState({[name]: value});
	}; 
	emailAdded = (theRes) => {
		this.setState({msgHeader:"Thank You!",
			msgContent:theRes.data["added"],
			PersonName:"",
			PersonEmail:"",
			showEmailForm:false,
			showLoader:false,
			showMessage:true
		});
	};
	emailNotAdded = (theRes) => {
		this.setState({showMessage:true});

		theRes.data["error"]==="Email Already on list!" 
		? this.setState({msgHeader:"Awesome!"})
		: this.setState({msgHeader:"Sorry! Email Not Added"})
	 
		this.setState({msgContent:theRes.data["error"],
			showLoader:false
		});
	};
	addEmailToDB = event => {
		this.setState({showLoader:true});
		event.preventDefault();
		var info = {
			First_Name: this.state.PersonFirstName.trim(),
			Last_Name:this.state.PersonLastName.trim(),
			Subscriber_Email : this.state.PersonEmail.trim(),
			MailList: this.state.isBoxChecked
		};

		API.addUserToEmailList(info)
			.then(res => {
				res.data["added"] ? this.emailAdded(res) : this.emailNotAdded(res) 
			}).catch((error) => {
				console.log(error);
			});
	};   
	componentDidMount() {

		API.grabFoundersInfo()
			.then(res=>{
				this.setState({foundersInfo:res.data});
				console.log("API.grabFoundersInfo res: "+ res.data);
			}).catch((error)=>{
				console.log("API.grabFoundersInfo Error: "+ error);
			})
	};
  	

	openThisModal = (personClicked,e) => {
		personClicked.target === undefined 
		? this.displayPersonModalInfo(personClicked)
		: this.setState({[personClicked.target.id]: true})
		
	};

	displayPersonModalInfo = (personClicked) => {
		this.setState({isPersonModalOpen: true ,
			modalImage:personClicked.imageLink,
			modalName:personClicked.personName,
			modalBio:personClicked.fullBio
		});
	}

	handleClose = () => {
		this.setState({ isPersonModalOpen: false })
	};

	handleCloseESU = () => {
		this.setState({isemailModalOpen: false ,		
			PersonName:"",
			PersonEmail:"",
			className:"",
			msgHeader:"",
			msgContent:"",
			showEmailForm:true,
			showMessage:false,
			isBoxChecked:false
		})
	};

	SDhandleClose = () => {
		this.setState({isSlideDeckOpen:false,
		slideCount:0})
	};
	slideBackNow = () => {
		var theCount = this.state.slideCount;
		if(theCount===0){
			this.setState({slideCount:5})
		}
		else{
			theCount -=1;
			this.setState({slideCount: theCount});
		}
		this.setState({})
	};
	slideForwardNow = () => {
		var theCount = this.state.slideCount;
		if(theCount===5){
			this.setState({slideCount:0})
		}
		else{
			theCount +=1;
			this.setState({slideCount:theCount});
		}
		this.setState({})
	};
	handleCheckboxChange = () =>{
		this.setState({ isBoxChecked:true})
	}

	closeContactUsModal = () => {
		this.ContactUsModal.handleClose()
	}
	openContactUsModal = () => {
		this.ContactUsModal.openThisModal()
	}
	render() {
		return(
			<div>

		  {/*------- Start of "PageContent"--------- */}
			<Container id="annoucement">
				<Segment.Group>
					<Segment inverted   className="landingTitle" id  = "landingAnnoucements" >
				  		<h1 id="h1Annoucement"><Icon name="announcement" />Announcement</h1>
					</Segment>
					<Segment className="landingWords"> 
						<p>
						Product Day is coming up on July 11th at Georgia Tech! We are super excited to share 
						what we have been working on with Create-X this summer. Mark your calendars for July 
						11th 4pm-8pm, and be sure to stop by our booth at Clough Undergraduate Learning 
						Commons, on the 2nd Floor, to speak with us in person about our vision and goals.
						</p>
					</Segment>
					<Button id = "isemailModalOpen" onClick={this.openThisModal} attached="bottom" className = "emailButton">Click Here To Recieve Our Business Cards</Button>
				</Segment.Group>
			</Container>
			<Container id = "updates">
				<Segment.Group>
					<Segment inverted   className="landingTitle" id  = "landingTitleBackground">
				  		<h1 >Updates</h1>
					</Segment>
					<Segment className="landingWords">
						<Card.Group centered> 
						
							{this.state.annoucements.map(oneAncmt => 	
								    <Card 
										header={oneAncmt.header}
										meta = {oneAncmt.meta}
										description={
											oneAncmt.header ==="The Beginning" 
											? <div><br/>{oneAncmt.description} <Icon link name = "mail" id = "ContactUsModal" onClick={this.openContactUsModal}/></div>
											: <div><br/>{oneAncmt.description}</div>}>
											
									</Card>
							)}	
						</Card.Group>
					</Segment>
				
					<EmailSignUp
						showForm = {this.state.showEmailForm}
						handleOpenESU = {this.openThisModal}
						isModalOpen={this.state.isemailModalOpen}
						handleCloseESU={this.handleCloseESU.bind(this)}

						signUpFName={this.PersonFirstName}
						handleFNameChange={this.handleChanges}

						signUpLName={this.PersonLastName}
						handleLNameChange={this.handleChanges}

						signUpEmail={this.PersonEmail}
						handleEmailChange = {this.handleChanges}

						addEmailToDB={this.addEmailToDB}
						className={this.state.className}
						msgHeader={this.state.msgHeader}
						msgContent={this.state.msgContent} 
						showMessage = {this.state.showMessage}
						showLoader = {this.state.showLoader}

						isBoxChecked = {this.state.isBoxChecked}
						handleCheckboxChange = {this.handleCheckboxChange}
					/>
				</Segment.Group>

			</Container>

			<Container id="founders">	
				<Founders
					titleHeading="Meet the Founders"
				>

					{this.state.foundersInfo.map((eachFounder, index) => {
						let boundItemClick = this.openThisModal.bind(this, eachFounder);
						return (
							<Grid.Column key={index} mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={5}>
								<PersonCard
									imageLink={eachFounder.imageLink}
									personName = {eachFounder.personName}
									personTitle= {eachFounder.personTitle}
									personDescription={eachFounder.personDescription}
									funFact = {eachFounder.funFact}
									iconTypeName = {"comment"}
									showModalBio = {boundItemClick}
								/>
							</Grid.Column>	
						)
					})}

					<PersonCardModal
						modalOpen = {this.state.isPersonModalOpen}
						handleClose = {this.handleClose}
						modalImage = {this.state.modalImage}
						modalName = {this.state.modalName}
						modalBio = {this.state.modalBio}
					/>
					<ContactUsModal
						onRef = {ref => (this.ContactUsModal = ref)}
						parentRefToCloseModal = {this.closeContactUsModal}
					/>
				</Founders>

			</Container>
 
			{/*---------- End of "PageContent" ---------*/}
			{/* <SlideDeck
				modalOpen = {this.state.isSlideDeckOpen}
				handleClose = {this.SDhandleClose}
				modalImage = {"TrashTalks_Slide"+(this.state.slideCount+1)+".png"} 
				SDtitle = {this.state.slideTitles[this.state.slideCount]}
				slideBack = {this.slideBackNow}
				slideForward = {this.slideForwardNow}
			/>
			<Button id ="isSlideDeckOpen" onClick = {this.openThisModal} content = "Slide Deck"/> */}
			</div>
	    )
	}
}

export default LandingPage;
