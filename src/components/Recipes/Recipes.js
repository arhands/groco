import React, { useState, createContext, memo } from "react";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './Recipes.css';
import DataTable from 'react-data-table-component';
import { FaPlusCircle } from 'react-icons/fa';
class Recipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = { filteredText: '', pagination: false, recipes: [], loading: true }
  }
  render() {
    const columns = [
      { name: 'Name', selector: row => row.name, sortable: true },
      { name: 'Author', selector: row => row.creator, sortable: true },
      { name: 'Details', selector: row => row.details },
      // create a new recipe
      {
        name:
          <div>
            <Link to={{ pathname: "/recipedetails", data: { id: -1, RecipeName: '' } }} >
              <Button size="sm">
                <FaPlusCircle />
              </Button>
            </Link>
          </div>, selector: row => row.add
      },
    ];
    // raw data collected from server
    const api = process.env.REACT_APP_BACKEND_API + "/recipes/";
    if (this.state.loading) {
      console.log("attempting load");
      (async () => {
        try {
          console.log("requesting data")
          const response = await fetch(api)
          console.log("response received")
          let jsonData = await response.json()
          this.setState({
            filteredText: this.state.filteredText,
            pagination: this.state.pagination,
            recipes: jsonData,
            loading: false
          });
          console.log("recipes loaded")
        } catch (err) {
          console.error(err);
        }
      })();
    }
    //
    function AddRecipe(data) {
      // TODO: Get this working my guy.
    }
    // converting data into something usable.
    const data = []
    for (let i = 0; i < this.state.recipes.length; i++) {
      data.push({
        id: i,
        creator: this.state.recipes[i].creator,
        name: this.state.recipes[i].name,
        details: (
          <Link
            to={{
              pathname: "/recipedetails",
              data: { id: this.state.recipes[i].id, RecipeName: this.state.recipes[i].name }
            }}
          >
            <Button>
              Details
            </Button>
          </Link>
        ),
        add: (
          <Button onClick={() => AddRecipe(this.state.recipes[i])}>
            Add
          </Button>
        )
      });
    }
    // setting up filter
    const setFilterText = text =>
      this.setState({ filteredText: text, pagination: this.state.pagination });
    const filteredItems = data.filter(item => item.creator.toLowerCase().includes(this.state.filteredText.toLowerCase()) || item.name.toLowerCase().includes(this.state.filteredText.toLowerCase()))
    return (
      <div className="Recipes" id="-1">
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={this.state.pagination}
          subHeader
          subHeaderComponent={<input type="text" className="mb-3" onChange={e => setFilterText(e.target.value)} />}
          selectableRows
          persistTableHead
          progressPending={this.state.loading} />
      </div>
    )
  }
}

export default Recipes