import { Fragment, useState } from "react"


const EditMealPlan = ({mealplan}) => {
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
              <h4 class="modal-title">Editing meal plan</h4>
              <button type="button" class="close" 
              data-dismiss="modal" onClick={()=> setName(mealplan.name)}>
                &times;</button>
            </div>
        
            <div class="modal-body">
              <input type='text' placeholder='Edit plan name' className="form-control" value={name}
              onChange={e => setName(e.target.value)}/>
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
