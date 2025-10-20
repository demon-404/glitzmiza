import React from 'react'
import Footer from '../Components/Footer'
import '../Css/Blog.css'
import goldround from '../assets/gold-round.png'
import whiteball from '../assets/whiteball.png'
import daynightcreame from '../assets/day-night-creame.png'
import heroflower from '../assets/hero-flower.png'
import Navbarsimple from '../Components/Navbarsimple'
import Subscribe from '../Components/Subscribe'
import Aboutsection from '../Components/Aboutsection'
const Blog = () => {
  return (
    <>
    <Navbarsimple/>
    <div class="main-header">
        <div class="header">
            <div class="header-dtl">
                <div class="circle-box">
                    <div class="circle same"><img src={goldround} alt=""/></div>
                    <div class="circle"><img src={whiteball} alt=""/></div>
                </div>
                <h1>Blogs</h1>
                <div class="same" id="white"><img src={whiteball} alt=""/></div>
            </div>
            <div class="header-img">
                <div class="header-img-circle">
                    <div class="golden-ring">
                      <img src={daynightcreame} alt=""/>
                    </div>
                </div>
            </div>
        </div>
        <div class="flower-img">
            <img src={heroflower} alt=""/>
        </div>
    </div>

    <Subscribe/>
    <Aboutsection/>
    <Footer/>
    </>
  )
}

export default Blog