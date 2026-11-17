import React, { useEffect, useState } from 'react';
import { Container, Button, Badge } from 'react-bootstrap';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = 'https://shoestop-docker-backend.onrender.com';

    useEffect(() => {
        const activeToken = (localStorage.getItem('token') || '').replace(/^"|"$/g, '');
        if (!activeToken) {
            setLoading(false);
            return;
        }
        axios.get(`${baseUrl}/api/orders`, {
            headers: { Authorization: `Bearer ${activeToken}` }
        })
        .then(res => setOrders(res.data || []))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ background: '#f8f9fa', minHeight: '88vh', paddingTop: '30px', paddingBottom: '50px' }}>
            <Container style={{ maxWidth: '920px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                    <div>
                        <h3 style={{ fontWeight: '800', margin: 0 }}>My Orders</h3>
                        <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>Track your confirmed ShoeStop purchases</p>
                    </div>
                    <Button variant="outline-dark" size="sm" href="/">← Back to Shop</Button>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px', color: '#6c757d' }}>Loading your orders...</div>
                ) : orders.length > 0 ? (
                    orders.map(order => (
                        <div
                            key={order._id}
                            style={{
                                background: '#fff',
                                borderRadius: '12px',
                                padding: '20px 24px',
                                marginBottom: '18px',
                                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                                border: '1px solid #e9ecef'
                            }}
                        >
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e9ecef', paddingBottom: '12px', marginBottom: '14px', gap: '10px' }}>
                                <div>
                                    <span style={{ fontSize: '12px', color: '#6c757d', display: 'block' }}>ORDER ID</span>
                                    <strong style={{ fontSize: '13px', fontFamily: 'monospace' }}>#{order._id.slice(-8).toUpperCase()}</strong>
                                </div>
                                <div>
                                    <span style={{ fontSize: '12px', color: '#6c757d', display: 'block' }}>ORDER DATE</span>
                                    <strong style={{ fontSize: '13px' }}>
                                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </strong>
                                </div>
                                <div>
                                    <span style={{ fontSize: '12px', color: '#6c757d', display: 'block' }}>TOTAL PAID</span>
                                    <strong style={{ fontSize: '15px', color: '#198754' }}>₹{Number(order.totalAmount).toLocaleString('en-IN')}</strong>
                                </div>
                                <Badge bg="success" style={{ padding: '6px 12px', fontSize: '12px' }}>✓ {order.status}</Badge>
                            </div>

                            {order.items.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <img src={item.image} alt={item.title} style={{ width: '55px', height: '42px', objectFit: 'cover', borderRadius: '6px' }} />
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.title}</div>
                                            <div style={{ fontSize: '12px', color: '#6c757d' }}>{item.company} • Qty: {item.quantity || 1}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: '600', fontSize: '14px' }}>
                                        ₹{(Number(item.price) * (item.quantity || 1)).toLocaleString('en-IN')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div style={{ background: '#fff', padding: '60px 20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
                        <h5 style={{ fontWeight: '700' }}>No Orders Yet</h5>
                        <p style={{ color: '#6c757d', marginBottom: '20px' }}>Once you place an order from your cart, it will appear here.</p>
                        <Button variant="dark" href="/">Explore Footwear</Button>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Orders;
