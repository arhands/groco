import { Link } from 'react-router-dom';
import "./MealPlans.css";
import { Fragment, useEffect, useState } from 'react';
import AddMealPlan from '../AddMealPlan/AddMealPlan';
import EditMealPlan from '../EditMealPlan/EditMealPlan';




const MealPlans = () => {
    const api = process.env.REACT_APP_BACKEND_API;
    const user_id = localStorage.getItem('userId');
    const [mealPlans, setMealPlans] = useState([]);
    // Delete mealplan function
    const deleteMealPlan = async (id) => {
        try {
            const deleteTodo = await fetch(api + `/mealplans/${id}`, {
                method: "DELETE"
            });
            setMealPlans(mealPlans.filter(mealPlan => mealPlan.id !== id));
        } catch (err) {
            console.err(err.message);
        }
    };

    // Fetch data from API
    const getMealPlans = async () => {
        try {
            const response = await fetch(api + `/mealplans/${user_id}`)
            const jsonData = await response.json();
            console.log('user id ', user_id)
            console.log(jsonData);
            setMealPlans(jsonData);

        } catch (err) {
            console.error(err.message);
        }

    };


    useEffect(() => {
        getMealPlans();
    }, []);

    return (
        <Fragment>
            <AddMealPlan />
            <table className="table mt-5 text-center">
                {/*<thead>
                <tr>
                    <th>Mealplan</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>*/}
                <tbody>
                    {mealPlans.map(mealPlan => (
                        <tr key={mealPlan.id}>
                            <td>{mealPlan.name}</td>
                            <td>

                            </td>
                            <td>
                                <EditMealPlan mealplan={mealPlan} />
                            </td>
                            <td>
                                <button className='btn btn-danger'
                                    onClick={() => deleteMealPlan(mealPlan.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
};


export default MealPlans
