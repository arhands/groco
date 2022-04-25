import './Shopping.css';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShoppingRouteOptionsModal from '../ShoppingRouteDisplay/ShoppingRouteOptionsModal.js';
import {useSnackbar} from "notistack";


function FavList() {
    const api = process.env.REACT_APP_BACKEND_API
    const url = api + "/shoppingList/";

    // hooks
    const [listData, setListData]  = useState([]);
    const [instId, setInstId] = useState(0); 
    const [filteredText, setFilterText] = useState('');

    const [show, setShow] = useState(false);
	const [options, showOptions] = useState(false);
    const handleClose = () => setShow(false);

    const {enqueueSnackbar} = useSnackbar();
    const delReload=()=>{
        enqueueSnackbar('Item deleted!',{variant: 'success'});
    }

    const googleID = localStorage.getItem('googleId');

    useEffect(() => {
        getListData();
    }, [show]);

    // column labels for table
    const cols = [
        { name: "Item", selector: row => row.name },
        { name: "Brand", selector: row => row.brand},
        { name: "Amount", selector: row =>row.amount},
        { name: "Measurement", selector: row => row.meas},
        { name: "Delete", selector: row => row.delete },
    ];

    async function getListData(){
        try {
            const response = await fetch(url + "get/" + googleID);
            const jsonData = await response.json();
            setListData(jsonData);
        } catch(err) {
            console.log(err.message);
        }
    }


    // format raw favorite data to be used in view
    const listViewData = [];
    const listLen = listData.length;
    for (let i = 0; i < listLen; i++) {
        listViewData.push({
            id: listData[i].instid,
            name: listData[i].name,
            brand: listData[i].bname,
            amount: listData[i].quantity,
            meas: listData[i].meas,
            delete: (
                <Button onClick={function(event) {setInstId(listData[i].instid); setShow(true)}}>Delete</Button>
            )
        });
    }

    // setting up filters
    const filteredList = listViewData.filter(item => item.name.toLowerCase().includes(filteredText.toLowerCase()))

    async function deleteItem() {
        console.log(instId);
        if( instId ){
            try {
                const body = { instId };
                const del = await fetch(url + "delete", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                const jsonData = await del.json();
                setShow(false);
            } catch(err) {
                console.log(err.message);
            }
        }
    }

    return (
        <div className="list-div">
            <h2>Shopping List</h2>
            <div className="listTable">
                <DataTable
                columns={cols}
                data={filteredList}
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
                            <p>Are you sure you want to delete this item from your Shopping List?</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={function(event) { deleteItem(); delReload() }}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div>
                <Button onClick={() => {showOptions(true)} }>Shop Items</Button>
				<ShoppingRouteOptionsModal Show={options} HideMenu={() => showOptions(false)}/>
            </div>
        </div>

    );
}


export default FavList;