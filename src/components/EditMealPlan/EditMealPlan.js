import { Fragment, useState, useEffect } from "react"


const EditMealPlan = ({mealplan}) => {

  // Edit mealplan name
  const [name, setName] = useState(mealplan.name);
  const updateName = async(e)=>{
    e.preventDefault();
    try{
      const body = {name};
      const response = await fetch(`http://localhost:3001/mealplans/${mealplan.id}`,{ 
          method:"PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
      });
      window.location = "/mealplans";
      }catch(err){
      console.log(err.message);
    }
  }

  // View all mealplan recipes 
  const [recipeIDs, setRecipesID] = useState([]);
  //const [mealPlanRecipes, setMealPlanRecipes] = useState([]);
  const getRecepiesID = async ()=>{
      try{
          const response = await fetch(`http://localhost:3001/mealplans/${mealplan.id}/recipesID`)
          const jsonData = await response.json();
          console.log(jsonData);
          setRecipesID(jsonData)
      }catch(err){
          console.error(err.message);
      }
      
  };

  /*function setRecipes(jsonData){
      setRecipesID(jsonData)
  }*/
  /*const getMealPlanRecipes = async ()=>{
      try{
          const response = await fetch(`http://localhost:3001/mealplans/${mealplan.id}`)
          const jsonData = await response.json();
          console.log(jsonData);
          setMealPlanRecipes(jsonData);
          
      }catch(err){
          console.error(err.message);
      }
      
  };*/
  useEffect(()=>{
  },[recipeIDs])
  useEffect(()=>{
      getRecepiesID();
  },[]);

  /*useEffect(()=>{
      getMealPlanRecipes();
  },[]);*/
  
  return (
    <Fragment>
      <button type="button" class="btn btn-warning" 
      data-toggle="modal" data-target={`#id${mealplan.id}`}>
       Edit
      </button>
      <div class="modal" id={`id${mealplan.id}`}>
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Editing meal plan</h4>
              <button type="button" class="close" 
              data-dismiss="modal" onClick={()=> setName(mealplan.name)}>
                &times;</button>
            </div>
        
            <div class="modal-body">
              <input type='text' placeholder='Edit plan name' className="form-control" value={name}
              onChange={e => setName(e.target.value)}/>
            </div>

            <div>
              {recipeIDs?.map( each => 
              <ul>
                <li>{each.recipe_id}</li>
              </ul>)}            
            </div>

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
