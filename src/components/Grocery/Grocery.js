import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button, Modal } from 'react-bootstrap';
import './Grocery.css';
import Shopping from '../Shopping/Shopping';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket} from '@fortawesome/free-solid-svg-icons';

function Grocery() {
    // gives pop up to choose brand, measurement, and type, adds to shopping list
    const api = "http://localhost:3001/grocery";
    const[groceryData, setGroceryData] = useState([]);
    useEffect(() => {
        getAllGrocery();
    }, []);

    const[brandName, setBrandName] = useState();    
    const[quantity, setQuantiy] = useState();
    const[measurementType, setMeasurementType] = useState();


    function addToList(){
        const groceryItem = {            
            groceryBrand: brandName,            
            groceryQuantity: quantity,
            groceryMeasurment: measurementType,
        };
        setGroceryData(groceryItem);
    }
   
    // column labels for table
    const cols =[
        {name: "Item", selector: row => row.name},
        {name: "Add", selector: row => row.add}
    ];

    async function getAllGrocery() {
        try {
            const response = await fetch(api);
            const jsonData = await response.json();
            setGroceryData(jsonData);
        } catch(err) {
            console.log(err.message);
        }
    }

    // dummy brand data for spinner
    const brands = [
        {id: 100, name: "Wonder"}, {id: 200, name: "Heinz"},
        {id: 300, name: "Yoohoo"}, {id: 400, name: "Tapitio"},
        {id: 500, name: "Chef Boyardee"}, {id: 600, name: "Lays"}
    ];

    // dynamically assigns brand options for rendering on page
    let brandsList = brands.length > 0 && brands.map((item, i) => {
        return (
            <option key={i} value={item.id}>{item.name}</option>
        )
    });

    // dummy measurments data for spinner
    const meas = [
        {id: 100, name: "gallon"}, {id: 200, name: "cup"},
        {id: 300, name: "teaspoon"}, {id: 400, name: "tablespoon"},
        {id: 500, name: "bag"}, {id: 600, name: "unit"}
    ];

    // dynamically assigns measurment options for rendering on page
    let measList = meas.length > 0 && meas.map((item, i) => {
        return (
            <option key={i} value={item.id}>{item.name}</option>
        )
    });


    // set up pop modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleOnChange = target => {
        console.log(target);
    };


    // format raw Grocery data to be used in view
    const grocoViewData = [];
    const grocLen = groceryData.length;
    for(let i = 0; i < grocLen; i++){
        grocoViewData.push({
            id: groceryData[i].id,
            name: groceryData[i].name,
            add: (
                <Button onClick={handleShow}>
                    Add to List
                </Button>
            )
        });
    }

    <Shopping Grocery={groceryData} />
    console.log(groceryData);

    const [filteredText, setFilterText] = useState('')
    const [pagination, setPagination] = useState(false)

    // setting up filter
    const filteredGrocery = grocoViewData.filter(item => item.name.toLowerCase().includes(filteredText.toLowerCase()))

    return (
        <div className="groco-div">
            <h2>Groceries</h2>
            <div className="GroceriesTable" id="1">
            <DataTable 
                columns={cols} 
                data={filteredGrocery} 
                pagination 
                //paginationResetDefaultPage={this.state.pagination} 
                subHeader 
                subHeaderComponent={<input type="text" className="mb-3" onChange={e => setFilterText(e.target.value)}/>} 
                selectableRows
                persistTableHead/>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="center">
                        <div> 
                            <select className="inputSize" value={brandName} onChange={(event) =>{setBrandName(event.target.value)}}> {brandsList} </select>
                        </div>
                        <div> 
                            <select className="inputSize" value={measurementType} onChange={(event) => {setMeasurementType(event.target.value)}}> {measList} </select>
                        </div>
                        <div> <input className="inputSize" type="number" min={0} step={0.01} value={quantity} onChange={(event) => {setQuantiy(event.target.value)} }/> </div>
                    </div>    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={() => {addToList()}}>Add to List</Button>
                    
                </Modal.Footer>
            </Modal>
            <div>
                <Button>
                    <Link to ="/shopping"> <FontAwesomeIcon icon={faShoppingBasket}/>
                     Go to Shopping List</Link>
                </Button>    
            </div>      
        </div>      
    );
}

export default Grocery