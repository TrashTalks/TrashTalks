import React, { Component } from "react";
import {Segment,Grid,Container,Button} from "semantic-ui-react";
import Founders from "../../components/Founders";
import PersonCard from "../../components/PersonCard";
import PersonCardModal from "../../components/PersonCardModal";
import EmailSignUp from "../../components/EmailSignUp";
// import SlideDeck from "../../components/SlideDeck";
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
		showLoader: false
		

	};

	handleChanges = (e) =>{
		const {name,value} = e.target;
		this.setState({[name]: value});
	}; 
	emailAdded = (theRes) => {
		this.setState({msgHeader:"Thank You!"});
		this.setState({msgContent:theRes.data["added"]});
		this.setState({PersonName:""});
		this.setState({PersonEmail:""});
		this.setState({showEmailForm:false});
		this.setState({showLoader:false});
		this.setState({showMessage:true});
	};
	emailNotAdded = (theRes) => {
		this.setState({showMessage:true});

		theRes.data["error"]==="Email Already on list!" 
		? this.setState({msgHeader:"Awesome!"})
		: this.setState({msgHeader:"Sorry! Email Not Added"})
	 
		this.setState({msgContent:theRes.data["error"]});
		this.setState({showLoader:false});
	};
	addEmailToDB = event => {
		this.setState({showLoader:true});
		event.preventDefault();
		var info = {
		First_Name: this.state.PersonFirstName.trim(),
		Last_Name:this.state.PersonLastName.trim(),
		Subscriber_Email : this.state.PersonEmail.trim()
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
		this.setState({isPersonModalOpen: true });
			this.setState({modalImage:personClicked.imageLink});
			this.setState({modalName:personClicked.personName});
			this.setState({modalBio:personClicked.fullBio});
	}

	handleClose = () => {
		this.setState({ isPersonModalOpen: false })
	};

	handleCloseESU = () => {
		this.setState({isemailModalOpen: false })
		this.setState({PersonName:""});
		this.setState({PersonEmail:""});
	    this.setState({className:""});
		this.setState({msgHeader:""});
		this.setState({msgContent:""});
		this.setState({showEmailForm:true});
		this.setState({showMessage:false});

	};

	SDhandleClose = () => {
		this.setState({isSlideDeckOpen:false})
		this.setState({slideCount:0})
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

	render() {
		return(
			<div>

		  {/*------- Start of "PageContent"--------- */}
			<Container id="about">
				<Segment.Group>
					<Segment inverted   className="landingTitle" id  = "landingTitleBackground">
				  		<h1 >TrashTalks - We Listen!</h1>
					</Segment>
					<Segment className="landingWords"> 
						<p>
						TrashTalks has a mission to change the way that people think about their waste. 
						Through data analytics, consulting services, and innovative technology we educate 
						people and businesses to create a world where trash is no longer viewed as a waste, 
						but instead a resource. We believe that a circular economy is possible and we want 
						to do our part in creating it. TrashTalks is honored to begin as part of the Georgia 
						Tech CREATE-X accelerator where we are excited to grow and blossom.
						<br/><br/>
						The TrashTalks mobile application is coming soon! Please email trashtalks2018@gmail.com to request more information.
						</p>

					</Segment>
					<Button id = "isemailModalOpen" onClick={this.openThisModal} attached="bottom" className = "emailButton">Sign Up for Our Mailing List</Button>
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
