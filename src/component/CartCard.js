import React, { useEffect, useRef, useState } from 'react';
import { NEGATIVE, POSITIVE } from '../constData/SortData';


export default function CartCard(props) {
   const { product } = props
   const effectRan = useRef(false)
   const [isChecked, setIsChecked] = useState(true);

   const adjustCount = async (amount) => {
      if ((amount + product.quantity) > 0 && (amount + product.quantity) <= product.productCount) {
         await props.callCartAdd(amount, product.id)
      }
   }
   useEffect(() => {
      if (effectRan.current === false) {
         const fetchUsers = async () => {
            props.callCheck(isChecked, product)
         }
         fetchUsers()
      }
      return () => {
         effectRan.current = true
      }
   }, [isChecked])

   const handleOnChange = () => {
      setIsChecked(!isChecked);
      props.callCheck(!isChecked, product)
   };
   return (
      <div style={{ padding: '20px' }}>
         <div style={{ padding: '20px', border: '2px solid ', borderRadius: '20px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', maxHeight: '200px', alignItems: 'center' }}>
            <img src={product.image} alt={product.title} style={{ width: "10%", height: '100px' }} />
            <div>{product.title} </div>
            <div>RS.{product.price}</div>
            <div>left:{product.productCount}</div>
            <div style={{ padding: '5px', border: '2px solid ', borderRadius: '5px', backgroundColor: '#D3D3D3', display: 'flex', justifyContent: 'space-evenly', maxHeight: '40px' }}>
              { product.quantity > 1 &&<button style={{ backgroundColor: '#1E90FF', color: 'white', border: 'none', minHeight: '20px',marginRight: '10px' }} onClick={() => adjustCount(NEGATIVE)}>
                  -
               </button>}
               <p  style={{ marginRight: '10px'}}>selected:{product.quantity}</p>
               <p  style={{ paddingRight: '10px'}}>total amount:{product.price * (product.quantity)}</p>
               {(POSITIVE + product.quantity) <= product.productCount &&<button style={{ backgroundColor: '#1E90FF', color: 'white', border: 'none', minHeight: '20px' }} onClick={() => adjustCount(POSITIVE)}>
                  +
               </button>}
            </div>
            <button style={{ backgroundColor: '#1E90FF', color: 'white', border: 'none', minHeight: '20px', maxHeight: '30px' }} onClick={() => props.callCartDelete(product.id)}>
               Remove From Cart
            </button>
            <div className="topping">
               <input type="checkbox" checked={isChecked} onChange={handleOnChange} />
            </div>
         </div>

      </div>
   );
};