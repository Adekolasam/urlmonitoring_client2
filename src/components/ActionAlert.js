import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

export const ActionAlert = (props) => {
    

    return(
        <Modal show={props.content.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.content.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.content.message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
