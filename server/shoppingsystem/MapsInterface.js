const axios = require('axios')
async function GetDistance(coordsA, coordsB)
{
  const result = await axios.get(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coordsA[0]},${coordsA[1]};${coordsB[0]},${coordsB[1]}`,{
    params: 
    {
      access_token: "pk.eyJ1IjoiYW5kcmV3aGFuZHMiLCJhIjoiY2wxZTU4dng2MG80MjNkbjRuMG02cjdsbyJ9.sMh4xQ7h4jtvFEmuh0ToOQ",
      annotations: "distance",
      sources: 0
    }
  })  
  return result.data.distances[0][1]
}
// Returns: [{ id, name, address, coordinates, distance}]
// max distance must be in meters
async function GetStores(max_distance, latitude, longitude)
{
  let nearby_stores = []
  const earth_radius = 6371000 // meters
  // used for pre-check
  const max_distance_sqr_norm = (max_distance/earth_radius)**2
  function PolarToCartesian(phi,theta)
  {
    phi *= Math.PI/180
    theta *= Math.PI/180
    const cos_phi = Math.cos(phi)
    const sin_phi = Math.sin(phi)
    const sin_theta = Math.sin(theta)
    const cos_theta = Math.cos(theta)
    return [cos_phi * cos_theta, sin_phi * sin_theta, cos_theta]
  }
  const pos0 = PolarToCartesian(longitude,latitude)
  const base_location = [longitude,latitude]
  const result = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/grocery.json",{
    params: 
    {
      access_token: "pk.eyJ1IjoiYW5kcmV3aGFuZHMiLCJhIjoiY2wxZTU4dng2MG80MjNkbjRuMG02cjdsbyJ9.sMh4xQ7h4jtvFEmuh0ToOQ",
      //limit: 1,
      types: ["poi"]
    },
    paramsSerializer: params => {
      let elements = []
      Object.keys(params).forEach(key => 
        elements.push(`${key}=${params[key]}`))
      elements.push(`proximity=${longitude},${latitude}`)
      return elements.join("&")
    }
  })
  const stores = result.data.features
  for(let i = 0; i < stores.length; i++)
  {
    let store = {
      id: i,// placeholder
      name: stores[i].text, 
      address: stores[i].properties.address, 
      coordinates: stores[i].geometry.coordinates
    }
    const pos = PolarToCartesian(store.coordinates[0],store.coordinates[1])
    // getting euclidean distance
    const euc_distance_sqr = (pos[0] - pos0[0])**2 + (pos[1] - pos0[1])**2 + (pos[2] - pos0[2])**2
    if(euc_distance_sqr < max_distance_sqr_norm)
    {
      // we could get other stuff as well...
      const distance = await GetDistance(base_location,store.coordinates)
      if(distance <= max_distance)
      {
        store.distance = distance
        nearby_stores.push(store)
      }
    }
  }
  return nearby_stores
}
async function GetItemCost_v2(store, item)
{
  // configuration
  const has_item_probability = 0.9
  const price_min = 4
  const price_max = 100
  if(Math.random() <= has_item_probability)
  {
    return {
      name: item.name,
      cost: Math.random() * (price_max - price_min) + price_min,
      brand: item.brand,
    }
  }
  else
    return null
}
//[store_index x item_index] -> [[{name,cost}]]
async function GetStoreItemMatrix(stores, desired_items)
{
  const response = await axios({
    url: "https://my.api.mockaroo.com/grocery_items.json",
    method: 'GET',
    headers: {
      "X-Api-Key": "7d251f60"
    }
  })
  let rows = response.data.split('\n')
  // need to format items
  let items = Array(rows.length - 1)
  for(let i = 1; i < rows.length; i++)
  {
    const row = rows[i].split(',')
    items[i - 1] = {
      id: parseInt(row[0]),
      name: row[1],
      cost: parseFloat(row[2]?.substring(1)),
      quantity: parseFloat(row[3]),
      unit: row[5],
      store_id: parseInt(row[6])
    }
    if(!Object.keys(items[i - 1]).every(key => items[i - 1][key] != null))
    {
      items.pop()
      rows.pop()
      i--
    }
  }
  let cost_matrix = Array(stores.length)
  for(let i = 0; i < stores.length; i++)
  {
    cost_matrix[i] = Array(desired_items.length)
    for(let j = 0; j < desired_items.length; j++)
      cost_matrix[i][j] = await GetItemCost_v2(stores[i].id,desired_items[j], items)
  }
  return cost_matrix
}
async function GetDistanceMatrix(coordinate_set)
{
  coords = Array(coordinate_set.length)
  for(let i = 0; i < coordinate_set.length; i++)
    coords[i] = `${coordinate_set[i][0]},${coordinate_set[i][1]}`
  const result = await axios.get(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coords.join(';')}`,{
    params: 
    {
      access_token: "pk.eyJ1IjoiYW5kcmV3aGFuZHMiLCJhIjoiY2wxZTU4dng2MG80MjNkbjRuMG02cjdsbyJ9.sMh4xQ7h4jtvFEmuh0ToOQ",
      annotations: "distance",
    }
  })
  return result.data.distances
}
module.exports = {
  GetDistanceMatrix: GetDistanceMatrix,
  GetStoreItemMatrix: GetStoreItemMatrix,
  GetStores: GetStores,
};