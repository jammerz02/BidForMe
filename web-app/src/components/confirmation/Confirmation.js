import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const Confirmation = (props) => {
    const [values, setValues] = useState({
        modal: false,
        title: props.title,
        message: props.message,
        confirmation: props.confirmation,
        cancel: props.cancel
    });

    const toggle = () => {
        setValues({...values, modal: !values.modal})
    }

    const handleOnClick = (event) => {
        setValues({...values, modal: !values.modal})
        props.handleUpdateItem(true)
      }

    return (
        <div className="col-lg-6">
            <Button  color="primary" onClick={toggle}>
                {values.title}
            </Button>
            <Modal isOpen={values.modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}>{values.title}</ModalHeader>
                <ModalBody>
                    {values.message}
                </ModalBody>
                <ModalFooter >
                <Button id="confirm" className="modal-margin" color="primary" value='true' onClick={ handleOnClick }>{values.confirmation}</Button>{' '}
                <Button className="modal-margin" color="secondary" onClick={toggle }>{values.cancel}</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}