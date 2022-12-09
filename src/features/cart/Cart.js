import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CartCard from '../../component/CartCard';
import { Section } from '../../component/section';
import { removeFromCart, updateQuantity } from '../../services/cart';
import { getCartProducts } from '../../services/products';
import { toast } from 'react-custom-alert';

export default function Cart(props) {
   const [products, setProducts] = useState([])
   const [search, setSearch] = useState([])
   const effectRan = useRef(false)
   const childRef = useRef();
   let [checkOutProducts, setCheckOutProducts] = useState([])
  
   useEffect(() => {
      if (effectRan.current === false) {
         const fetchUsers = async () => {
            await getCartProducts().then(product => {
               setProducts(product)
            })
         }
         fetchUsers()
      }
      return () => {
         effectRan.current = true
      }
   }, [products, checkOutProducts])

   const callCartDelete = async (productId) => {
      await removeFromCart(productId).then(products => {
         setCheckOutProducts(products => {
            return products.filter((product) => product.id !== productId)
         })
         setProducts(products)
         childRef.current.activateFocus(products)
         toast.error("Product Remove From Cart!!");
      });
   }

   const callCartAdd = async (amount, productId) => {
      let data = await updateQuantity(amount, productId).then(data => {
         setProducts(data.products)
         setCheckOutProducts(data.products)
         childRef.current.activateFocus(data.products)
         return data.carts.quantity
      })
      return data;
   }

   const callSortBy = (products) => {
      setProducts(products)
   }

   const callCheck = (isChecked, product) => {
      if (isChecked) {
         setCheckOutProducts(searches => [...searches, product])
      } else {
         setCheckOutProducts(searches => searches.filter((products) => products.id !== product.id))
      }
   }

   return (
      <div>
         <Section products={products}  ref={childRef}  callSortBy={(products) => callSortBy(products)} callSearch={(query) => setSearch(query)} />
         <div style={{ backgroundColor: '#D3D3D3'}}>
            <div style={{ padding: '20px', display: 'flex', justifyContent: "space-around" }}>
               <button style={{ backgroundColor: '#1E90FF', color: 'white', border: 'none', display: 'inline' }}>
                  <NavLink to="/" style={{ margin: "1rem", textDecoration: 'none', color: 'white' }} >Back To Home</NavLink>
               </button>
               <div style={{ display: 'inline' }}>
                  <h4>CART</h4>
               </div>
               <button style={{ backgroundColor: '#1E90FF', border: 'none', display: 'inline' }}>
                  <NavLink to={{ pathname: "/checkout" }} state={{ checkOutProducts }} style={{ margin: "1rem", textDecoration: 'none', color: 'white' }} >Go To Checkout</NavLink>
               </button>
            </div>
            {products.length > 0 ? products.filter(product => {
               if (search === '') {
                  return product;
               } else if (product.title.toString().toLowerCase().includes(search.toString().toLowerCase())) {
                  return product;
               }
            }).map((product) =>
               <CartCard key={product.id} product={product} callCartDelete={(productId) => callCartDelete(productId)} callCartAdd={(amount, productId) => callCartAdd(amount, productId)} callCheck={(isChecked, product) => callCheck(isChecked, product)} />
            ) : <div style={{ color: 'red', display: 'flex', justifyContent: "center", alignItems: 'center', height: '525px' }}>
               <h1>Cart Products Are Not avaliable</h1>
            </div>}
         </div>
      </div>
   );
};