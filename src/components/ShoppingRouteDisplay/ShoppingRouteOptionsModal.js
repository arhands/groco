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
    this.handleClose = props.HideMenu
  }
  render()
  {
    let maxDistance = 20;
    let maxStores = 5;
    let itemCostWeight = 50;
    let distanceWeight = 50;
    return (
      <Modal animation={false} show={this.props.Show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shop Wizard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Maximum Distance (miles)</Form.Label>
              <br></br>
              <NumericInput min={0} max={1000} value={maxDistance} format={num => num + ' miles'} onChange={val => maxDistance = val}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Maximum Stores</Form.Label>
              <br></br>
              <NumericInput min={0} max={100} value={maxStores} onChange={val => maxStores = val}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Item Cost Weight</Form.Label>
              <br></br>
              <NumericInput min={0} max={100} value={itemCostWeight} onChange={val => itemCostWeight = val}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Travel Distance Weight</Form.Label>
              <br></br>
              <NumericInput min={0} max={100} value={distanceWeight} onChange={val => distanceWeight = val}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          
          <Link
            to={{
              pathname: "/shoppingroute",
              data: {
                maxStores: maxStores,
                maxDistance: maxDistance,
                itemCostWeight: itemCostWeight,
                distanceWeight: distanceWeight
              }
            }}
          >
            <Button variant="primary" onClick={() => console.log("maxDistance:",maxDistance)}>
              Route
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    );
  }
  HandleRoute()
  {

  }
}
export default ShoppingRouteOptionsModal