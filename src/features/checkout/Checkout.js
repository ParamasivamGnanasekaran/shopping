import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import CheckoutCard from '../../component/CheckoutCard';
import { removeCheckOutFromCart } from '../../services/cart';
import { reduceProducts } from '../../services/products';
import { toast } from 'react-custom-alert';

export default function Checkout() {
  let location = useLocation();
  const navigate = useNavigate();
  const products = location.state.checkOutProducts
  const calculateAmount = () => {
    const sum = products.reduce((accumulator, product) => {
      return accumulator + (product.quantity * product.price)
    }, 0);
    return sum;
  }
  const totalAmount = calculateAmount();
  const reduceProduct = async () => { 
    if (products) {
      await reduceProducts(products).then(async (data) => {
        await removeCheckOutFromCart(products).then(remove =>{ 
         toast.success("Payment Sucessfull!!");
          navigate('/', { replace: true })
        })
      })
    }
  }
  return (
    <div>
      <div style={{ backgroundColor: '#87CEFA', width: '100%', minHeight: '60px', padding: '10px', marginTop: '60px' }}>
        <div style={{ display: 'flex', justifyContent: "space-around" }}>
          <button style={{ backgroundColor: '#1E90FF', color: 'white', border: 'none', display: 'inline', height: '40px' }}>
            <NavLink to="/cart" style={{ textDecoration: 'none', color: 'white' }} >Back To Cart</NavLink>
          </button>
          <div style={{ display: 'inline' }}>
            <h4>Checkout</h4>
          </div>
          <div style={{ display: 'inline' }}>
            <p>total amount: {totalAmount}</p>
          </div>
          <button style={{ backgroundColor: '#1E90FF', border: 'none', display: 'inline', textDecoration: 'none', color: 'white', height: '40px' }} onClick={() => reduceProduct()} >
            Proceed To Payment
          </button>
        </div>
      </div>
      {products.length > 0 ? products.map((product) =>
        <CheckoutCard key={product.id} product={product} />
      ) : <div style={{ color: 'red', display: 'flex', justifyContent: "center", alignItems: 'center', backgroundColor: '#D3D3D3', height: '600px' }}>
        <h1>Checkout products Are Not avaliable</h1>
      </div>}
    </div>

  );
};