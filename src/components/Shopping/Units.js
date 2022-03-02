import React from "react";
import { Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';

class Units extends React.Component{
    constructor(props){
        super(props)
        this.handleClose = props.HideDisplay
    }
    render()
    {
        return(
            <Modal animation = {false} show={this.props.Display} onHide ={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>Unit Selection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Dropdown>
                        <Dropdown.Toggle varaint = "success" id = "dropdown-basic">
                            Select Units
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>ounces</Dropdown.Item>
                            <Dropdown.Item>grams</Dropdown.Item>
                            <Dropdown.Item>gallons</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose} >
                        Set Unit
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Units