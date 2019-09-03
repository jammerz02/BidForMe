import React, { useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Confirmation } from '../../../components/confirmation/Confirmation';

const  AddItem = (props) => {
    const [values, setValues] = useState({
      modal: false,
      itemName:"",
      itemStartingBid:""
    })

  const handleOnChange = (event) => {
    const {name, value} = event.target
    setValues({...values, [name]: value})
  }

  const toggle = () => {
    setValues({...values, modal: !values.modal})
  }

  const handleUpdateItem = () => {
    props.handleAddItem(values.itemName, values.itemStartingBid, values.modal);
    setValues({...values, modal: !values.modal})
  }

  return (
    <div>
      <Button className="float-right col-lg-3" color="primary" onClick={toggle}>Add an Item for Bidding</Button>
      <Modal isOpen={values.modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Add Item</ModalHeader>
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
                                  value = { values.itemName }
                                  onChange = { handleOnChange }
                              /> 
                          </div>
                          <div className="row">
                              <label className="col-lg-3"> Starting Bid </label> 
                              <input
                                  className="form-control col-lg-9"
                                  type = "number"
                                  name = "itemStartingBid"
                                  placeholder = "Starting Bid"
                                  value = { values.itemStartingBid }
                                  onChange = { handleOnChange }
                              />
                          </div>
                      </div>
                  </div>
        </ModalBody>
        <ModalFooter >
        <Confirmation 
            className="modal-margin"
            handleUpdateItem={handleUpdateItem}
            title={'Add Item'}
            message={'Are you sure you want to Add this Item?'}
            confirmation={'Yes'}
            cancel={'No'}
          />{' '}
          <div className="col-lg-6">
            <Button className="modal-margin" color="secondary" onClick={toggle }>Cancel</Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddItem;