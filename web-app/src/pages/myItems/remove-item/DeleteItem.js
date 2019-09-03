import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip } from 'reactstrap';
import { FaTrash } from "react-icons/fa";

export const DeleteItem = (props) => {
    const [values, setValues] = useState({
        modal: false,
        id: props.item.id.toNumber(),
        tooltipOpen: false
    });

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

    const handleOnClick = (event) => {
        setValues({...values, modal: !values.modal})
        props.handleDeleteItem(values.id)
      }

    return (
        <div className="btn-delete">
            <Button  color="link" onClick={toggle} id={'Tooltip-delete-'+ props.item.id}><FaTrash/></Button>
            <Tooltip placement='bottom' isOpen={values.tooltipOpen} target={'Tooltip-delete-' + props.item.id} toggle={toggleTooltip}>
                Delete Item
            </Tooltip>
            <Modal isOpen={values.modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}>Delete Item</ModalHeader>
                <ModalBody>
                    Are you sure?
                </ModalBody>
                <ModalFooter >
                <Button className="modal-margin" color="primary" value='true' onClick={ handleOnClick }>Yes</Button>{' '}
                <Button className="modal-margin" color="secondary" onClick={toggle }>No</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}