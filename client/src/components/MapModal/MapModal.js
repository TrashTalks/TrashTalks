import React, { Component } from "react";
import { Modal, Image} from "semantic-ui-react";
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
                basic
                size = "large"
            >
                
                {/* <Modal.Header floated="left"> 
                    Life of Trash Map
                </Modal.Header> */}

                <Modal.Content>

                    <Image fluid src="LifeOfTrashMapFinal.png"/>
                            
                </Modal.Content>
            </Modal>
    
        )
    }
}
export default MapModal;