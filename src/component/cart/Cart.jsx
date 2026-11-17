import React, { useContext, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { productContext } from '../contextAPI/Context'
import axios from 'axios'

const Cart = () => {
  const url = 'https://shoestop-docker-backend.onrender.com/api/addcart'
  const { cartProduct, setCartProducts, getcart } = useContext(productContext)
  const [total, setTotal] = useState(0)
  const [orderPlaced, setOrderPlaced] = useState(false)

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

  const handleCheckout = async () => {
    const activeToken = (localStorage.getItem('token') || '').replace(/^"|"$/g, '')
    for (const item of cartProduct) {
      await axios.delete(`${url}/${item._id}`, {
        headers: { Authorization: `Bearer ${activeToken}` }
      })
    }
    if (getcart) getcart()
    setOrderPlaced(true)
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '88vh', paddingTop: '30px', paddingBottom: '50px' }}>
      <Container style={{ maxWidth: '1050px' }}>
        {orderPlaced ? (
          <div style={{ background: '#fff', padding: '50px 30px', borderRadius: '14px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
            <h3 style={{ fontWeight: '800', color: '#198754' }}>Order Placed Successfully!</h3>
            <p style={{ color: '#6c757d', maxWidth: '460px', margin: '10px auto 24px' }}>
              Thank you for shopping with ShoeStop. Your sneakers are being packed and will be dispatched shortly.
            </p>
            <Button variant="dark" href="/">Continue Shopping</Button>
          </div>
        ) : cartProduct && cartProduct.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>
            {/* Left: Cart Items */}
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
              <h4 style={{ fontWeight: '700', paddingBottom: '14px', borderBottom: '2px solid #f1f3f5', marginBottom: '10px' }}>
                Shopping Cart ({cartProduct.length} {cartProduct.length === 1 ? 'item' : 'items'})
              </h4>
              {cartProduct.map(li => (
                <div
                  key={li._id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '85px 1fr 110px 105px 80px',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 0',
                    borderBottom: '1px solid #e9ecef'
                  }}
                >
                  <img
                    src={li.image}
                    alt={li.title}
                    style={{ width: '80px', height: '62px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div>
                    <p style={{ fontWeight: '600', fontSize: '15px', margin: '0 0 3px 0', color: '#212529' }}>{li.title}</p>
                    <p style={{ fontSize: '13px', color: '#6c757d', margin: 0 }}>{li.company}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Button size="sm" variant="outline-dark" style={{ width: '28px', height: '28px', padding: 0, fontWeight: 'bold' }} onClick={() => reduceQty(li._id)}>-</Button>
                    <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: '600' }}>{parseInt(li.quantity) || 1}</span>
                    <Button size="sm" variant="outline-dark" style={{ width: '28px', height: '28px', padding: 0, fontWeight: 'bold' }} onClick={() => addQty(li._id)}>+</Button>
                  </div>
                  <p style={{ fontWeight: '700', fontSize: '15px', margin: 0, textAlign: 'right', color: '#212529' }}>
                    ₹{((parseInt(li.quantity) || 1) * (parseInt(li.price) || 0)).toLocaleString('en-IN')}
                  </p>
                  <div style={{ textAlign: 'right' }}>
                    <Button size="sm" variant='outline-danger' onClick={() => removeCartItem(li._id)}>Remove</Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Summary Box */}
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
              <h5 style={{ fontWeight: '700', paddingBottom: '12px', borderBottom: '1px solid #e9ecef', marginBottom: '16px' }}>
                Order Summary
              </h5>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: '#495057' }}>
                <span>Subtotal ({cartProduct.length} items)</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '14px', color: '#198754', fontWeight: '600' }}>
                <span>Delivery Charges</span>
                <span>FREE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '14px', borderTop: '2px solid #f1f3f5', fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>
                <span>Total Payable</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <Button variant="success" style={{ width: '100%', padding: '10px', fontWeight: '700', borderRadius: '8px' }} onClick={handleCheckout}>
                Place Order
              </Button>
            </div>
          </div>
        ) : (
          <div style={{ background: '#fff', padding: '60px 20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
            <h5 style={{ fontWeight: '700', marginBottom: '8px' }}>Your Shopping Cart is Empty</h5>
            <p style={{ color: '#6c757d', marginBottom: '20px' }}>Looks like you haven&apos;t added any shoes yet.</p>
            <Button variant="dark" href="/">Browse Shoes</Button>
          </div>
        )}
      </Container>
    </div>
  )
}

export default Cart
