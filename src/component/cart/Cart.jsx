import React, { useContext, useEffect, useState } from 'react'
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
    <Container style={{ maxWidth: '920px', marginTop: '30px', marginBottom: '40px' }}>
      {cartProduct && cartProduct.length > 0 ? (
        <div style={{ background: '#fff', padding: '25px 30px', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <h4 className='text-center pb-3 mb-3' style={{ borderBottom: '2px solid #f1f3f5', fontWeight: '700' }}>
            {cartProduct.length} items in your Cart
          </h4>
          {cartProduct.map(li => (
            <div
              key={li._id}
              style={{
                display: 'grid',
                gridTemplateColumns: '90px 1fr 120px 110px 95px',
                alignItems: 'center',
                gap: '16px',
                padding: '14px 0',
                borderBottom: '1px solid #e9ecef'
              }}
            >
              <img
                src={li.image}
                alt={li.title}
                style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div>
                <p style={{ fontWeight: '600', fontSize: '16px', margin: '0 0 4px 0', color: '#212529' }}>{li.title}</p>
                <p style={{ fontSize: '13px', color: '#6c757d', margin: 0 }}>{li.company}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Button
                  size="sm"
                  variant="outline-dark"
                  style={{ width: '30px', height: '30px', padding: 0, fontWeight: 'bold' }}
                  onClick={() => reduceQty(li._id)}
                >-</Button>
                <span style={{ minWidth: '22px', textAlign: 'center', fontWeight: '600' }}>{parseInt(li.quantity) || 1}</span>
                <Button
                  size="sm"
                  variant="outline-dark"
                  style={{ width: '30px', height: '30px', padding: 0, fontWeight: 'bold' }}
                  onClick={() => addQty(li._id)}
                >+</Button>
              </div>
              <p style={{ fontWeight: '600', fontSize: '16px', margin: 0, textAlign: 'right', color: '#212529' }}>
                Rs: {(parseInt(li.quantity) || 1) * (parseInt(li.price) || 0)}
              </p>
              <div style={{ textAlign: 'right' }}>
                <Button size="sm" variant='danger' onClick={() => removeCartItem(li._id)}>Remove</Button>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', fontSize: '20px', fontWeight: '700' }}>
            <span>Total</span>
            <span>Rs: {total}</span>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', fontSize: '18px', color: '#6c757d' }}>
          <p>No Items are added to the cart</p>
        </div>
      )}
    </Container>
  )
}

export default Cart
