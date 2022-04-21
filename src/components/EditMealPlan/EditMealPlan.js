import { Fragment, useState, useEffect } from "react"
import { Link } from "react-router-dom";



const EditMealPlan = ({ mealplan }) => {
  
  const reload=()=>{
    alert('Recipe is deleted.')
    window.location.reload();
  }
  // Edit mealplan name
  const api = process.env.REACT_APP_BACKEND_API
  const [name, setName] = useState(mealplan.name);
  const updateName = async (e) => {
    e.preventDefault();
    try {
      const body = { name };
      const response = await fetch(api + `/mealplans/${mealplan.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = "/mealplans";
    } catch (err) {
      console.log(err.message);
    }
  }

  const [recipeIDs, setRecipeIDs] = useState([]);

  // delete recipe from the current mealplan only
  const deleteMealPlanRecipe = async (recipe_id) => {
    try {
        const deleteRecipe = await fetch(`http://localhost:3001/mealplanRecipes/${mealplan.id}/${recipe_id}`, {
            method: "DELETE"
        });
        setRecipeIDs(recipeIDs.filter(recipe => recipe.recipe_id !== recipe));
        
    } catch (err) {
        console.err(err.message);
    }
};
 useEffect( () =>{

 },[recipeIDs])

  // Get all receipes of a mealplan  
  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:3001/mealplanRecipes/${mealplan.id}`)
      const jsonData = await response.json();
      console.log(jsonData);
      setRecipeIDs(jsonData)
    } catch (err) {
      console.error(err.message);
    }
  }, []);
  useEffect(() => {
  }, [recipeIDs])


  
  return (
    <div>
      <button type="button" className="btn btn-outline-success"
        data-toggle="modal" data-target={`#id${mealplan.id}`} >
        Edit
      </button>
      <div className="modal" id={`id${mealplan.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Editing {mealplan.name}</h4>
              <button type="button" className="close"
                data-dismiss="modal" onClick={() => setName(mealplan.name)}>
                &times;</button>
            </div>

            <div className="modal-body">
              <input type='text' placeholder='Edit plan name' className="form-control" value={name}
                onChange={e => setName(e.target.value)} />
            </div>

            <table className="table mt-5 text-center" >
              <tbody>
                {recipeIDs.map(each => (
                  <tr key={each.id}>
                    <td>{each.name}</td>
                    <td>
                      <button onClick={() => {deleteMealPlanRecipe(each.recipe_id); reload()}}>
                        Delete </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="modal-footer">
              <button type="button" className="btn btn-danger"
                data-dismiss="modal" onClick={e => updateName(e)} >Save
              </button>
              <button type="button" className="btn btn-danger"
                data-dismiss="modal" onClick={() => setName(mealplan.name)}>
                Close</button>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
};

export default EditMealPlan
