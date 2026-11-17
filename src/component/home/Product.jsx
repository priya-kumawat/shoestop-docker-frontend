import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import { Button, Container } from 'react-bootstrap'
import { productContext } from '../contextAPI/Context'

const Product = () => {
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('All')
    const [sortBy, setSortBy] = useState('default')
    const { token, getcart, cartProduct } = useContext(productContext)
    const baseUrl = 'https://shoestop-docker-backend.onrender.com'

    useEffect(() => {
        axios.get(`${baseUrl}/api/getproducts`)
            .then(res => setProducts(res.data || []))
            .catch(err => console.log(err))
    }, [])

    const brands = ['All', ...Array.from(new Set(products.map(p => p.company).filter(Boolean)))]

    const filteredProducts = products
        .filter(item => {
            const matchesBrand = selectedBrand === 'All' || item.company === selectedBrand
            const matchesSearch =
                item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.company?.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesBrand && matchesSearch
        })
        .sort((a, b) => {
            if (sortBy === 'low-high') return Number(a.price) - Number(b.price)
            if (sortBy === 'high-low') return Number(b.price) - Number(a.price)
            return 0
        })

    const isInCart = (title) => (cartProduct || []).some(c => c.title === title)

    const addtoCart = (image, title, company, price) => {
        const activeToken = (token || localStorage.getItem('token') || '').replace(/^"|"$/g, '')
        if (!activeToken) {
            alert('Please Login first to add items to cart!')
            return
        }

        axios.post(`${baseUrl}/api/addcart`, {
            image, title, company, price
        }, {
            headers: { Authorization: `Bearer ${activeToken}` }
        })
        .then(function (response) {
            if (response.status === 202) {
                alert("Already in your cart!")
            } else {
                alert("Added to cart!")
                if (getcart) getcart()
            }
        })
        .catch(function (error) {
            console.log(error)
            alert(error.response?.data?.message || "Session expired. Please logout and login again.")
        })
    }

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            {/* Feature Strip */}
            <div style={{ background: '#212529', color: '#f8f9fa', padding: '10px 0', fontSize: '13px', textAlign: 'center', borderTop: '1px solid #343a40' }}>
                🚚 Free Express Shipping on All Orders &nbsp;|&nbsp; 🔄 7-Day Easy Returns &nbsp;|&nbsp; ✅ 100% Authentic Brands
            </div>

            <Container style={{ paddingTop: '30px', paddingBottom: '50px' }}>
                {/* Header + Search + Sort */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <div>
                        <h3 style={{ fontWeight: '800', margin: 0, color: '#212529' }}>Explore Footwear Collection</h3>
                        <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>Showing {filteredProducts.length} products</p>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="Search shoes or brand..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                padding: '8px 14px',
                                borderRadius: '8px',
                                border: '1px solid #ced4da',
                                minWidth: '230px',
                                fontSize: '14px'
                            }}
                        />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '1px solid #ced4da',
                                fontSize: '14px',
                                background: '#fff'
                            }}
                        >
                            <option value="default">Sort: Featured</option>
                            <option value="low-high">Price: Low to High</option>
                            <option value="high-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Brand Filter Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                    {brands.map(brand => (
                        <button
                            key={brand}
                            onClick={() => setSelectedBrand(brand)}
                            style={{
                                padding: '6px 16px',
                                borderRadius: '20px',
                                border: selectedBrand === brand ? '1px solid #212529' : '1px solid #dee2e6',
                                background: selectedBrand === brand ? '#212529' : '#fff',
                                color: selectedBrand === brand ? '#fff' : '#212529',
                                fontWeight: '600',
                                fontSize: '13px',
                                cursor: 'pointer',
                                transition: '0.2s'
                            }}
                        >
                            {brand}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '24px'
                }}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(li => {
                            const added = isInCart(li.title)
                            return (
                                <div
                                    key={li._id}
                                    style={{
                                        background: '#fff',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                                        border: '1px solid #e9ecef',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <div>
                                        <div style={{ position: 'relative', height: '200px', background: '#f1f3f5' }}>
                                            <img
                                                src={li.image}
                                                alt={li.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <span style={{
                                                position: 'absolute',
                                                top: '10px',
                                                left: '10px',
                                                background: 'rgba(33,37,41,0.85)',
                                                color: '#fff',
                                                padding: '3px 10px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: '600'
                                            }}>
                                                {li.company}
                                            </span>
                                        </div>
                                        <div style={{ padding: '16px 16px 8px' }}>
                                            <h6 style={{ fontWeight: '700', fontSize: '16px', marginBottom: '6px', color: '#212529' }}>
                                                {li.title}
                                            </h6>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: '800', fontSize: '18px', color: '#198754' }}>
                                                    ₹{Number(li.price).toLocaleString('en-IN')}
                                                </span>
                                                <span style={{ fontSize: '13px', color: '#f59f00', fontWeight: '600' }}>
                                                    ★ 4.5
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ padding: '12px 16px 16px' }}>
                                        <Button
                                            variant={added ? 'outline-success' : 'dark'}
                                            style={{ width: '100%', fontWeight: '600', borderRadius: '8px' }}
                                            onClick={() => addtoCart(li.image, li.title, li.company, li.price)}
                                        >
                                            {added ? '✓ Added in Cart' : 'Add to Cart'}
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: '#6c757d' }}>
                            <h5>No matching shoes found</h5>
                            <p>Try clearing your search or selecting "All" brands.</p>
                        </div>
                    )}
                </div>
            </Container>

            {/* Real-World Footer */}
            <footer style={{ background: '#212529', color: '#adb5bd', padding: '35px 0 20px', marginTop: '40px' }}>
                <Container>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', marginBottom: '25px' }}>
                        <div>
                            <h5 style={{ color: '#fff', fontWeight: '700' }}>👟 ShoeStop</h5>
                            <p style={{ fontSize: '13px', lineHeight: '1.6' }}>
                                Your one-stop destination for authentic sneakers, running shoes, and everyday footwear from top global brands.
                            </p>
                        </div>
                        <div>
                            <h6 style={{ color: '#fff', fontWeight: '600' }}>Shop Brands</h6>
                            <p style={{ fontSize: '13px', margin: 0 }}>Nike • Adidas • Puma • Reebok • Asics • New Balance • Converse</p>
                        </div>
                        <div>
                            <h6 style={{ color: '#fff', fontWeight: '600' }}>Customer Care</h6>
                            <p style={{ fontSize: '13px', margin: 0 }}>support@shoestop.in<br />Mon – Sat: 9:00 AM – 7:00 PM</p>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid #343a40', paddingTop: '15px', textAlign: 'center', fontSize: '12px' }}>
                        © 2026 ShoeStop E-Commerce Store. All Rights Reserved.
                    </div>
                </Container>
            </footer>
        </div>
    )
}

export default Product
