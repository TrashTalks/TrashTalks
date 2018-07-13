import React, { Component } from "react";
import moment from "moment";
import {Grid, Container, Card} from "semantic-ui-react";
import Founders from "../../components/Founders";
import PersonCard from "../../components/PersonCard";
import PersonCardModal from "../../components/PersonCardModal";
import EmailSignUp from "../../components/EmailSignUp";
// import SlideDeck from "../../components/SlideDeck";
import ContactUsModal from "../../components/ContactUs";
import Annoucement from "../../components/Announcement";
import AboutUs from "../../components/AboutUs";
import UpdatesCard from "../../components/UpdatesCard";
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
		updates: [],
		joinListTooMsg: "",
		isMsgPositive:false,
		showAnnouncement:false

	};

	handleChanges = (e) =>{
		const {name,value} = e.target;
		this.setState({[name]: value});
		this.setState({showMessage:false})
	}; 
	emailAdded = (theRes) => {
		this.setState({msgHeader:"Thank You!",
			PersonName:"",
			PersonEmail:"",
			showEmailForm:false,
			showLoader:false,
			showMessage:true,
			isMsgPositive:true
		})

		this.state.isBoxChecked
		? this.setState({msgContent:theRes.data["added"] +" Business Cards are on the way!"})
		: this.setState({msgContent:"Business Cards are on the way!"})
	};
	emailNotAdded = (theRes) => {
		this.setState({showMessage:true});

		theRes.data["error"]==="Email Already on list!" 
		? this.setState({
			msgHeader:"Awesome!",
			msgContent:"Business cards are on the way!",
			showEmailForm:false,
			isMsgPositive:true

		})
		: this.setState({
			msgHeader:"Sorry! Email is invalid.",
			msgContent: "Check your email entry and try again."
		})
	 
		this.setState({
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
			});
		
		API.grabUpdates()
			.then(res =>{
				this.setState({updates:res.data})
			})
			.catch(error =>{
				 console.log(error)
			});
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
			modalBio:personClicked.fullBio,
			modalLinkedIn: personClicked.linkedIn
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
			isBoxChecked:false,
			joinListTooMsg:"",
			isMsgPositive:false
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
		this.setState({ isBoxChecked:!this.state.isBoxChecked})
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
			
			{this.state.showAnnouncement 
				? <Annoucement
					theAnnouncement = "Some announcement from the db"
					showButton = {true}
					buttonLink = {"href from db"}
					iconName = {"iconName from db"}
					buttonText = {"Text for button from db"}

				/>
				: null}
				<Container id = "announcementsAndUpdatesContainer">
			<Grid stackable>
				<Grid.Row>
				<Grid.Column width = {11}>
					<AboutUs
						openContactUsModal={this.openContactUsModal} 
						openThisModal={this.openThisModal} 
					/>
				</Grid.Column>
				<Grid.Column width = {5}>
					<UpdatesCard>
						{this.state.updates.map(oneAncmt => 	
								<Card 
									header={oneAncmt.title}
									meta = {oneAncmt.sub_title}
									description={oneAncmt.content}
									onClick = {oneAncmt.link ? () => window.open(oneAncmt.link) :null}
									style = {moment(oneAncmt.event_date,"L").isBefore( moment().now) ? {"background":"#E2E2E2" }:null}	
								/>
						)}	
					</UpdatesCard>
					</Grid.Column>
					</Grid.Row>
					</Grid>
					</Container>
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
						joinListTooMsg = {this.state.joinListTooMsg}
						handleCheckboxChange = {this.handleCheckboxChange}
						isMsgPositive = {this.state.isMsgPositive}
						isChecked = {this.state.isBoxChecked}
					/>
				

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
						modalLinkedIn = {this.state.modalLinkedIn}
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
