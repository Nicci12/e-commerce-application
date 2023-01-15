import React from 'react';
import Navbar from '../components/Navbar';
import Categories from '../components/Catergories';
import MenCategories from '../components/MenCatergories';
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