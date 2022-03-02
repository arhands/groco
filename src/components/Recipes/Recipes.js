import React, { useState, createContext } from "react";
import ReactDOM from 'react-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './Recipes.css'
import DataTable from 'react-data-table-component';
import { Modal } from "react-bootstrap";
import $, { ajax } from 'jquery';
import context from "react-bootstrap/esm/AccordionContext";
import Shopping from "../Shopping/Shopping";

function Recipes() {
    function AddRecipe(data)
    {

    }
    const columns = [
        {name: 'Name', selector: row => row.name, sortable: true},
        {name: 'Author', selector: row => row.creator, sortable: true},
        {name: 'Details', selector: row => row.details},
        {name: 'Add', selector: row => row.add},
    ];
    // raw data collected from server
    const RawData = [
        { creator: "Kyle",      name: "Water Soup",      id: 337},
        { creator: "Steve",     name: "Pickle Sandwich", id: 561},
        { creator: "Will",      name: "Egg on Bread",    id: 849},
        { creator: "Christine", name: "Rice",            id: 123}
    ];
    // converting data into something usable.
    const data = []
    for(let i = 0; i < RawData.length; i++)
    {
        data.push({
            id: i,
            creator: RawData[i].creator,
            name: RawData[i].name,
            details: (
                <Link
                to={{
                    pathname: "/recipedetails",
                    data: {id: RawData[i].id, RecipeName: RawData[i].name}
                }}
                >
                    <Button>
                        Details
                    </Button>
                </Link>
                
            ),
            add: (
                <Button onClick={<Shopping data = {RawData[i]} />}>
                    Add
                </Button>
            )
        });
    }
    // setting up filter
    const [filterText, setFilterText] = React.useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)
    const filteredItems = data.filter(item => item.creator.toLowerCase().includes(filterText.toLowerCase()) || item.name.toLowerCase().includes(filterText.toLowerCase()))
    const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		//return (
		//	<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        //    
        //);
        return (
			<input type="text" onChange={e => setFilterText(e.target.value)} onClear={handleClear} />
            
		);
	}, [filterText, resetPaginationToggle]);
    return (
        <div className="Recipes" id="-1">
            <DataTable columns={columns} data={filteredItems} pagination paginationResetDefaultPage={resetPaginationToggle} subHeader subHeaderComponent={subHeaderComponentMemo} selectableRows persistTableHead/>
        </div>
    )
}

export default Recipes
