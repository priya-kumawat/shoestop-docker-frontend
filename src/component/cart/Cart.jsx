import React, { useContext, useEffect, useState } from 'react'
import './cart.css'
import { Button, Container } from 'react-bootstrap'
import { productContext } from '../contextAPI/Context'
import axios from 'axios'

const Cart = () => {
  const url = 'https://shoestop-docker-backend.onrender.com/api/addcart'
  const { cartProduct, setCartProducts, getcart } = useContext(productContext)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (getcart) getcart()
  }, [])

  useEffect(() => {
    const cartTotal = (cartProduct || []).reduce((acc, item) => {
      return acc + (parseInt(item.quantity) || 1) * (parseInt(item.price) || 0)
    }, 0)
    setTotal(cartTotal)
  }, [cartProduct])

  const removeCartItem = async (id) => {
    const activeToken = (localStorage.getItem('token') || '').replace(/^"|"$/g, '')
    await axios.delete(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${activeToken}` }
    })
    if (getcart) getcart()
  }

  const addQty = (id) => {
    setCartProducts(cartProduct.map(item =>
      item._id === id ? { ...item, quantity: (parseInt(item.quantity) || 1) + 1 } : item
    ))
  }

  const reduceQty = (id) => {
    setCartProducts(cartProduct.map(item =>
      item._id === id && (parseInt(item.quantity) || 1) > 1
        ? { ...item, quantity: (parseInt(item.quantity) || 1) - 1 }
        : item
    ))
  }

  return (
    <Container>
      <div>
        {cartProduct && cartProduct.length > 0 ?
          <div className='cart'>
            <h4 className='text-center py-3'>{cartProduct.length} items in your Cart</h4>
            {
              cartProduct.map(li => (
                <div key={li._id}>
                  <div className='item'>
                    <img src={li.image} className='img' alt={li.title} />
                    <div className='mx-3'>
                      <p className="cp-title">{li.title}</p>
                      <p className="cp-company">{li.company}</p>
                    </div>
                    <div className="quantity-counter my-2">
                      <Button className='mx-3' onClick={() => reduceQty(li._id)}>-</Button>
                      <p>{parseInt(li.quantity) || 1}</p>
                      <Button className='mx-3' onClick={() => addQty(li._id)}>+</Button>
                    </div>
                    <p className="cp-price text-dark mx-5 my-3">Rs: {(parseInt(li.quantity) || 1) * (parseInt(li.price) || 0)}</p>
                    <div className="Fbtns">
                      <Button variant='danger' onClick={() => removeCartItem(li._id)}>Remove</Button>
                    </div>
                  </div>
                </div>
              ))
            }
            <div style={{ display: "flex", justifyContent: "space-around", fontWeight: "bold", fontSize: "18px", padding: "15px" }}>
              <p>Total</p>
              <p>Rs: {total}</p>
            </div>
          </div> :
          <div className='no-items'>
            <p>No Items are added to the cart</p>
          </div>
        }
      </div>
    </Container>
  )
}

export default Cart
