import React from 'react';
import daynightcreame from '../assets/day-night-creame.png'; 

function Subscribe() {
  return (
    <>
      {/* Subscribe form */}
      <section className="subscribe-section">
        <div className="subscribe-text">
          <h2>Stay Updated</h2>
          <p>
            Subscribe to our newsletter for latest news and blogs and <br className="none" />
            for important information, stay tuned.
          </p>
          <form className="subscribe-form">
            <input type="email" placeholder="Enter Your E-mail" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="subscribe-image">
          <img src={daynightcreame} alt="Day and Night Cream" />
        </div>
      </section>
    </>
  );
}

export default Subscribe;
