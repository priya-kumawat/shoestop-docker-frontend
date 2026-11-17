import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import { Button } from 'react-bootstrap'
import { productContext } from '../contextAPI/Context'

const Product = () => {
    const [products, setProducts] = useState([])
    const { token, getcart } = useContext(productContext)
    const baseUrl = import.meta.env.VITE_API_URL || 'https://shoestop-docker-backend.onrender.com'

    const fetchData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/getproducts`)
            setProducts(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const addtoCart = (image, title, company, price) => {
        const activeToken = (token || localStorage.getItem('token') || '').replace(/^"|"$/g, '')
        if (!activeToken) {
            alert('Please Login first to add items to cart!')
            return
        }

        axios.post(`${baseUrl}/api/addcart`, {
            image, title, company, price
        }, {
            headers: {
                Authorization: `Bearer ${activeToken}`
            }
        })
        .then(function (response) {
            if (response.status === 202) {
                alert("Already in cart")
            } else {
                alert("Item Added to cart")
                if (getcart) getcart()
            }
        })
        .catch(function (error) {
            console.log(error)
            alert(error.response?.data?.message || "Failed to add to cart. Please login again.")
        })
    }

    return (
        <div className='product'>
            <h3 className='text-center p-4'>Products</h3>
            <div className="pro-layout">
                {
                    products && products.length > 0 ?
                        products.map(li => (
                            <div className='cardz' key={li._id}>
                                <img src={li.image} className='image' alt={li.title} />
                                <p className="title">{li.title}</p>
                                <div className="comrice">
                                    <p className="company">{li.company}</p>
                                    <p className="price text-dark">Rs:{li.price}</p>
                                </div>
                                <div className="btns">
                                    <Button variant='success px-4' onClick={() => addtoCart(li.image, li.title, li.company, li.price)}>
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))
                        : <div><p>no product found</p></div>
                }
            </div>
        </div>
    )
}

export default Product
