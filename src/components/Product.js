import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item,items_of_sold, provider, account, dappazon, togglePop }) => {
  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(false)
  const [number,setnumber] = useState(0)

  // const fetchDetails = async () => {
  //   console.log("Da vao fetchData")
  //   console.log("data man")
  //   const events =  await dappazon.queryFilter("Buy")
  //   console.log("da den day")
  //   console.log(events)
  //   const orders = events.filter(
  //     (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
  //   )
  //   console.log("order length la ")
  //   console.log(orders.length)
  //   if (orders.length === 0) return

  //   const order = await dappazon.orders(account, orders[0].args.orderId)
  //   setOrder(order)
  // }
  const buyHandler =async () => {
    const signer = await provider.getSigner()
    let transaction = dappazon.connect(signer).purchaseItem(item.itemId,number)
    await transaction.wait()
    setHasBought(true)
  }
//  useEffect(() => {
//     fetchDetails()
//   }, [hasBought])
  const handleOnClick = (e) => {
    setnumber(e.target.value)
  }
  return (
    <div className="product">
        <div className='product__details'>
          <div className='product__image'>
            {/* <img src={item.image} alt='Product'/> */}

          </div>
          <div className='product__overview'>
            <h1 > {item.itemId.toString()}</h1>
  
             <hr/>
          
              
             <hr/>
            
             </div>
             <div className='product__order'> 
             
              <p>
                { <>
                  <p> So Luong </p>
                 <p> {item.amount.toString()} </p>
                 </>
                }
                {
                  <>
                  <p>Gia ca</p>
                  <p> {item.price.toString()} </p>
                  </>
                }
              </p>
                <input type='text' placeholder='amount of items' value={number} onClick={handleOnClick}  />
              <button className='product__buy' onClick={buyHandler}>
                Buy now
              </button>

              <p><small>Ships from </small> Dappazon</p>
             
              <div>
                <button onClick={togglePop} className='product__close' >
                  <img src={close} alt = 'Close'/>
                </button>
              </div>

          </div>

        </div>
    </div >
  );
}

export default Product;