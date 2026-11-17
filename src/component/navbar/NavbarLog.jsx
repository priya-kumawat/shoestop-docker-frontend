import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { productContext } from '../contextAPI/Context';

function NavbarLog() {
    const [showProfile, setShowProfile] = useState(false);
    const { cartProduct } = useContext(productContext) || {};
    const cartCount = Array.isArray(cartProduct) ? cartProduct.length : 0;

    let user = { name: 'User', email: '' };
    try {
        const stored = JSON.parse(localStorage.getItem('userInfo') || '{}');
        if (stored.name || stored.email) {
            user = { name: stored.name || stored.email.split('@')[0], email: stored.email || '' };
        }
    } catch (e) {}

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
            <Container>
                <Navbar.Brand href="/" style={{ fontWeight: '800', fontSize: '22px', letterSpacing: '0.5px' }}>
                    👟 ShoeStop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto" style={{ gap: '18px', fontWeight: '500' }}>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/cart" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>Cart</span>
                            <span style={{
                                background: '#dc3545',
                                color: '#fff',
                                borderRadius: '12px',
                                padding: '1px 8px',
                                fontSize: '12px',
                                fontWeight: '700'
                            }}>
                                {cartCount}
                            </span>
                        </Nav.Link>
                    </Nav>
                    <Nav className="align-items-center" style={{ gap: '12px', position: 'relative' }}>
                        <div
                            onClick={() => setShowProfile(!showProfile)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: '#2b3035',
                                color: '#fff',
                                padding: '5px 14px',
                                borderRadius: '22px',
                                border: '1px solid #495057',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}
                        >
                            <span style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '50%',
                                background: '#0d6efd',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '13px'
                            }}>
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                            <span>{user.name} ▾</span>
                        </div>

                        {showProfile && (
                            <div style={{
                                position: 'absolute',
                                top: '46px',
                                right: '95px',
                                background: '#fff',
                                color: '#212529',
                                padding: '14px 18px',
                                borderRadius: '10px',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                                zIndex: 1050,
                                minWidth: '220px',
                                fontSize: '13px',
                                border: '1px solid #e9ecef'
                            }}>
                                <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '2px' }}>{user.name}</div>
                                <div style={{ color: '#6c757d', marginBottom: '8px' }}>{user.email || 'Verified Member'}</div>
                                <span style={{ background: '#d1e7dd', color: '#0f5132', padding: '3px 9px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>
                                    ● Active Session
                                </span>
                            </div>
                        )}

                        <Button variant="outline-light px-3" size="sm" onClick={handleLogout}>Log out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarLog;
