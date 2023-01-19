import React,{useContext, useEffect, useState} from 'react';
import AppContext from "../context/appContext";
import axios from 'axios';

function WishList() {
  const baseUrl = "http://localhost:8080";
    const {user, productsList } = useContext(AppContext);
      const [wishlist, setWishlist] = useState([]);

      useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`http://localhost:8080/users/${user}/wishlist`);
                const wishlistIds = res.data.wishlist;
                const requests = wishlistIds.map(async id => {
                    const product = await axios.get(`http://localhost:8080/products/${id}`);
                    return product.data;
                });
                const products = await Promise.all(requests);
                setWishlist(products);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [user]);
    
      // useEffect(() => {
      //   async function fetchData() {
      //     const res = await axios.get(`http://localhost:8080/users/${user}/wishlist`);
      //    const array=res.data.wishlist
      //    array.forEach(async () => {
      //    const wishlist = await axios.get(`http://localhost:8080/products/wishlist/${array}`)
      //    setWishlist((prev) => [...prev, wishlist.data]);
      //   //  console.log("array", array)
      //   //  console.log("prodcuts", products.data)
      //   }
      // )}
      //   fetchData();
      // }, []);
    
      if (!wishlist) {
        return <div>Loading...</div>;
      }
    
      return (
        <div>
          <h1>My Wishlist</h1>
          <ul>
            {wishlist.map(item => (
              <li key={item.id}>{item.item}</li>
            ))}
          </ul>
        </div>
      );
    }
  

export default WishList;