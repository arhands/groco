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
import Badge from 'react-bootstrap/Badge';
class ShoppingRouteDisplay extends React.Component
{
  SelectedRows = []
  MinimumIngredientID = 0
  constructor(props)
  {
    super(props)
    /*
    ShoppingPlan format:
    [
      {
        StoreName: String,
        StoreAddress: String,
        StoreItems:
        [
          {
            name: String,
            cost: Float,
            quantity: Float,
            measurement_type: String
          },...
        ]
      },...
    ]
    */
    this.ShoppingPlan = props.ShoppingPlan
  }
  render()
  {
    let columns = [
      { name: (<Form.Label>Store Name</Form.Label>), selector: row => row.StoreName },
      { name: (<Form.Label>Address</Form.Label>), selector: row => row.StoreAddress },
      { name: (<Form.Label>Items Remaining</Form.Label>), selector: row => <Badge variant="primary" pill>row.StoreItems.length</Badge> },
    ];
    return (
      <div>
        <label>
          Shopping List
        </label>
        <DataTable columns={columns} data={this.ShoppingPlan} 
          selectableRows onSelectedRowsChange={sel => this.SelectedRows = sel.selectedRows}
          expandableRows expandableRowsComponent={this.HandleRowExpansion}
        />
      </div>
    );
  }
  HandleRowExpansion(data)
  {
    console.log(data)
    return <StoreDisplayCard StoreName={data.StoreName} StoreItems={data.StoreItems}></StoreDisplayCard>
  }
}
export default ShoppingRouteDisplay