import {Edit3, Trash2, Eye} from 'react-feather';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Link } from "react-router-dom"

const SubContent = (props) => {
    let mask = "**********";
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        handleClose();
        props.deleteHandler();
    }

    return(
        <tr key={props.dataitem.id}>
            <td scope="row">
                {props.dataitem.variable}
            </td>
            <td scope="row">
                {props.dataitem.typeId == 2 ? mask : props.dataitem.value}
            </td>
            <td scope="row">
                {props.dataitem.typeName}
            </td>
            <td className='customdatafeather'>
                <Link to="#"  title="View" > 
                    <Eye />
                </Link>&nbsp;&nbsp;&nbsp;&nbsp;

                <Link to="/Environment/EnvOptions/Edit"  title="Edit" > 
                    <Edit3 />
                </Link> &nbsp;&nbsp;&nbsp;&nbsp;
                
                
                <Link to="#"  title="Delete" onClick={handleShow} > 
                    <Trash2 />
                </Link> &nbsp;&nbsp;

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <h5>Are you sure you want to delete this?</h5>
                        <p></p>
                        <dl className="row">
                            <dt className = "col-sm-3">
                                Name
                            </dt>
                            <dd className = "col-sm-9">
                                {props.dataitem.variable}
                            </dd>
                            <dt className = "col-sm-3">
                                Value
                            </dt>
                            <dd className = "col-sm-9">
                                {props.dataitem.typeId == 2 ? mask : props.dataitem.value} 
                            </dd>
                            <dt className = "col-sm-3">
                                Environment
                            </dt>
                            <dd className = "col-sm-9">
                                {props.dataitem.environmentName}
                            </dd>
                        </dl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <form method="post">
                            <input type="hidden" value={props.dataitem.id} name = "Id" />
                            <Button variant="danger" onClick={handleDelete}>
                                Delete
                            </Button>
                        </form>
                    </Modal.Footer>
                </Modal>
                
            </td>
        </tr>
    )
}


export default SubContent;