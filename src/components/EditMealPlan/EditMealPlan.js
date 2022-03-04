import { Fragment, useState, useEffect } from "react"
import { Link } from "react-router-dom";


const EditMealPlan = ({mealplan}) => {
  // Edit mealplan name
  const [name, setName] = useState(mealplan.name);
  const updateName = async(e)=>{
    e.preventDefault();
    try{
      const body = {name};
      const response = await fetch(`https://61f6f4c72e1d7e0017fd6fa4.mockapi.io/mealplan/${mealplan.mealplan_id}`,{ 
          method:"PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
      });
      window.location = "/mealplans";
      }catch(err){
      console.log(err.message);
    }
  }

  // Save recipes deletion 
 



  // Get all selected mealplan's recipeIDs
  const [recipeIDs, setRecipesID] = useState([]);
  const [mealPlanRecipes, setMealPlanRecipes] = useState([]);
  const getRecepiesID = async ()=>{
      try{
          const response = await fetch(`http://localhost:3001/mealplans/${mealplan.id}/recipesID`)
          const jsonData = await response.json();
          console.log('getRecipeIDs json')
          console.log(jsonData);
          setRecipesID(jsonData)
      }catch(err){
          console.error(err.message);
      }
      
  };
  // Get all recipeIds names from database ${recipeIDs[i].recipe_id}
  const getMealPlanRecipes = async ()=>{
      try{
        console.log(recipeIDs);
        console.log(recipeIDs.length);
        for(var i=0;i<3;i++){
          await fetch(`http://localhost:3001/recipeName/5`)
          .then (response => {
            return response.json();
        })
        .then(name =>{
          setMealPlanRecipes(name);
          console.log({mealPlanRecipes});
        })}
      }catch(err){
        console.error(err.message);
}};

const deleteMealPlanRecipe = async (id)=>{
  //const response = await fetch(`http://localhost:3001/recipeName/5`);
  setMealPlanRecipes(mealPlanRecipes.filter(mealPlanRecipe => mealPlanRecipe.id!==id));
  
};
          
/*
            const response = await fetch(`http://localhost:3001/recipeName/${id}`)
            const jsonData = await response.json();
            setMealPlanRecipes(jsonData);
            console.log('get receipe names json')
            console.log(mealPlanRecipes);
  */
          
  useEffect(()=>{
      getRecepiesID();
  },[]);
  useEffect(()=>{
  },[recipeIDs])

  useEffect(()=>{
      getMealPlanRecipes();
  },[]);
  useEffect(()=>{
  },[mealPlanRecipes])
  
  return (
    <Fragment>
      <button type="button" class="btn btn-warning" 
      data-toggle="modal" data-target={`#id${mealplan.mealplan_id}`}>
       Edit
      </button>
      <div class="modal" id={`id${mealplan.mealplan_id}`}>
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Editing {mealplan.name}</h4>
              <button type="button" class="close" 
              data-dismiss="modal" onClick={()=> setName(mealplan.name)}>
                &times;</button>
            </div>
        
            <div class="modal-body">
              <input type='text' placeholder='Edit plan name' className="form-control" value={name}
              onChange={e => setName(e.target.value)}/>
            </div>

            
              <table className="table mt-5 text-center">
                <tbody>
                    {mealPlanRecipes.map(each =>(
                        <tr key={each.id}>
                            <td>{each.name}</td>
                            <td>
                              <Link to='/recipedetails'>
                                <button>
                                View
                                </button> 
                              </Link>
                              
                            </td>
                            <td>
                            <button onClick={()=>deleteMealPlanRecipe(each.id)}>
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
              data-dismiss="modal" onClick={()=> setName(mealplan.name)}>
                Close</button>
             </div>

          </div>
        </div>
      </div>



    </Fragment>
  
  )};

export default EditMealPlan;
