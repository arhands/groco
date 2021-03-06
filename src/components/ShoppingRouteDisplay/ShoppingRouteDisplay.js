import React, { useState } from "react";
import Form from "react-bootstrap/Form";
//import './ViewRecipe.css'
import './StoreDisplayCard.js'
import DataTable from 'react-data-table-component';
import StoreDisplayCard from "./StoreDisplayCard.js";
import Badge from 'react-bootstrap/Badge';
import { useLocation } from 'react-router-dom';
import { findDOMNode } from "react-dom";

function ShoppingRouteDisplay() {
  console.log("Shopping route display")
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
  const [shoppingPlan, setShoppingPlan] = useState(null);
  const [searching, setSearching] = useState(true);
  //
  function HandleRowExpansion(row) {
    return <StoreDisplayCard StoreItems={row.data.StoreItems}></StoreDisplayCard>
  }
  //
  // TODO: replace the following hardcoded ID with the actual user_id
  const api = process.env.REACT_APP_BACKEND_API + "/shoppinglistroute";
  if (shoppingPlan == null) {
    (async () => {
      if(!searching)
        return
      setSearching(false)
      try {
        const { latitude, longitude } = (await new Promise(f => navigator.geolocation.getCurrentPosition(f))).coords;
        const googleid = localStorage.getItem('googleId')
        const response = await fetch(api, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            googleid: googleid,
            maxStores: maxStores,
            maxDistance: maxDistance,
            itemCostWeight: itemCostWeight,
            itemDistanceWeight: distanceWeight,
            latitude: latitude,
            longitude: longitude
          })
        });
        const jsonData = await response.json()
        if(jsonData == null)
          setShoppingPlan(false)
        else
          setShoppingPlan(jsonData)

      } catch (err) {
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
      <br></br>
      { shoppingPlan === false? <Form.Label>Unable to find route.  Consider widening your search.</Form.Label> :
      <DataTable
        columns={columns}
        data={shoppingPlan == null ? [] : shoppingPlan}
        selectableRows onSelectedRowsChange={sel => selectedRows = sel.selectedRows}
        expandableRows expandableRowsComponent={HandleRowExpansion}
        progressPending={shoppingPlan == null}
      />
      }
    </div>
  );
}
export default ShoppingRouteDisplay