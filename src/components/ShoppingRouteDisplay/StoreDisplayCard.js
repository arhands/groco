import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
//import './ViewRecipe.css'
import DataTable from 'react-data-table-component';
import { ButtonGroup, Dropdown, DropdownButton, Card } from "react-bootstrap";
class StoreDisplayCard extends React.Component
{
  // Placeholder function(s)
  //
  SelectedRows = []
  MinimumIngredientID = 0
  constructor(props)
  {
    super(props)
    this.StoreItems = props.StoreItems
    this.StoreName = props.StoreName
    //this.state = { Placeholder : true }
    this.HandleAddIngredient = this.HandleAddIngredient.bind(this)
    this.HandleDeleteSelection = this.HandleDeleteSelection.bind(this)
    this.GetData = this.GetData.bind(this)
  }
  render()
  {
    let columns = [
      { name: (<Form.Label>Item</Form.Label>),         selector: row => row.name },
      { name: (<Form.Label>Amount</Form.Label>),       selector: row => row.quantity + " " + row.measurement_type},
    ];
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            {this.props.StoreName} Items
          </Card.Title>
          <Card.Text>
            <DataTable columns={columns} data={this.StoreItems} selectableRows onSelectedRowsChange={sel => this.SelectedRows = sel.selectedRows}/>
          </Card.Text>
        </Card.Body>       
      </Card>
    );
  }
}
export default StoreDisplayCard