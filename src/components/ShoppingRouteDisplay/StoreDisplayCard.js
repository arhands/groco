import React from "react";
import Form from "react-bootstrap/Form";
//import './ViewRecipe.css'
import DataTable from 'react-data-table-component';
import { Card } from "react-bootstrap";
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
  }
  render()
  {
    let columns = [
      { name: (<Form.Label>Item</Form.Label>), selector: row => row.name },
      { name: (<Form.Label>Amount</Form.Label>), selector: row => row.quantity + " " + row.measurement_type},
    ];
    return (
      <DataTable columns={columns} data={this.StoreItems} selectableRows onSelectedRowsChange={sel => this.SelectedRows = sel.selectedRows}/>
    );
  }
}
export default StoreDisplayCard