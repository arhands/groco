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
    const grocoApi = "http://localhost:3001/grocery/";
    // hooks
    const[groceryData, setGroceryData] = useState([]);
    const [brandData, setBrandData] = useState([]);
    const [filteredText, setFilterText] = useState('');
    const[brandName, setBrandName] = useState();    
    const [measData, setMeasData] = useState([]);
    const[quantity, setQuantiy] = useState();
    const[measurementType, setMeasurementType] = useState();
    const [listId, setListId] = useState();
    const [maxCollectId, setMaxCollect] = useState();
    const [userData, setUserData] = useState([]);

    const googleID = localStorage.getItem('googleId');
    const userApi = "http://localhost:3001/user/" + googleID;


    // call get all functions
    useEffect(() => {
        getAllGrocery();
    }, [])

    useEffect(() => {
        getAllBrand();
    }, []);

    useEffect(() => {
        getAllMeas();
    }, []);

    useEffect(() => {
        getListId();
    }, []);

    useEffect(() => {
        getMaxCollectId();
    }, [listId]);

    useEffect(() => {
        setShoppingListId();
    }, [maxCollectId]);

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
    
    // ------- Grocery items ------- 
    // gets all grocery data from DB
    async function getAllGrocery() {
        try {
            const response = await fetch(grocoApi);
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
            add: (
                <Button onClick={handleShow}>
                    Add to List
                </Button>
            )
        });
    }

    // ------- Brands ------- 
    // get all brands from DB
    async function getAllBrand() {
        try {
            const response = await fetch(grocoApi + "brand");
            const jsonData = await response.json();
            setBrandData(jsonData);
            console.log(jsonData);
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
            const response = await fetch(grocoApi + "meas");
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

    async function getListId(){
        try {
            const response = await fetch(userApi);
            const jsonData = await response.json();
            setUserData(jsonData);
        } catch(err) {
            console.log(err.message);
        }
        setListId(userData.shopping_list_id);
    }

    async function getMaxCollectId() {
        if(listId === undefined) {
            try {
                const response = await fetch(grocoApi + "maxCollect");
                const jsonData = await response.json();
                setMaxCollect(jsonData[0].max + 1);
            } catch(err) {
                console.log(err.message);
            }
        }
    }

   // update shopping list ID
    async function setShoppingListId(){
        try {
            const body = { maxCollectId };
            const respone = await fetch(grocoApi + "setListId/" + googleID, {
                method:"PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            setListId(maxCollectId);
        } catch(err) {
            console.log(err.message);
        }
    }


    async function addToList() {
        console.log("honk!");
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
                persistTableHead/>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="center">
                        <div> 
                            <select className="inputSize" value={brandName} onChange={(event) =>{setBrandName(event.target.value)}}> {brandViewData} </select>
                        </div>
                        <div> 
                            <select className="inputSize" value={measurementType} onChange={(event) => {setMeasurementType(event.target.value)}}> {measViewData} </select>
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