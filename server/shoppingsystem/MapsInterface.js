//const MapboxClient = require('mapbox');
const MapboxClient = require('mapbox');
const client = new MapboxClient('pk.eyJ1IjoiYW5kcmV3aGFuZHMiLCJhIjoiY2wxZTU4dng2MG80MjNkbjRuMG02cjdsbyJ9.sMh4xQ7h4jtvFEmuh0ToOQ');
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
// Returns: { ItemName: String, Cost: Float }
async function GetItemCost(store_id, item, items)
{
  let best_choice = null
  let name_distance = Infinity
  // arbitrary constant
  const similarity_threshold = Infinity
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
      d[0][i] = insert_cost
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
    d = d[d.length-1]
    d = d[d.length-1]
    return d
  }
  for(let i = 0; i < items.length; i++)
    // TODO: add getting brand
    if(items[i].store_id == store_id && (items[i]?.brand === item[i]?.brand || item[i]?.brand == null || true))
    {
      const checking_distance = Edit_Distance(item.name,items[i].name)**2/(item.name.length * items[i].name.length)
      if(checking_distance < similarity_threshold && checking_distance < name_distance)
      {
        name_distance = checking_distance
        best_choice = items[i]
      }
    }
  return best_choice
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
  console.log("MapsInterface.js ",136)
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
      cost_matrix[i][j] = await GetItemCost(stores[i].id,desired_items[j], items)
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