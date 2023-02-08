import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Catergories";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import MenCategories from "../components/MenCatergories";

function Home() {
  return (
    <>
      <Announcement />
      <Header />
      <Slider />
      <Categories />
      <MenCategories />
      <Products />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
