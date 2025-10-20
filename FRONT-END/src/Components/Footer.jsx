import React from 'react'
import logo from "../assets/logo.png"
import daycream from "../assets/day-cream.jpeg"
import nightcream from "../assets/night-cream.jpeg"
import leaves2 from "../assets/leaves-2.png"
import { Link } from 'react-router-dom'

function Footer() {
  return (
          <div className="footer">
        <div className="foot-1">
            <div className="f1">
                <img src={logo} alt=""/>
            </div>
            <div className="f2">
                <p>Follow us</p>
                <i className="ri-facebook-circle-fill"></i>
                <i className="ri-pinterest-fill"></i>
                <i className="ri-whatsapp-fill"></i>
                <i className="ri-instagram-fill"></i>
            </div>
        </div>
        <div className="foot-2">
            <div className="explore">
                <div className="ex-1">
                    <h1>Explore</h1>
                    <Link to="/">Home</Link>
                    <Link to="/product">Products</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/cart">Cart</Link>
                </div>
                <div className="ex-1">
                    <h1>About Us</h1>
                    <p>123456789</p>
                    <p>abc@gmail.com</p>
                    <p>ghvhtbtjbjhbjhbjhb</p>
                    <p>somnath,veraval</p>
                </div>
            </div>
            <div className="news">
                <div className="n1">
                    <h1>Recent News</h1>
                </div>
                <div className="n2">
                    <div className="anti">
                        <div className="june-1">
                            <img src={daycream}alt=""/>
                        </div>
                        <div className="june-2">
                            <p>October 2,2025</p>
                            <h6>Day - Cream</h6>
                        </div>
                    </div>
                    <div className="anti">
                        <div className="june-1">
                            <img src={nightcream} alt=""/>
                        </div>
                        <div className="june-2">
                            <p>October 2,2025</p>
                            <h6>Night - Cream</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="last">
            <p>© 2025 GLITZMIA, All rights reserved</p>
        </div>
        <div className="foot-leaves">
            <img src={leaves2} alt=""/>
        </div>
    </div>
  )
}

export default Footer
