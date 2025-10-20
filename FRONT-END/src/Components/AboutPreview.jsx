import React from 'react'
import '../Css/About.css'
import daynightcreame from '../assets/day-night-creame.png'

const AboutPreview = () => {
  return (
    <section className="about-container">
      <div className="about-section reverse">
        <div className="about-text">
          <h2>Where Beauty Meets Innovation</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>
        <div className="about-image">
          <img src={daynightcreame} alt="Day & Night Cream" />
        </div>
      </div>

      <div className="about-section">
        <div className="about-image">
          <img src={daynightcreame} alt="Our Journey - Day & Night Cream" />
        </div>
        <div className="about-text">
          <h2>Our Journey</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview


