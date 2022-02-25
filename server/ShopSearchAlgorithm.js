/*
Idea: this can be implemented as a Hidden State Shape Model with stores as the sequence data, items as the nonsequenced data, and with the following constraints:
  - You will never revisit a store, as this would be inefficient, so the total number of outer iterations should be the number of items to be purchased
  - No item will be bought more than once.
  - Transitioning to the same store has a cost of zero from distance.
  implementation follows from: https://athitsos.utasites.cloud/publications/athitsos_eccv2006.pdf
*/
// Returns: [{ Store_id, Distance: int}]
function GetStores(max_distance)
{
  
}
// Returns: [{ ItemName: String, Cost: Float }]
function GetItemFromStore(store_id, item)
{

}
function GetDistance(store1_id, store2_id)
{

}
// [Name, Address]
function GetStoreDetails(store_id)
{

}
// shopping_items: [{
//          name: String,
//          quantity: Float,
//          measurement_type: String
//        },...]
function FindOptimalRoute(shopping_items, max_stores, max_distance, item_cost_weight, distance_weight, starting_address)
{
  let S = GetStores(max_distance);
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
  let A = GetArr(S.length,S.length)
  let B = GetArr(S.length,F.length)
  // Computing transition distances & costs (A)
  // NOTE: we assume distance will be the same in both directions...
  for(let i = 0; i < S.length; i++)
  {
    A[i][i] = 0
    for(let j = 0; j < i; j++)
    {
      let distance = GetDistance(S[i].store_id,S[j].store_id)
      A[j][i] = A[i][j] = { Distance: distance, Cost: distance * distance_weight }
    }
  }
  // Computing item cost (B)
  for(let i = 0; i < S.length; i++)
    for(let j = 0; j < F.length; j++)
    {
      let item = GetItemFromStore(S[i].store_id,F[j])
      if( item != null)
        B[i][j] = { Name: item.ItemName, MonetaryCost: item.Cost, Cost: item.Cost * item_cost_weight }
    }
  // computing initial registrations
  for(let i = 0; i < S.length; i++)
  {
    for(let k = 0; k < F.length; k++)
    {
      let item = GetItemFromStore(S[i].store_id,F[i])
      if(item == null)
        PreviousRegistrations[i][k] = null
      else
        PreviousRegistrations[i][k] = { 
          States: new Set([i]), 
          Features: new Set([k]), 
          Cost: S[i].Distance * distance_weight + item.Cost * item_cost_weight,
          TotalDistance: S[i].Distance,
          Coordinates = [i,k]
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
                  let distance = PreviousRegistrations[i1][k1].TotalDistance + A[i][i1].Distance
                  if(distance > max_distance)
                    continue;
                  let cost = PreviousRegistrations[i1][k1].Cost + A[i][i1].Cost + B[i][k].Cost
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
            Coordinates = [i,k]
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
  for(let i = 0; i < States.length; i++)
    for(let k = 0; k < Features.length; k++)
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
  shoppingPlan = []
  previousStore = null
  while(optimalRegistration != null)
  {
    
    if(previousStore != optimalRegistration.Coordinates[0])
    {
      previousStore = optimalRegistration.Coordinates[0]
      let [storeName, address] = GetStoreDetails(States[previousStore].store_id)
      shoppingPlan.push({
        StoreName: storeName,
        StoreAddress: address,
        StoreItems: [],
      })
    }
    let Bik = B[optimalRegistration.Coordinates[0],optimalRegistration.Coordinates[1]];
    let storeItem = {
      name: Bik.Name,
      cost: Bik.MonetaryCost,
      quantity: F[optimalRegistration.Coordinates[1]].quantity,
      measurement_type: F[optimalRegistration.Coordinates[1]].measurement_type
    }
    shoppingPlan[shoppingPlan.length - 1].StoreItems.push(storeItem)
  }
  return shoppingPlan.reverse()
}