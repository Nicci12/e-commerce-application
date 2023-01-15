import React from 'react';
import Navbar from '../components/Navbar';
import Categories from '../components/Catergories';
import MenCategories from '../components/MenCatergories';
import Product from './Product';


function Welcome() {
    return (
        <>
        <Navbar />
        <Categories/>
        <MenCategories />
        </>
    );
}

export default Welcome;