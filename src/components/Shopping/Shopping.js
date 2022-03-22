import React, { useState } from 'react';
import './Shopping.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle, faPlus, faChevronLeft ,faChevronRight} from '@fortawesome/free-solid-svg-icons';
import ShoppingRouteOptionsModal from '../ShoppingRouteDisplay/ShoppingRouteOptionsModal.js';
import Button from "react-bootstrap/Button";
import Units from './Units';

const Shopping = (props) => {
	
	const [items, setItems] = useState([]);

	const groceryItem ={
		itemName: props.groceryBrand,
		quantity: props.groceryQuantity,
		units: props.ButtongroceryMeasurment,
	}

	const [inputValue, setInputValue] = useState('');
	const [totalItemCount, setTotalItemCount] = useState('');

	const handleAddButtonClick = () => {
		const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false,
		};
		
		const newItems = [...items, newItem];

		if(newItem.itemName.length===0){
			alert('Please add a food to your shopping list');
		}
		else{
			setItems(newItems);
			setInputValue('');
			calculateTotal();
		}
	};

	const handleQuantityIncrease = (index) => {
		const newItems = [...items];

		newItems[index].quantity++;

		setItems(newItems);
		calculateTotal();
	};

	const handleQuantityDecrease = (index) => {
		const newItems = [...items];

		if(newItems[index].quantity>0){
			newItems[index].quantity--;
		}
		
		setItems(newItems);
		calculateTotal();
	};

	const toggleComplete = (index) => {
		//const newItems = [...items];
		const removeItems = [...items];
		
		//newItems[index].isSelected = !newItems[index].isSelected;
		
		removeItems[index].quantity = 0;
		removeItems.splice(index,1);
		
		//setItems(newItems);
		setItems(removeItems);
		calculateTotal();
	};

	const calculateTotal = () => {
		const totalItemCount = items.reduce((total, item) => {
			return total + item.quantity;
		}, 0);

		setTotalItemCount(totalItemCount);
	};
	const [options, showOptions] = useState(false);
	const [units, showUnits] = useState(false);
	
	console.log("Rerendering shopping")
	console.log("options: ",options)
	return (
		
		<div className='app-background'>
			<div className='main-container'>
			
			<div><h2>Shopping list</h2></div>
				<div className='add-item-box'>
					
					<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...'/>	
					
					<FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} alignmentBaseline = 'right' />
				</div>
				<div className='item-list'>
					<div className = 'item-container'>
						<div className='item-name'>
							{groceryItem.itemName}
						</div>
						<div className='Quantity'>
							{groceryItem.quantity}
						</div>
						<div className='Units'>
							{groceryItem.units}
						</div>
					</div>					
					{items.map((item, index) => (						
						<div className='item-container'>
							<div className='item-name' onClick={() => toggleComplete(index)}>
								{item.isSelected ? (
									<>
										<FontAwesomeIcon icon={faCheckCircle} />
										<span className='completed'>{item.itemName}</span>
										
									</>
								) : (
									<>
										<FontAwesomeIcon icon={faCircle} />
										<span>{item.itemName}</span>
									</>
								)}
							</div>
							<div className='quantity'>
								<button>
									<FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
								</button>
								<span> {item.quantity} </span>
								<button>
									<FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
								</button>
							</div>
							<div className = 'units'>
								<Button variant="primary" onClick={() => {showUnits(true);}}>
									Change<Units Display={units} HideDisplay={() => showUnits(false)}/>
								</Button>								
							</div>
						</div>
					))}
					
				</div>
				<div className='total'>Total: {totalItemCount}</div>
				<div className='shop'>
					<Button variant="primary" onClick={() => {showOptions(true); console.log("button clicked!");}}>Open Options</Button>
					<ShoppingRouteOptionsModal Show={options} HideMenu={() => showOptions(false)}/>
				</div>
			</div>
			
		</div>
		
	);
};

export default Shopping;
