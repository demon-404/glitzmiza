import React from 'react'
import '../Css/Singleproduct.css'
import { Link } from 'react-router-dom'
import CartIcon from './CartIcon'
import logo from '../assets/logo.png'

const Navbarsimple = () => {
  return (
    <>
     {/* <!-- navbar --> */}
    <nav>
        <div class="navbar">
            <div class="nav-logo">
                <img src={logo} alt="Logo"/>
            </div>

            <div class="menu-btn" id="menu-btn">☰</div>

            <div class="links" id="nav-links">

                <Link to="/">Home</Link>
                <Link to="/product">Product</Link>
                <Link to="/aboutus">About Us</Link>
                <Link to="/contactus">Contact Us</Link>
                <Link to="/blog">Blog</Link>
                <CartIcon />

            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbarsimple