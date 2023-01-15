import React, {useEffect, useContext} from 'react';
import Navbar from '../components/Navbar';
import GetProducts from '../components/GetProducts';



function AllProducts() {
    return (
        <>
        <Navbar />
        <GetProducts />
        </>
    );
}

export default AllProducts;