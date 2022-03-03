import React, { useState } from "react";
import Form from "react-bootstrap/Form";
//import './ViewRecipe.css'
import './StoreDisplayCard.js'
import DataTable from 'react-data-table-component';
import StoreDisplayCard from "./StoreDisplayCard.js";
import Badge from 'react-bootstrap/Badge';
import { useLocation } from 'react-router-dom';
import { FindOptimalRoute } from './ShopSearchAlgorithm.js';
import { findDOMNode } from "react-dom";

function ShoppingRouteDisplay()
{
  let selectedRows = []
  //
  let location = useLocation()
  const { maxStores, maxDistance, itemCostWeight, distanceWeight } = location.data
  
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
  const [shoppingPlan, setShoppingPlan] = useState(null)
  //
  function HandleRowExpansion(row)
  {
    return <StoreDisplayCard StoreItems={row.data.StoreItems}></StoreDisplayCard>
  }
  //
  // TODO: replace the following hardcoded ID with the actual user_id
  let user_id = 1;
  const api = "http://localhost:3001/shoppinglist/";
  if(shoppingPlan == null)
  {
    (async () => {
      try{
          const response = await fetch(api + `get/${user_id}`)
          let jsonData = await response.json()
          jsonData = FindOptimalRoute(jsonData,maxStores,maxDistance,itemCostWeight,distanceWeight)
          setShoppingPlan(jsonData)
         
      }catch(err){
          console.error(err);
      }
    })();
  }
  let columns = [
    { name: (<Form.Label>Store Name</Form.Label>), selector: row => row.StoreName },
    { name: (<Form.Label>Address</Form.Label>), selector: row => row.StoreAddress },
    { name: (<Form.Label>Items Remaining</Form.Label>), selector: row => <Badge variant="primary" pill>{row.StoreItems.length}</Badge> },
  ];
  return (
    <div>
      <label>
        Shopping List
      </label>
      <DataTable 
        columns={columns} 
        data={shoppingPlan == null? [] : shoppingPlan}
        selectableRows onSelectedRowsChange={sel => selectedRows = sel.selectedRows}
        expandableRows expandableRowsComponent={HandleRowExpansion}
        progressPending={shoppingPlan == null}
      />
    </div>
  );
}
export default ShoppingRouteDisplay