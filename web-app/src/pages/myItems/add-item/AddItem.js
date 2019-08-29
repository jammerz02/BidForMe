import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalShow,
      itemName:"",
      itemStartingBid:""
    };

    this.toggle = this.toggle.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnChange = (event) => {
    const {name, value} = event.target
    this.setState({...this.state, [name]: value})
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleOnClick = (event) => {
    event.preventDefault();
    console.log("clicked")
    console.log(this.state.modal)
    this.props.handleAddItem(this.state.itemName, this.state.itemStartingBid,this.state.modal);
    this.setState(prevState => ({
        modal: this.props.modalShow
    }));
  }

  render() {
    return (
      <div>
        <Button className="float-right col-lg-3" color="primary" onClick={this.toggle}>Add an Item for Bidding</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalHeader toggle={this.toggle}>Add Item</ModalHeader>
          <ModalBody>
            <div className="row modal-margin">
                        <div className="col-md-12 col-lg-12">
                            <div className="row">
                                <label className="col-lg-3"> Item Name </label> 
                                <input
                                    className="form-control col-lg-9"
                                    type = "text"
                                    name = "itemName"
                                    placeholder = "Item Name"
                                    value = { this.state.itemName }
                                    onChange = { this.handleOnChange }
                                /> 
                            </div>
                            <div className="row">
                                <label className="col-lg-3"> Starting Bid </label> 
                                <input
                                    className="form-control col-lg-9"
                                    type = "number"
                                    name = "itemStartingBid"
                                    placeholder = "Starting Bid"
                                    value = { this.state.itemStartingBid }
                                    onChange = { this.handleOnChange }
                                />
                            </div>
                        </div>
                    </div>
          </ModalBody>
          <ModalFooter >
            <Button className="modal-margin" color="primary" onClick={this.handleOnClick}>Add Item</Button>{' '}
            <Button className="modal-margin" color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;