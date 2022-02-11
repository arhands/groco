import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './ViewRecipe.css'
import DataTable from 'react-data-table-component';
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
class IngredientTable extends React.Component
{
  // Placeholder function(s)
  //
  SelectedRows = []
  MinimumIngredientID = 0
  constructor(props)
  {
    super(props)
    this.Ingredients = props.Ingredients
    this.state = { Placeholder : true }
    this.HandleAddIngredient = this.HandleAddIngredient.bind(this)
    this.HandleDeleteSelection = this.HandleDeleteSelection.bind(this)
    this.GetData = this.GetData.bind(this)
  }
  render()
  {
    let columns = [
      { name: (<Form.Label>Item</Form.Label>),         selector: row => row.name },
      { name: (<Form.Label>Amount</Form.Label>),       selector: row => row.quantity },
      { name: (<Form.Label>Measurement</Form.Label>),  selector: row => row.measurement_type },
    ];
    return (
      <div>
      <label id="ingredients">
        Ingredients: {this.props.EditMode? (
        <ButtonGroup>
            <Button variant="Secondary" onClick={this.HandleAddIngredient}>
                Add Ingredient
            </Button>
            <Button variant="Secondary" onClick={this.HandleDeleteSelection}>
                Delete Selection
            </Button>
        </ButtonGroup>
        ) : null}

      </label>
      <DataTable columns={columns} data={this.GetData()} selectableRows onSelectedRowsChange={sel => this.SelectedRows = sel.selectedRows}/>
      </div>
    );
  }
  HandleAddIngredient()
  {
    this.Ingredients.push({
        name: "", quantity: 0, measurement_type: "N/A"
    })
    this.setState({ Placeholder : true })
  }
  HandleDeleteSelection()
  {
    let selectedIDs = new Set()
    this.SelectedRows.forEach((val, index) => selectedIDs.add(val.id))
    for(let i = 0; i < this.Ingredients.length; i++)
      if(selectedIDs.has(this.Ingredients[i].id))
        this.Ingredients.splice(i--,1)
    this.setState({ Placeholder : true })
  }
  GetData()
  {
    let data = []
    let ingredients = this.Ingredients
    for(let i = 0; i < ingredients.length; i++)
      data.push({
        name: (<input type="text" defaultValue={ingredients[i].name} onChange={e => ingredients[i].name=e.target.value} disabled={!this.props.EditMode}/>),
        quantity: (<input type="number" defaultValue={ingredients[i].quantity} onChange={e => ingredients[i].quantity=e.target.value} disabled={!this.props.EditMode}/>),
        measurement_type: (<input type="text" defaultValue={ingredients[i].measurement_type} onChange={e => ingredients[i].measurement_type=e.target.value} disabled={!this.props.EditMode}/>),
        id: ingredients[i].id == null? ingredients[i].id = this.MinimumIngredientID++ : ingredients[i].id
      });
    return data
  }
}
export default IngredientTable