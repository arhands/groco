import './fav_list.css';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FavList() {
    const api = process.env.REACT_APP_BACKEND_API
    const url = api + "/favList/";

    // hooks
    const [favData, setFavData]  = useState([]);
    const [instId, setInstId] = useState(0); 
    const [filteredText, setFilterText] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const googleID = localStorage.getItem('googleId');

    useEffect(() => {
        getFavData();
    }, [show]);

    // column labels for table
    const cols = [
        { name: "Item", selector: row => row.name },
        { name: "Brand", selector: row => row.brand},
        { name: "Amount", selector: row =>row.amount},
        { name: "Measurement", selector: row => row.meas},
        { name: "Add Item", selector: row => row.add },
        { name: "Delete", selector: row => row.delete },
    ];

    async function getFavData(){
        try {
            const response = await fetch(url + "get/" + googleID);
            const jsonData = await response.json();
            setFavData(jsonData);
        } catch(err) {
            console.log(err.message);
        }
    }


    // format raw favorite data to be used in view
    const favViewData = [];
    const favLen = favData.length;
    for (let i = 0; i < favLen; i++) {
        favViewData.push({
            id: favData[i].instid,
            name: favData[i].name,
            brand: favData[i].bname,
            amount: favData[i].quantity,
            meas: favData[i].meas,
            add: (
                <Button onClick={() => addToShopping(favData[i])}>Add</Button>
            ),
            delete: (
                <Button onClick={function(event) {setInstId(favData[i].instid); setShow(true)}}>Delete</Button>
            )
        });
    }

    // setting up filters
    const filteredFavs = favViewData.filter(item => item.name.toLowerCase().includes(filteredText.toLowerCase()))

    async function deleteItem() {
        if(instId){
            try {
                const body = { instId };
                const del = await fetch(url + "delete", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                const jsonData = await del.json();
            } catch(err) {
                console.log(err.message);
            }
        }
            setShow(false);
            toast.success('Item deleted!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    }

    // add 1 item to shopping list
    async function addToShopping(item) {
        const grocoId = item.grocid;
        const quantity = item.quantity;
        const measurementId = item.measurement_type;
        const brandId = item.brand_id;
        try {
            const body = { grocoId, quantity, measurementId, brandId };
            const response = await fetch(api + "/grocery/add_item/" + googleID, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            toast.success('Item added!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch(err){
            console.log(err.message);
        }
    }

    // add all items to shopping list
    async function addAllFavs() {
        try {
            const body = { googleID };
            const response = await fetch(url + "addAllFavs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            toast.success('All items added!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch(err){
            console.log(err.message);
        }
    }

    return (
        <div className="fav-div">
            <h2>Favorites List</h2>
            <div className="favTable">
                <DataTable
                columns={cols}
                data={filteredFavs}
                pagination
                subHeader
                subHeaderComponent={<input type="text" className="mb-3" onChange={e => setFilterText(e.target.value)} />}
                persistTableHead />
            </div>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="center">
                            <p>Are you sure you want to delete this item from your favorites?</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={function(event) { deleteItem(); setShow(false) }}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div>
                <Button onClick={() =>  addAllFavs() }>Add all to Shopping List</Button>
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </div>

    );
}


export default FavList;