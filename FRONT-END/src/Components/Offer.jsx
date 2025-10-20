import React from 'react'
import goldenlives2 from "../assets/golden-lives2.png"
import { Link } from 'react-router-dom'

function Offer() {
  return (
    <>
    <div className="discount-box">
        <h1>Special Offer!</h1>
        <h2>15% Discount</h2>
        <img src={goldenlives2} alt=""/>
        <p><Link to="">Order Now <i className="ri-arrow-right-line"></i></Link></p>
    </div>
    </>
  )
}

export default Offer
