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
    this.UpdateIngredientsCallback = this.props.UpdateIngredientsCallback.bind(this)
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
            const ingredient_options = ingredients.map((b,i) => ({name: b.name, value: i, id: b.id}))
            const measurement_types = measurementtypes.map((b,i) => ({name: b.name, value: i, id: b.id}))
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
    let ingredients = this.props.Ingredients
    ingredients.push({
      name: "", quantity: 0, measurement_type: ""
    })
    //this.setState({ brand_options : this.state.brand_options, measurement_types: this.state.measurement_types, Placeholder : true })
    this.UpdateIngredientsCallback(ingredients)
  }
  HandleDeleteSelection()
  {
    let selectedIDs = new Set()
    this.SelectedRows.forEach((val, index) => selectedIDs.add(val.id))
    let ingredients = this.props.Ingredients
    for(let i = 0; i < this.Ingredients.length; i++)
      if(selectedIDs.has(this.Ingredients[i].id))
        ingredients.splice(i--,1)
    this.UpdateIngredientsCallback(ingredients)
    //this.setState({ brand_options : this.state.brand_options, measurement_types: this.state.measurement_types, Placeholder : true })
  }
  GetData()
  {
    let data = []
    let ingredients = this.props.Ingredients
    const updater = this.UpdateIngredientsCallback
    function updateIngredients(i,updated)
    {
      ingredients[i] = updated
      updater(ingredients)
    }
    for(let i = 0; i < ingredients.length; i++)
    {
      console.log("ingredient[",i,"].name =",ingredients[i].name)
      data.push({
        //name: (<input type="text" defaultValue={ingredients[i].name} onChange={e => ingredients[i].name=e.target.value} disabled={!this.props.EditMode}/>),
        name: <SelectSearch
          placeholder="Search for additional options"
          value={ingredients[i].v}
          onChange={v => {
            let i1 = ingredients[i]; 
            i1.v = v;
            let s = this.state.ingredient_options[v]; 
            i1.ingredient_id = s.id; 
            i1.name = s.name; 
            updateIngredients(i,i1) 
          }}
          options={this.state.ingredient_options}
          search
          filterOptions={(options) => {
              return q => options.filter(opt => opt.name.toUpperCase().includes(q.toUpperCase())).splice(0,10)
          }}
          disabled={!this.props.EditMode}/>,
        quantity: (<input type="number" defaultValue={ingredients[i].quantity} onChange={e => ingredients[i].quantity=e.target.value} disabled={!this.props.EditMode}/>),
        //measurement_type: (<input type="text" defaultValue={ingredients[i].measurement_type} onChange={e => ingredients[i].measurement_type=e.target.value} disabled={!this.props.EditMode}/>),
        measurement_type: <SelectSearch
          filterOptions={(options) => {
              return q => options.filter(opt => opt.name.toUpperCase().includes(q.toUpperCase()))
          }}
          placeholder="Search for additional options"
          value={ingredients[i].m}
          onChange={v => {
            let i1 = ingredients[i]; 
            i1.m = v;
            let s = this.state.ingredient_options[v]; 
            i1.measurement_id = s.id; 
            i1.name = s.name; 
            updateIngredients(i,i1) 
          }}
          options={this.state.measurement_types}
          search
          filterOptions={(options) => {
              return q => options.filter(opt => opt.name.toUpperCase().includes(q.toUpperCase())).splice(0,10)
          }}
          disabled={!this.props.EditMode}
        />,
        id: ingredients[i].id == null? ingredients[i].id = this.MinimumIngredientID++ : ingredients[i].id
      });
    }
    return data
  }
}
export default IngredientTable