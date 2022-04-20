
/*
Idea: this can be implemented as a Hidden State Shape Model with stores as the sequence data, items as the nonsequenced data, and with the following constraints:
  - You will never revisit a store, as this would be inefficient, so the total number of outer iterations should be the number of items to be purchased
  - No item will be bought more than once.
  - Transitioning to the same store has a cost of zero from distance.
  implementation follows from: https://athitsos.utasites.cloud/publications/athitsos_eccv2006.pdf
*/
// Returns: [{ Store_id, Distance: int}]
const mapsInterface = require('./MapsInterface.js');

// shopping_items: [{
//          name: String,
//          quantity: Float,
//          measurement_type: String,
//          brand: String
//        },...]
async function FindOptimalRoute(shopping_items, max_stores, max_distance, item_cost_weight, distance_weight, latitude, longitude)
{
  console.log("Seeking optimal route.")
  let S = await mapsInterface.GetStores(max_distance, latitude, longitude);
  let F = shopping_items
  function GetArr(width,height)
  {
    let arr = new Array(width)
    for(let i = 0; i < width; i++)
      arr[i] = new Array(height);
    return arr
  }
  
  let Registrations = GetArr(S.length,F.length)
  let PreviousRegistrations = GetArr(S.length,F.length)
  //let A = GetArr(S.length,S.length)
  let A = null
  if(shopping_items.length > 1)
  {
    A = await mapsInterface.GetDistanceMatrix(S.map(store => store.coordinates))
  }
  let B = await mapsInterface.GetStoreItemMatrix(S,F)
  // Computing item cost (B)
  for(let i = 0; i < S.length; i++)
    for(let j = 0; j < F.length; j++)
      if( B[i][j] != null)
        B[i][j] = { 
          Name: B[i][j].name, 
          MonetaryCost: B[i][j].cost, 
          Cost: B[i][j].cost * item_cost_weight 
        }
  // computing initial registrations
  for(let i = 0; i < S.length; i++)
    for(let k = 0; k < F.length; k++)
    {
      let item = B[i][k]
      if(item == null)
        PreviousRegistrations[i][k] = null
      else
      {
        PreviousRegistrations[i][k] = { 
          States: new Set([i]), 
          Features: new Set([k]), 
          Cost: S[i].distance * distance_weight + item.Cost * item_cost_weight,
          TotalDistance: S[i].distance,
          Coordinates: [i,k]
        }
      }
    }
  // Computing intermediate and final registrations
  for(let j = 1; j < F.length; j++)
  {
    for(let i = 0; i < S.length; i++)
    {  
      for(let k = 0; k < F.length; k++)
      {
        let optimalCost = Infinity
        let optimalDistance = null
        let optimalChoice = null
        if(B[i][k] != null)
        {
          for(let k1 = 0; k1 < F.length; k1++)
            if(k1 != k)
            {
              for(let i1 = 0; i1 < S.length; i1++)
                if(PreviousRegistrations[i1][k1] != null)
                {
                  if(PreviousRegistrations[i1][k1].Features.has(k))
                    break;
                  if(i != i1 && (PreviousRegistrations[i1][k1].States.has(i) || PreviousRegistrations[i1][k1].States.length == max_stores))
                    continue;
                  let distance = PreviousRegistrations[i1][k1].TotalDistance + A[i][i1]
                  if(distance > max_distance)
                    continue;
                  let cost = PreviousRegistrations[i1][k1].Cost + A[i][i1] * distance_weight + B[i][k].Cost
                  if(cost < optimalCost)
                  {
                    optimalCost = cost
                    optimalDistance = distance
                    optimalChoice = PreviousRegistrations[i1][k1]
                  }
                }
            }
        }
        if(optimalChoice == null)
          Registrations[i][k] = null
        else
        {
          let features = new Set(optimalChoice.Features)
          let states = new Set(optimalChoice.States)
          features.add(k)
          states.add(i)
          Registrations[i][k] = {
            Cost: optimalCost,
            Previous: optimalChoice,
            TotalDistance: optimalDistance,
            States: states,
            Features: features,
            Coordinates: [i,k]
          };
        }
      }
    }
    let tmp = Registrations
    Registrations = PreviousRegistrations
    PreviousRegistrations = tmp
  }
  // Now, we search the final registrations to find the best registration
  let optimalRegistration = null
  let optimalCost = Infinity
  for(let i = 0; i < S.length; i++)
    for(let k = 0; k < F.length; k++)
      if(PreviousRegistrations[i][k] != null && PreviousRegistrations[i][k].Cost < optimalCost)
      {
        optimalRegistration = PreviousRegistrations[i][k]
        optimalCost = optimalRegistration.Cost
      }
  if(optimalCost == Infinity)
    return null
  // Now we perform backtracking to get the route.
  // We will follow the ShoppingPlan format:
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
          cost: Float
          quantity: Float,
          measurement_type: String
        },...
      ]
    },...
  ]
  */
  let shoppingPlan = []
  let previousStore = null
  while(optimalRegistration != null)
  {
    
    if(previousStore != optimalRegistration.Coordinates[0])
    {
      previousStore = optimalRegistration.Coordinates[0]
      shoppingPlan.push({
        StoreName: S[previousStore].name,
        StoreAddress: S[previousStore].address,
        StoreItems: [],
      })
    }
    let Bik = B[optimalRegistration.Coordinates[0]][optimalRegistration.Coordinates[1]];
    let storeItem = {
      name: Bik.Name,
      cost: Bik.MonetaryCost,
      quantity: F[optimalRegistration.Coordinates[1]].quantity,
      measurement_type: F[optimalRegistration.Coordinates[1]].measurement_type
    };
    shoppingPlan[shoppingPlan.length - 1].StoreItems.push(storeItem)
    optimalRegistration = optimalRegistration.Previous
  }
  return shoppingPlan.reverse()
}
module.exports = {
  FindOptimalRoute: FindOptimalRoute,
};