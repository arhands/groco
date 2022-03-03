import React, { useState, createContext, memo } from "react";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './Recipes.css';
import DataTable from 'react-data-table-component';
import { FaPlusCircle } from 'react-icons/fa';
class Recipes extends React.Component
{
  constructor(props)
  {
      super(props)
      this.state = { filteredText: '', pagination: false }
  }
  render() {
    const columns = [
      {name: 'Name', selector: row => row.name, sortable: true},
      {name: 'Author', selector: row => row.creator, sortable: true},
      {name: 'Details', selector: row => row.details},
      {name: 
        <div>
          <Link to={{ pathname: "/recipedetails", data: {id: -1, RecipeName: ''}}} >
            <Button size="sm">
              <FaPlusCircle/>
            </Button>          
          </Link>
        </div>, selector: row => row.add},
    ];
    // raw data collected from server
    const RawData = [
      { creator: "Kyle",      name: "Water Soup",      id: 337},
      { creator: "Steve",     name: "Pickle Sandwich", id: 561},
      { creator: "Will",      name: "Egg on Bread",    id: 849},
      { creator: "Christine", name: "Rice",            id: 123}
    ];
    // converting data into something usable.
    const data = []
    for(let i = 0; i < RawData.length; i++)
    {
      data.push({
        id: i,
        creator: RawData[i].creator,
        name: RawData[i].name,
        details: (
          <Link
            to={{
              pathname: "/recipedetails",
              data: {id: RawData[i].id, RecipeName: RawData[i].name}
            }}
          >
            <Button>
              Details
            </Button>
          </Link>            
          ),
          add: (
            <Button onClick={() => {AddRecipe(RawData[i])}}>
              Add
            </Button>
          )
      });
    }
    // setting up filter
    const setFilterText = text =>
      this.setState({ filteredText: text, pagination: this.state.pagination});
    const filteredItems = data.filter(item => item.creator.toLowerCase().includes(this.state.filteredText.toLowerCase()) || item.name.toLowerCase().includes(this.state.filteredText.toLowerCase()))
    return (
      <div className="Recipes" id="-1">
        <DataTable 
          columns={columns} 
          data={filteredItems} 
          pagination 
          paginationResetDefaultPage={this.state.pagination} 
          subHeader 
          subHeaderComponent={<input type="text" className="mb-3" onChange={e => setFilterText(e.target.value)}/>} 
          selectableRows 
          persistTableHead/>
      </div>
    )
  }
}

export default Recipes
