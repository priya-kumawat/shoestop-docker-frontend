import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function CollapsibleExample() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
            <Container>
                <Navbar.Brand href="/" style={{ fontWeight: '800', fontSize: '22px', letterSpacing: '0.5px' }}>
                    👟 ShoeStop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto" style={{ gap: '15px', fontWeight: '500' }}>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/cart">Cart</Nav.Link>
                    </Nav>
                    <Nav style={{ gap: '10px' }}>
                        <Button variant="outline-light px-4" size="sm" href='/login'>Login</Button>
                        <Button variant="primary px-4" size="sm" href='/signup'>Sign Up</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CollapsibleExample;
