import { Fragment, useState } from "react"


const EditMealPlan = ({mealplan}) => {
  const [name, setName] = useState("Test name");
  
  return (
    <Fragment>
      <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal">
       Edit
      </button>
      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Editing meal plan</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
        
            <div class="modal-body">
            Body
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Save</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
             </div>

          </div>
        </div>
      </div>
    </Fragment>
  
  )};

export default EditMealPlan;
