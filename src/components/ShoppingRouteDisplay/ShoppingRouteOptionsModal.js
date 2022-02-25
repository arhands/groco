import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
//import './ViewRecipe.css'
import './StoreDisplayCard.js'
import DataTable from 'react-data-table-component';
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import StoreDisplayCard from "./StoreDisplayCard.js";
import Modal from 'react-bootstrap/Modal';
import NumericInput from 'react-numeric-input';

class ShoppingRouteOptionsModal extends React.Component
{
  constructor(props)
  {
    super(props)
    this.MenuShown = props.Show
    this.handleClose = props.HideMenu
  }
  render()
  {
    return (
      <Modal show={this.MenuShown} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shop Wizard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group>
              <Form.Label>Maximum Distance (miles)</Form.Label>
              <NumericInput min={0} max={1000} value={20}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Maximum Stores</Form.Label>
              <NumericInput min={0} max={100} value={5}/>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
    return (
      <Modal show={this.MenuShown} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shop Wizard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Maximum Distance (miles)</Form.Label>
              <NumericInput min={0} max={1000} value={20}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Maximum Stores</Form.Label>
              <NumericInput min={0} max={100} value={5}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Item Cost Weight</Form.Label>
              <Form.Range />
            </Form.Group>
            <Form.Group>
              <Form.Label>Travel Distance Weight</Form.Label>
              <Form.Range />
            </Form.Group>
            <Form.Group>
              <Form.Label>Store Visit Weight</Form.Label>
              <Form.Range />
            </Form.Group>
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.HandleRoute}>
            Route
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  HandleRoute()
  {

  }
}
export default ShoppingRouteOptionsModal