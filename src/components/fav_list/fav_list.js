import './fav_list.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FavList() {


    return (
        <div className='app-background'>
            <div className='main-container'>
                <div><h2>Favorite List</h2></div>
                <div className='item-box'>
                    <div className='item-container'>
                        <div className='item-name'>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default FavList;