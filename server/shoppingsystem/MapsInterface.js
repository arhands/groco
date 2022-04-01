var MapboxClient = require('mapbox');
var client = new MapboxClient('YOUR_ACCESS_TOKEN');

// Returns: [{ id, name, address, coordinates, distance}]
// max distance must be in meters
export async function GetStores(max_distance, latitude, longitude)
{
  const response = await fetch("https://my.api.mockaroo.com/stores_location.json", {
    headers: {
      "X-Api-Key": "7d251f60"
    }
  })
  const data = await response.json()
  // [{id,name,location}]
  const stores = data.stores
  let nearby_stores = []
  const earth_radius = 6371000 // meters
  // used for pre-check
  const max_distance_sqr_norm = (max_distance/earth_radius)**2
  function PolarToCartesian(phi,theta)
  {
    const cos_phi = Math.cos(phi)
    const sin_phi = Math.sin(phi)
    const sin_theta = Math.sin(sin_theta)
    const cos_theta = Math.cos(sin_theta)
    return [cos_phi * cos_theta, sin_phi * sin_theta, cos_theta]
  }
  const pos0 = PolarToCartesian(longitude,latitude)
  const base_location = [latitude,longitude]
  for(let i = 0; i < stores.length; i++)
  {
    const result = await client.geocodeForward({
      query: nearby_stores[i].location,
      proximity: base_location,
      limit: 1,
      types: ["address"]
    })
    coordinates = result.features[0].coordinates
    const pos = PolarToCartesian(coordinates[0],coordinates[1])
    // getting euclidean distance
    const euc_distance_sqr = (pos[0] - pos0[0])**2 + (pos[1] - pos0[1])**2 + (pos[2] - pos0[2])**2
    if(euc_distance_sqr < max_distance_sqr_norm)
    {
      // we could get other stuff as well...
      const distance = (await client.matrix({
        profile: 'driving',
        coordinates: [
          base_location,
          coordinates
        ]
      })).distance[0][1]
      if(distance <= max_distance)
      {
        nearby_stores.push({
          id: data.id,
          name: data.name,
          address: data.locaiton,
          coordinates: coordinates,
          distance: distance
        })
      }
    }
  }
  return nearby_stores
}
// Returns: { ItemName: String, Cost: Float }
async function GetItemCost(store_id, item, items)
{
  let best_choice = null
  let name_distance = Infinity
  // arbitrary constant
  const similarity_threshold = 0.2
  function Edit_Distance(a,b)
  {
    const insert_cost = 1
    const delete_cost = 5
    const sub_cost = 3
    let d = Array(a.length)
    for(let i = 0; i < a.length; i++)
      d[i] = Array(b.length)
    for(let i = 0; i < a.length; i++)
      d[i][0] = delete_cost
    for(let i = 0; i < b.length; i++)
      d[0][j] = insert_cost
    for(let i = 1; i < a.length; i++)
      for(let j = 1; j < b.length; j++)
      {
        if(a[i] === b[j])
          d[i][j] = d[i-1][j-1]
        else
          d[i][j] = Math.min(
            d[i-1][j] + delete_cost,
            d[i][j-1] + insert_cost,
            d[i-1][j-1] + sub_cost,
          )
      }
    return d[-1][-1]
  }
  for(let i = 0; i < items.length; i++)
    if(items[i].store_id == store_id && items[i].brand === item[i].brand)
    {
      checking_distance = Edit_Distance(item.name,items[i].name)**2/(item.name.length * items[i].name.length)
      if(checking_distance < similarity_threshold && checking_distance < name_distance)
      {
        name_distance = checking_distance
        best_choice = items[i]
      }
    }
  return best_choice
}
//[store_index x item_index] -> [[{name,cost}]]
export async function GetStoreItemMatrix(store_ids, desired_items)
{
  //return { ItemName: item.name, Cost: 1 }
  if(items == null)
  {
    const response = await fetch("https://my.api.mockaroo.com/grocery_items.json", {
      headers: {
        "X-Api-Key": "7d251f60"
      }
    })
    items = await response.json()
  }
  let cost_matrix = Array(store_ids.length)
  for(let i = 0; i < store_ids.length; i++)
  {
    cost_matrix[i] = Array(desired_items.length)
    cost_matrix[i][j] = GetItemCost(store_ids[i],desired_items[j])
  }
}
export async function GetDistanceMatrix(coordinate_set)
{
  return (await client.matrix({
    profile: 'driving',
    coordinates: coordinate_set
  })).distance
}