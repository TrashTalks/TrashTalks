import React, { Component } from "react";
import {Segment, Image,Grid,Container,Modal,Header,Icon,Button} from "semantic-ui-react";
import Founders from "../../components/Founders";
import PersonCard from "../../components/PersonCard";
import PersonCardModal from "../../components/PersonCardModal";
import EmailSignUp from "../../components/EmailSignUp";
import "./Landing.css";
import API from "../../utils/API";
class LandingPage extends Component {

	state = { 
		modalOpen: false,
		modalName: "",
		modalImage: "",
		modalBio:"",
		FounderInfo:[

	  		{imageLink:"https://media.licdn.com/dms/image/C4D03AQHQRSCSXG12oQ/profile-displayphoto-shrink_800_800/0?e=1531958400&v=beta&t=1iPK7E-jkRxgejW1gj9y-rJ2I4601fZeqj-BikRW8tU"
			,personName : "Luke Chambers"
			,personTitle:"Founder"
			,personDescription:"Luke was trained as an Environmental Engineer. He worked in the waste industry for 4 years and as a programmer for two."
			,iconTypeName : "comment"
			,funFact : "Luke has been interested in trash since he was 10 years old."
			,fullBio: "Luke was trained as an Environmental Engineer at Georgia Tech and has worked in the waste industry for 4 years and as a programmer for two. He loves to listen to podcasts, to go rock climbing, playing with his dogs, and eating chocolate. Once prompt about trash, he'll talk your ear off. He truly is our #1 TrashTalker!"
			},

			{imageLink:"https://media.licdn.com/dms/image/C5603AQGl34s5xlSYzw/profile-displayphoto-shrink_800_800/0?e=1531958400&v=beta&t=r8lq55ictMWCz6Jc_QWBRkEDTe-RqBNmX9c9YolLLAo"
			,personName : "Jacqueline Alexander"
			,personTitle:"Founder - CEO"
			,personDescription:"Jackie is a current Economics student at Georgia Tech and has been running her own personal training business for 3 years."
			,iconTypeName : "comment"
			,funFact : "Jackie has a goal to live to 250 years old."
			,fullBio: "Jackie is a current Economics student at Georgia Tech and has been running her own personal training business for 3 years. She is very mindful, likes to take naps, constantly thinks of new business ideas, and also loves chocolate. Currently, Jackie is practicing calligraphy and would like to have her own calligraphy business."
			},

			{imageLink:"https://media.licdn.com/dms/image/C5603AQFiACgknILK3w/profile-displayphoto-shrink_800_800/0?e=1531958400&v=beta&t=XVYYpdnpADFawdCvThOiqE903oEc7LItEUvlCv8dblQ "
			,personName : "Arturo Salmeron"
			,personTitle:"Founder"
			,personDescription:"Arturo has a Materials Science degree from Georgia Tech and skills in software development."
			,iconTypeName : "comment"
			,funFact : "Arturo loves to cook, rock climb, and sing in the car."
			,fullBio: "Arturo has a Materials Science & Engineering degree from Georgia Tech and skills in software development. Arturo loves to cook, enjoys rock climbing (bouldering), and really enjoys singing in the car; high notes are not off limits."
			}
		],

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
		ESUmodalOpen: false

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
	}    

  
  	

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
	}

	render() {
		return(
			<div>

		  {/*------- Start of "PageContent"--------- */}
			<Container id="about">
				<Segment.Group>
					<Segment inverted color="teal" className="landingTitle">
				  		<h1>TrashTalks - We Listen!</h1>
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
					<Button onClick={this.handleOpenESU} attached="bottom" color="teal">Sign Up for Our Mailing List</Button>
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

					{this.state.FounderInfo.map(eachFounder => {
						let boundItemClick = this.handleOpen.bind(this, eachFounder);
						return (
							<Grid.Column mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={5}>
								<PersonCard
									key ={eachFounder.id}
									imageLink={eachFounder.imageLink}
									personName = {eachFounder.personName}
									personTitle= {eachFounder.personTitle}
									personDescription={eachFounder.personDescription}
									funFact = {eachFounder.funFact}
									iconTypeName = {eachFounder.iconTypeName}
									showModalBio = {boundItemClick}
								/>
							</Grid.Column>	
						)
					})}

					<PersonCardModal
						modalOpen = {this.state.modalOpen}
						handleClose = {this.handleClose}
						modalImage = {this.state.modalImage}
						modalName = {this.state.modalName}
						modalBio = {this.state.modalBio}
					/>

				</Founders>

			</Container>
 
			{/*---------- End of "PageContent" ---------*/}

			</div>
	    )
	}
}

export default LandingPage;
