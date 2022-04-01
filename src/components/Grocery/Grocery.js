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
    // const url = "http://localhost:3001/grocery/";
    const url = "https://groco-backend.herokuapp.com/grocery/";

    // hooks
    const [groceryData, setGroceryData] = useState([]);
    const [brandData, setBrandData] = useState([]);
    const [measData, setMeasData] = useState([]);
    const [filteredText, setFilterText] = useState('');

    const [grocoId, setGrocoId] = useState(0);
    const [brandId, setBrandId] = useState(1);    
    const [quantity, setQuantity] = useState(0);
    const [measurementId, setMeasurementId] = useState(1);
    const googleID = localStorage.getItem('googleId');

    // call get all functions
    useEffect(() => {
        console.log("Getting grocoery");
        getAllGrocery();

        console.log("Getting brands");
        getAllBrand();

        console.log("Getting meas");
        getAllMeas();
    }, []);
        
    // column labels for table
    const cols =[
        {name: "Item", selector: row => row.name},
        {name: "Add", selector: row => row.add}
    ];

     // set up pop modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleOnChange = target => {
        console.log(target);
    };

    // error pop modal
    const [showError, setShowError] = useState(false);
    const handleErrorClose = () => setShowError(false);
    const handleErrorShow = () => setShowError(true);
    
    // ------- Grocery items ------- 
    // gets all grocery data from DB
    async function getAllGrocery() {
        try {
            const response = await fetch(url);
            const jsonData = await response.json();
            setGroceryData(jsonData);
        } catch(err) {
            console.log(err.message);
        }
    }

    // format raw Grocery data to be used in view
    const grocoViewData = [];
    const grocLen = groceryData.length;
    for(let i = 0; i < grocLen; i++){
        grocoViewData.push({
            id: groceryData[i].id,
            name: groceryData[i].name,
        });
    }

    // ------- Brands ------- 
    // get all brands from DB
    async function getAllBrand() {
        try {
            console.log(url + "brand");
            const response = await fetch(url + "brand");
            const jsonData = await response.json();
            setBrandData(jsonData);
        } catch(err) {
            console.log(err.message);
        }
    }

    // format raw Brand data to be used in view
    const brandFormatData = [];
    const brandLen = brandData.length;
    for(let i = 0; i < brandLen; i++){
        brandFormatData.push({
            id: brandData[i].id,
            name: brandData[i].name
        });
    }

    // dynamically assigns brand options for rendering on page
    let brandViewData = brandFormatData.length > 0 && brandFormatData.map((item, i) =>{
        return (
            <option key={i} value={item.id}> {item.name} </option>
        )
    });
    
    // ------- Measurements ------- 
    // get all meas from DB
    async function getAllMeas() {
        try {
            const response = await fetch(url + "meas");
            const jsonData = await response.json();
            setMeasData(jsonData);
        } catch(err) {
            console.log(err.message);
        }
    }

    // format raw Brand data to be used in view
    const measFormatData = [];
    const measLen = measData.length;
    for(let i = 0; i < measLen; i++){
        measFormatData.push({
            id: measData[i].id,
            name: measData[i].name
        });
    }

    // dynamically assigns brand options for rendering on page
    let measViewData = measFormatData.length > 0 && measFormatData.map((item, i) =>{
        return (
            <option key={i} value={item.id}> {item.name} </option>
        )
    });

    async function addToList() {
        if(grocoId) {
            const body = { grocoId, quantity, measurementId, brandId, googleID };
            const response = await fetch(url + "add_item/" + googleID, {
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
        } else {
            setShowError(true);
        }
        setShow(false);
    }


    <Shopping Grocery={groceryData} />

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
                subHeader 
                subHeaderComponent={<input type="text" className="mb-3" onChange={e => setFilterText(e.target.value)}/>} 
                selectableRows
                selectableRowsSingle
                onSelectedRowsChange={(event) => {setGrocoId(event.selectedRows[0].id)}}
                persistTableHead/>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="center">
                        <div> 
                            <select className="inputSize" value={brandId} onChange={(event) =>{setBrandId(parseInt(event.target.value))}}> {brandViewData} </select>
                        </div>
                        <div> 
                            <select className="inputSize" value={measurementId} onChange={(event) => {setMeasurementId(parseInt(event.target.value))}}> {measViewData} </select>
                        </div>
                        <div> <input className="inputSize" type="number" min={0} step={0.01} value={quantity} onChange={(event) => {parseFloat(setQuantity(event.target.value))} }/> </div>
                    </div>    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={() => {addToList()}}>Add to List</Button>
                    
                </Modal.Footer>
            </Modal>
            <Modal show={showError} onHide={handleErrorClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Oops! </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="center">
                        Please select a grocery item!
                    </div>
                </Modal.Body>
            </Modal>
            <div>
                <Button onClick={handleShow}>
                    Add to List
                </Button>
            </div>
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