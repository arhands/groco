import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal } from 'react-bootstrap';
import './Grocery.css';

function Grocery() {
    // gives pop up to choose brand, measurement, and type, adds to shopping list
    function addToList(data){
        

    }

    // column labels for table
    const cols =[
        {name: "Item", selector: row => row.name},
        {name: "Add", selector: row => row.add}
    ];

    // dummy data for testing
    const rawData = [
        {name: "Egg", id: 100}, {name: "Milk", id: 200}, 
        {name: "Wheat Bread", id: 300}, {name: "Hot Sauce", id: 400}, 
        {name: "Cookie Dough", id: 500}, {name: "Spaghetti", id: 600}
    ];

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


    // format raw data to be used in view
    const data = [];
    const rawLen = rawData.length;
    for(let i = 0; i < rawLen; i++){
        data.push({
            id: i,
            name: rawData[i].name,
            add: (
                <Button onClick={handleShow}>
                    Add to List
                </Button>
            )
        });
    }

    return (
        <div className="groco-div">
            <h2>Groceries</h2>
            <div className="GroceriesTable" id="1">
            <DataTable columns={cols} data={data} persistTableHead/>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="center">
                        <div> 
                            <select className="inputSize"> {brandsList} </select>
                        </div>
                        <div> 
                            <select className="inputSize"> {measList} </select>

                        </div>
                        <div> <input className="inputSize" type="number" min={0} step={0.01}/> </div>
                    </div>    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={() => {addToList(data)}}>Add to List</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Grocery