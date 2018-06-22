import React, { Component } from "react";
import {Segment,Grid,Container,Button} from "semantic-ui-react";
import Founders from "../../components/Founders";
import PersonCard from "../../components/PersonCard";
import PersonCardModal from "../../components/PersonCardModal";
import EmailSignUp from "../../components/EmailSignUp";
import SlideDeck from "../../components/SlideDeck";
import "./Landing.css";
import API from "../../utils/API";
class LandingPage extends Component {

	state = { 
		modalOpen: false,
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
		ESUmodalOpen: false,
		foundersInfo:[],
		SDmodalOpen: false,
		slideCount: 0,
		slideTitles:["One","Two","Three","Four","Five","Six"]
		

	};

	handleFNameChange = (e) =>{
		this.setState({PersonFirstName: e.target.value});
	}; 
	handleLNameChange = (e) =>{
		this.setState({PersonLastName: e.target.value});
	};  
	handleEmailChange= (e) => {
		this.setState({PersonEmail: e.target.value});
	};

	addEmailToDB = event => {
		event.preventDefault();
		var info = {
		First_Name: this.state.PersonFirstName.trim(),
		Last_Name:this.state.PersonLastName.trim(),
		Subscriber_Email : this.state.PersonEmail.trim()
		};
		
		API.addUserToEmailList(info)
			.then(res => {
				this.setState({msgHeader:"Thank You!"});
				this.setState({msgContent:res.data});
				this.setState({PersonName:""});
				this.setState({PersonEmail:""});
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
  	

	handleOpen = (personClicked,e) => {
		this.setState({modalOpen: true });
		this.setState({modalImage:personClicked.imageLink});
		this.setState({modalName:personClicked.personName});
		this.setState({modalBio:personClicked.fullBio});
		
	};

	handleClose = () => {
		this.setState({ modalOpen: false })
	};

	//ESU: Email Sign Up
	handleOpenESU = () => {
		this.setState({ESUmodalOpen: true });

	};
	handleCloseESU = () => {
		this.setState({ESUmodalOpen: false })
		this.setState({PersonName:""});
		this.setState({PersonEmail:""});
	    this.setState({className:""});
		this.setState({msgHeader:""});
		this.setState({msgContent:""});
		this.setState({msgContent:""});
	};

	SDmodalOpen = () =>{
		this.setState({SDmodalOpen:true})
	};
	SDhandleClose = () => {
		this.setState({SDmodalOpen:false})
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
					<Button onClick={this.handleOpenESU} attached="bottom" className = "emailButton" id ="landingTitleButton">Sign Up for Our Mailing List</Button>
					<EmailSignUp
						handleOpenESU = {this.handleOpenESU}
						ESUmodalOpen={this.state.ESUmodalOpen}
						handleCloseESU={this.handleCloseESU.bind(this)}

						signUpFName={this.PersonFirstName}
						handleFNameChange={this.handleFNameChange}

						signUpLName={this.PersonLastName}
						handleLNameChange={this.handleLNameChange}

						signUpEmail={this.PersonEmail}
						handleEmailChange = {this.handleEmailChange}

						addEmailToDB={this.addEmailToDB}
						className={this.state.className}
						msgHeader={this.state.msgHeader}
						msgContent={this.state.msgContent} 
					/>
				</Segment.Group>

			</Container>

			<Container id="founders">	
				<Founders
					titleHeading="Meet the Founders"
				>

					{this.state.foundersInfo.map((eachFounder, index) => {
						let boundItemClick = this.handleOpen.bind(this, eachFounder);
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
						modalOpen = {this.modalOpen}
						handleClose = {this.handleClose}
						modalImage = {this.state.modalImage}
						modalName = {this.state.modalName}
						modalBio = {this.state.modalBio}
					/>

				</Founders>

			</Container>
 
			{/*---------- End of "PageContent" ---------*/}
			<SlideDeck
				modalOpen = {this.state.SDmodalOpen}
				handleClose = {this.SDhandleClose}
				modalImage = {"TrashTalks_Slide"+(this.state.slideCount+1)+".png"} 
				SDtitle = {this.state.slideTitles[this.state.slideCount]}
				slideBack = {this.slideBackNow}
				slideForward = {this.slideForwardNow}
			/>
			<Button onClick = {this.SDmodalOpen} content = "Slide Deck"/>
			</div>
	    )
	}
}

export default LandingPage;
