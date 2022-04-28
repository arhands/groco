import React, { useState, createContext, memo } from "react";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './Recipes.css';
import DataTable from 'react-data-table-component';
import { FaPlusCircle } from 'react-icons/fa';
import { useSnackbar } from "notistack";
function Recipes() {
  const { enqueueSnackbar } = useSnackbar();
  const [filteredText, setFilteredText] = useState('');
  const [pagination, setPagination] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
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
  if (loading) {
    (async () => {
      try {
        const response = await fetch(api)
        let jsonData = await response.json()
        setRecipes(jsonData);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }
  //
  async function AddRecipe(data) {
    // TODO: Get this working my guy.
    const id = data.id
    const googleid = localStorage.getItem('googleId')
    try {
      const response = await fetch(api + `shoppinglist/${googleid}/${id}`)
      enqueueSnackbar('Ingredients added to shopping list!', { variant: 'success' });
    } catch (err) {
      console.error(err);
    }
  }
  // converting data into something usable.
  const data = []
  for (let i = 0; i < recipes.length; i++) {
    data.push({
      id: i,
      creator: recipes[i].creator,
      name: recipes[i].name,
      details: (
        <Link
          to={{
            pathname: "/recipedetails",
            data: { id: recipes[i].id, RecipeName: recipes[i].name }
          }}
        >
          <Button>
            Details
          </Button>
        </Link>
      ),
      add: (
        <Button onClick={() => AddRecipe(recipes[i])}>
          Add
        </Button>
      )
    });
  }
  // setting up filter
  const setFilterText = text =>
    setFilteredText(text);
  const filteredItems = data.filter(item => item.creator.toLowerCase().includes(filteredText.toLowerCase()) || item.name.toLowerCase().includes(filteredText.toLowerCase()))
  return (
    <div className="Recipes" id="-1">
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={pagination}
        subHeader
        subHeaderComponent={<input type="text" className="mb-3" onChange={e => setFilterText(e.target.value)} />}
        selectableRows
        persistTableHead
        progressPending={loading} />
    </div>
  )
}

export default Recipes