import React from 'react'
import Footer from '../Components/Footer'
import Navbarsimple from '../Components/Navbarsimple'
import goldround from '../assets/gold-round.png'
import whiteball from '../assets/whiteball.png'
import daynightcreame from '../assets/day-night-creame.png'
import heroflower from '../assets/hero-flower.png'
import women from '../assets/women.png'
import perfume from '../assets/perfume.png'
import locationlogo from '../assets/location logo.png'
import calllogo from '../assets/call logo.png'
import maillogo from '../assets/mail logo.png'
import '../Css/contactus.css'
import Subscribe from '../Components/Subscribe'
import Aboutsection from '../Components/Aboutsection'
import location from '../assets/location.png'
const Contactus = () => {
  return (
    <>
      <Navbarsimple />
      <div class="main-header">
        <div class="header">
          <div class="header-dtl">
            <div class="circle-box">
              <div class="circle same"><img src={goldround} alt="" /></div>
              <div class="circle"><img src={whiteball} alt="" /></div>
            </div>
            <h1>Contact Us</h1>
            <div class="same" id="white"><img src={whiteball} alt="" /></div>
          </div>
          <div class="header-img">
            <div class="header-img-circle">
              <div class="golden-ring">
                <img src={daynightcreame} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="flower-img">
          <img src={heroflower} alt="" />
        </div>
      </div>

      <section class="contact-section">
        <div class="contact-content">

          <div class="image-section">
            <div class="main-image">
              <img src={women} alt="Beautiful woman" class="woman-img" />
              <div class="product-overlay">
                <img src={perfume} alt="Moisture Bomb Water Cream" class="product-img" />
              </div>
            </div>
          </div>

          <div class="contact-info">
            <h2>Get In Touch With Us</h2>
            <p class="description">
              Lorem Ipsum is simply dummy text of the <br/>
                printing and typesetting industry. Lorem <br/>
                  Ipsum has been the industry's standard <br/>
                    dummy text ever since the 1500s.
                  </p>

                  <div class="contact-details">
                    <div class="contact-item">
                      <div class="icon">
                        <img src={locationlogo} alt="Location" />
                      </div>
                      <div class="info">
                        <p>Pasadena, Oklahoma, 123</p>
                        <p>Pasadena, Oklahoma</p>
                      </div>
                    </div>

                    <div class="contact-item">
                      <div class="icon">
                        <img src={calllogo} alt="Phone" />
                      </div>
                      <div class="info">
                        <p>+91 1234567890</p>
                        <p>+91 1234567890</p>
                      </div>
                    </div>

                    <div class="contact-item">
                      <div class="icon">
                        <img src={maillogo} alt="Email" />
                      </div>
                      <div class="info">
                        <p>abcd@glitzmia.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="map-section-full">
        <div class="map-container">
            <img src={location} alt="Map with location pins" class="map-img"/>
        </div>
    </section>

            <Subscribe/>
            <Aboutsection/>

            <Footer />

          </>
          )
}

          export default Contactus