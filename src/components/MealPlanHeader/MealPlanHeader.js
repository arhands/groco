import "./MealPlanHeader.css"
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
const MealPlanHeader = ({title}) => {
    return (
        <div className='mealPlanHeader'>
            <div>{title}</div>
            <div className='link'>
                <Link to='/' style={{color:'black'}}>Edit</Link>
            </div>
        </div>
    )
}
export default MealPlanHeader