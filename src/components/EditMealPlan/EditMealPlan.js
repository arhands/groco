import { Fragment, useState, useEffect } from "react"
import { Link } from "react-router-dom";


const EditMealPlan = ({ mealplan }) => {
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


  // Get all selected mealplan's recipeIDs
  const [recipeIDs, setRecipesID] = useState([]);
  const [mealPlanRecipes, setMealPlanRecipes] = useState([]);

  // Get all recipeIds names from database ${recipeIDs[i].recipe_id}
  const getMealPlanRecipes = async () => {
    try {
      console.log('This is map recipeID');
      recipeIDs.map((each) => { console.log(each.recipe_id) });
      recipeIDs.map(async (each) => {
        await fetch(api + `/recipeName/${each.recipe_id}`)
          .then(response => {
            return response.json();
          })
          .then(name => {
            setMealPlanRecipes(name);
            console.log({ mealPlanRecipes });
          })
      })
    } catch (err) {
      console.error(err.message);
    }
  };

  // delete recipe from the current mealplan only
  const deleteMealPlanRecipe = async (recipe_id) => {
    const response = await fetch(api + `/mealplansRecipes/${recipe_id}`);
    const jsonData = await response.json();
    setRecipesID(jsonData)
    //setRecipesID (recipeIDs.filter(recipeID =>recipeID.id !==id))
    //setMealPlanRecipes(mealPlanRecipes.filter(mealPlanRecipe => mealPlanRecipe.id!==id));

  };

  /*
              const response = await fetch(`http://localhost:3001/recipeName/${id}`)
              const jsonData = await response.json();
              setMealPlanRecipes(jsonData);
              console.log('get receipe names json')
              console.log(mealPlanRecipes);
    */
  // Get all receipe IDs of a mealplan  
  useEffect(async () => {
    try {
      const response = await fetch(api + `/mealplans/${mealplan.id}/recipeIDs`)
      const jsonData = await response.json();
      console.log('getRecipeIDs json')
      console.log(jsonData);
      setRecipesID(jsonData)
    } catch (err) {
      console.error(err.message);
    }
  }, []);
  useEffect(() => {
  }, [recipeIDs])

  /*useEffect(()=>{
       getMealPlanRecipes();
   },[]);*/
  /* fetch(`http://localhost:3001/recipeName/${each.recipe_id}`*/

  useEffect(async () => {
    try {
      recipeIDs.map(async each => (
        await fetch(api + `/recipeName/5`)
          .then(response => {
            return response.json();
          })
          .then(name => {
            setMealPlanRecipes(name);
            console.log({ mealPlanRecipes });
          })))
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  useEffect(() => {
  }, [mealPlanRecipes])

  return (
    <div>
      <button type="button" class="btn btn-warning"
        data-toggle="modal" data-target={`#id${mealplan.id}`}>
        Edit
      </button>
      <div class="modal" id={`id${mealplan.id}`}>
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Editing {mealplan.name}</h4>
              <button type="button" class="close"
                data-dismiss="modal" onClick={() => setName(mealplan.name)}>
                &times;</button>
            </div>

            <div class="modal-body">
              <input type='text' placeholder='Edit plan name' className="form-control" value={name}
                onChange={e => setName(e.target.value)} />
            </div>


            <table className="table mt-5 text-center">
              <tbody>
                {recipeIDs.map(each => (
                  <tr key={each.id}>
                    <td>{each.recipe_id}</td>
                    <td>
                      <Link to='/recipedetails'>
                        <button>
                          View
                        </button>
                      </Link>

                    </td>
                    <td>
                      <button onClick={() => deleteMealPlanRecipe(each.id)}>
                        Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>



            <div class="modal-footer">
              <button type="button" class="btn btn-danger"
                data-dismiss="modal" onClick={e => updateName(e)} >Save
              </button>
              <button type="button" class="btn btn-danger"
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
