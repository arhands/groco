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
// 
function FindOptimalRoute(shopping_items, max_stores, max_distance, item_cost_weight, distance_weight, starting_address)
{
  // We will be using a hidden state shape model where stores are the ordered data and items are the unordered data.
  // later on, we will want to use a heuristic to improve the space/time complexity of this algorithm.
  
  stores = GetStores(max_distance);
  // [item][store]
  dp = new Array(shopping_items.length)
  // computing initial costs and adding second dimension of array.
  for(let i = 0; i < shopping_items.length; i++)
  {
    dp[i] = new Array(stores.length)
    item = GetItemFromStore(stores[i].Store_id,shopping_items[0])
    if(item == null)
      dp[i][0] = null
    dp[i][0] = { Cost: distance_weight * stores[i].Distance + item_cost_weight * item.Cost, TotalDistance: stores[i].Distance, Item: item, Stores: new Set([stores[i].Store_id]) }
  }
  // Computing intermediate to final costs.
  for(let k = 1; k < shopping_items.length; j++)
  {
    for(let i = 0; i < stores.length; i++)
    {
      // we transition from store j to store i.
      // First, we compute the initial cost to get item k from store i.
      item = GetItemFromStore(stores[i].Store_id,shopping_items[0])
      if(item == null)
      {
        dp[k][i] = null;
        break;
      }
      baseCost = item.Cost * item_cost_weight
      // finding optimal transition
      optimalCost = Infinity
      optimalPast = -1
      for(let j = 0; j < stores.length; j++)
        if(dp[k-1][j] != null)
        {
          // checking against constraints
          if(dp[k-1][j].length == max_stores && !dp[k-1][j].has(stores[j].store_id))
            continue;
          if(dp[k-1][j].has(stores[j].store_id))
            addedDistance = 0
          else
            addedDistance = Math.min(...dp[k-1][j].Stores.map(store_id => GetDistance(store_id,stores[i])))
          
          distance = dp[k-1][j].TotalDistance + addedDistance 
          if(distance > max_distance)
            continue;
          cost = baseCost + addedDistance * distance_weight
          if(cost < optimalCost)
          {
            optimalCost = cost
            optimalPast = j
          }
        }
      if(optimalPast == -1)
        dp[k][i] = null
      else
      {
        visitedStores = new Set(dp.Stores)
        visitedStores.add(Stores[optimalPast])
        dp[k][i] = { Cost: optimalCost, TotalDistance: distance, Last: optimalPast, Stores: visitedStores }
      }
    }
  }
}