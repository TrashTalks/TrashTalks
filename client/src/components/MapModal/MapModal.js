import React, { Component } from "react";
import { Grid, Button, Modal, Image} from "semantic-ui-react";
import "./MapModal.css";
// import ItemModal from "../../components/ItemModal";

class MapModal extends Component {

    state = {
      showTheMap: false
    }
    
    componentDidMount() {
        this.props.onRef(this)
    }

    openThisModal = () => {
        this.setState({
            showTheMap: true,
        })    
    };

    handleClose = () => {
        this.setState({
            showTheMap:false,
        })
        
    };
 
    render() {
		return(

            <Modal
                open={this.state.showTheMap}
                onClose={this.props.parentRefToCloseModal}
                closeIcon={{ name: 'close', color: 'grey' }}
                size = "large"
            >
                
                <Modal.Header floated="left"> 
                    Life of Trash Map
                </Modal.Header>

                <Modal.Content>
                    <Modal.Description>

                        <Grid columns={1} centered>
                            <Grid.Column mobile={14} tablet={14} computer={14} largeScreen={14} widescreen={14}>
                                <Image src="TrashTalks_Slide1.png"/>
                            </Grid.Column>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
    
        )
    }
}
export default MapModal;