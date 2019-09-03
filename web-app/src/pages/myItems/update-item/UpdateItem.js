import React, { useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip } from 'reactstrap';
import { FiEdit } from 'react-icons/fi'
import { Confirmation } from '../../../components/confirmation/Confirmation';

const  UpdateItem = (props) => {
  const [values, setValues] = useState({
      modal: false,
      itemId: props.item.id.toNumber(),
      itemName: props.item.name,
      itemStartingBid: props.item.bidValueStarting.toNumber(),
      tooltipOpen: false
 
  })

  const handleOnChange = (event) => {
    const {name, value} = event.target
    setValues({...values, [name]: value})
  }

  const toggle = () => {
    if(props.item.bidValueDollar.toNumber() === 0) {
      setValues({...values, modal: !values.modal})
    } else {
      alert('Error! Bidding already started.')
    }
  }

  const toggleTooltip = () => {
    setValues({...values, tooltipOpen: !values.tooltipOpen})
  }

  const handleUpdateItem = () => {
    props.handleUpdateItem(values.itemId, values.itemName, values.itemStartingBid);
    setValues({...values, modal: !values.modal})
  }

  return (
    <div className="btn-update">
      <Button color="link" onClick={toggle} id={'Tooltip-update-'+ props.item.id}><FiEdit/></Button>
      <Tooltip placement='bottom' isOpen={values.tooltipOpen} target={'Tooltip-update-' + props.item.id} toggle={toggleTooltip}>
        Update Item
      </Tooltip>
      <Modal isOpen={values.modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Update Item</ModalHeader>
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
            title={'Update Item'}
            message={'Are you sure you want to update this Item?'}
            confirmation={'Yes'}
            cancel={'No'}
          />{' '}
          <div className="col-lg-6">
            <Button className="modal-margin" color="secondary" onClick={toggle }>Cancel</Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default UpdateItem;