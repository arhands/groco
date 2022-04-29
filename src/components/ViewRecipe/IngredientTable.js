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
    this.state = { ingredient_options : [], measurement_types: [], Placeholder: true }
    this.HandleAddIngredient = this.HandleAddIngredient.bind(this)
    this.HandleDeleteSelection = this.HandleDeleteSelection.bind(this)
    this.GetData = this.GetData.bind(this)
    this.UpdateIngredientsCallback = this.props.UpdateIngredientsCallback.bind(this)
  }
  render()
  {
    if(this.state.ingredient_options.length == 0 && this.props.EditMode)
    {
      const api = process.env.REACT_APP_BACKEND_API + "/recipes/";
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
    this.setState(this.state)
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
    this.setState(this.state)
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
      for(let j = 0; j < this.state.ingredient_options.length; j++)
        if(this.state.ingredient_options[j].id == ingredients[i].ingredient_id)
        {
          ingredients[i].v = this.state.ingredient_options[j].value
          break
        }
      ingredients[i].just_searched = false
      data.push({
        //name: (<input type="text" defaultValue={ingredients[i].name} onChange={e => ingredients[i].name=e.target.value} disabled={!this.props.EditMode}/>),
        name: this.props.EditMode? (<SelectSearch
          placeholder="Search for additional options"
          value={ingredients[i].v}
          onChange={v => {
            let i1 = ingredients[i]; 
            i1.v = v;
            let s = this.state.ingredient_options[v]; 
            i1.ingredient_id = s.id; 
            i1.name = s.name; 
            ingredients[i].just_searched = true
            updateIngredients(i,i1) 
          }}
          options={this.state.ingredient_options}
          search
          filterOptions={(options) => {
              return q => {
                if(ingredients[i].just_searched)
                {
                  ingredients[i].just_searched = false
                  q = ingredients[i].search_text
                }
                ingredients[i].search_text = q
                let f = options.filter(opt => opt.name.toUpperCase().includes(q.toUpperCase())).splice(0,10)
                if(ingredients[i].v != null && f.every(s => s.value != ingredients[i].v))
                  f.push(options[ingredients[i].v])
                return f
              }
          }}/>) : (<p>{ingredients[i].name}</p>),
        quantity: (<input type="number" defaultValue={ingredients[i].quantity} onChange={e => ingredients[i].quantity=e.target.value} disabled={!this.props.EditMode}/>),
        //measurement_type: (<input type="text" defaultValue={ingredients[i].measurement_type} onChange={e => ingredients[i].measurement_type=e.target.value} disabled={!this.props.EditMode}/>),
        measurement_type: this.props.EditMode? (<SelectSearch
          placeholder="Search for additional options"
          value={ingredients[i].m}
          onChange={v => {
            let i1 = ingredients[i]; 
            i1.m = v;
            let s = this.state.ingredient_options[v]; 
            i1.measurement_id = s.id; 
            i1.name = s.name; 
            ingredients[i].just_searched = true
            updateIngredients(i,i1) 
          }}
          options={this.state.measurement_types}
          search
          filterOptions={(options) => {
              return q => {
                let f = options.filter(opt => opt.name.toUpperCase().includes(q.toUpperCase())).splice(0,10)
                if(ingredients[i].just_searched)
                {
                  ingredients[i].just_searched = false
                  q = ingredients[i].search_text_m
                }
                ingredients[i].search_text_m = q
                return f
              }
          }}
        />) : (<p>{ingredients[i].measurement_type}</p>),
        key: i
      });
    }
    return data
  }
}
export default IngredientTable