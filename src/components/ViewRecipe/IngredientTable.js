import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './ViewRecipe.css'
import DataTable from 'react-data-table-component';
import { ButtonGroup } from "react-bootstrap";
import SelectSearch from 'react-select-search';
class IngredientTable extends React.Component
{
  // Placeholder function(s)
  //
  SelectedRows = []
  MinimumIngredientID = 0
  constructor(props)
  {
    super(props)
    this.state = { ingredient_options : null, measurement_types: null, Placeholder: true }
    this.HandleAddIngredient = this.HandleAddIngredient.bind(this)
    this.HandleDeleteSelection = this.HandleDeleteSelection.bind(this)
    this.GetData = this.GetData.bind(this)
  }
  render()
  {
    if(this.state.ingredient_options == null && this.props.EditMode)
    {
      console.log("uhhh")
      const api = "http://localhost:3001/recipes/";
      // /ingredientoptions
      (async () => {
        try {
            const response = await fetch(api + 'ingredientoptions/')
            const {ingredients , measurementtypes} = await response.json()
            const ingredient_options = ingredients.map(b => ({name: b.name, value: b.id}))
            const measurement_types = measurementtypes.map(b => ({name: b.name, value: b.id}))
            this.setState({ ingredient_options: ingredient_options, measurement_types: measurement_types, Placeholder: true})
        } catch (err) {
            console.error(err);
        }
      })();
    }
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
    this.props.Ingredients.push({
        name: "", quantity: 0, measurement_type: "N/A"
    })
    this.setState({ brand_options : this.state.brand_options, measurement_types: this.state.measurement_types, Placeholder : true })
  }
  HandleDeleteSelection()
  {
    let selectedIDs = new Set()
    this.SelectedRows.forEach((val, index) => selectedIDs.add(val.id))
    for(let i = 0; i < this.Ingredients.length; i++)
      if(selectedIDs.has(this.Ingredients[i].id))
        this.Ingredients.splice(i--,1)
    this.setState({ brand_options : this.state.brand_options, measurement_types: this.state.measurement_types, Placeholder : true })
  }
  GetData()
  {
    console.log("getting data")
    let data = []
    let ingredients = this.props.Ingredients
    for(let i = 0; i < ingredients.length; i++)
    {
      data.push({
        //name: (<input type="text" defaultValue={ingredients[i].name} onChange={e => ingredients[i].name=e.target.value} disabled={!this.props.EditMode}/>),
        name: <SelectSearch
          Placeholder={ingredients[i].name.length == 0? "Select Ingredient" : ingredients[i].name}
          onChange={v => ingredients[i].name_id=v.value}
          options={this.state.ingredient_options}
          search
          filterOptions={(options) => {
              return q => options.filter(opt => opt.name.toUpperCase().includes(q.toUpperCase()))
          }}
          disabled={!this.props.EditMode}/>,
        quantity: (<input type="number" defaultValue={ingredients[i].quantity} onChange={e => ingredients[i].quantity=e.target.value} disabled={!this.props.EditMode}/>),
        //measurement_type: (<input type="text" defaultValue={ingredients[i].measurement_type} onChange={e => ingredients[i].measurement_type=e.target.value} disabled={!this.props.EditMode}/>),
        measurement_type: <SelectSearch
        Placeholder={ingredients[i].name.length == 0? "Select Measurement" : ingredients[i].measurement_type}
        onChange={v => ingredients[i].measurement_type=v.value}
        options={this.state.measurement_types}
        search
        filterOptions={(options) => {
            return q => options.filter(opt => opt.name.toUpperCase().includes(q.toUpperCase()))
        }}
        disabled={!this.props.EditMode}/>,
        id: ingredients[i].id == null? ingredients[i].id = this.MinimumIngredientID++ : ingredients[i].id
      });
    }
    return data
  }
}
export default IngredientTable