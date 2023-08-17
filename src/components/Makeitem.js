import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Makeitem= ({toggle,settoggle,contract,provider}) => {
  const [hasBought, setHasBought] = useState(false)
  const [number,setnumber] = useState(0)
  const [numberofsold,setnumberofsold] = useState(0)
  const [price,setprice] = useState(0)
 const MakeHandler= async() => {
    console.log(number)
    console.log(numberofsold)
    const signer =provider.getSigner()
    let transaction = contract.connect(signer).makeItem(number,numberofsold,price)
    await transaction.wait()

 }
  const handleOnClick = (e) => {
    setnumber(e.target.value)
  }
  const handleOnClickSetnumbersold = (e) => {
    setnumberofsold(e.target.value)
  }
  const handldeOnPrice = (e) => {
    setprice(e.target.value)
  }
  return (
    <div className="product">
        <div className='product__details'>
          
          <div className='product__overview'>
            {/* <h1 > {item.itemId.toString()}</h1> */}
             </div>
             <div className='product__order'> 
              <p>
               
              </p>
                <input type='number' placeholder='id of items' value={number} onChange={handleOnClick}  />
                <input type='number' placeholder='amount of items' value={numberofsold} onChange={handleOnClickSetnumbersold}  />
                <input type='number' placeholder='price of items' value={price} onChange={handldeOnPrice}  />

              <button className='product__buy' onClick={MakeHandler}>
                makeItem
              </button>

            
             
              <div>
                <button onClick={settoggle} className='product__close' >
                  <img src={close} alt = 'Close'/>
                </button>
              </div>

          </div>

        </div>
    </div >
  );
}

export default Makeitem;