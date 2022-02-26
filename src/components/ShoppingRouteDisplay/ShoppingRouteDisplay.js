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
    // TODO: replace the following hardcoded ID with the actual user_id
    let user_id = 1;
    const api = "http://localhost:3001/shoppinglist/";
    this.state = { ShoppingPlan: null };
  }
  render()
  {
    if(this.state.ShoppingPlan == null)
    {
      (async () => {
        try{
            const response = await fetch(api + `get/${user_id}`)
            const jsonData = await response.json()
            this.setState({ ShoppingPlan: jsonData})
           
        }catch(err){
            console.error(err);
        }
      })();
    }
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
        <DataTable columns={columns} data={this.state.ShoppingPlan == null? [] : this.state.ShoppingPlan} 
          selectableRows onSelectedRowsChange={sel => this.SelectedRows = sel.selectedRows}
          expandableRows expandableRowsComponent={this.HandleRowExpansion}
          progressPending={this.state.ShoppingPlan.length == 0}
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