import React from 'react'
import quality1removebgpreview from '../assets/quality1-removebg-preview.png'
import quality2removebgpreview from '../assets/quality2-removebg-preview.png'
import quality3removebgpreview from '../assets/quality3-removebg-preview.png'

const Quality = () => {
  return (
    <>
        {/* <!-- Product quality section --> */}
    <div className="quality-product-container">
        <div className="quality-product-dtl">
            <h1>Premium <br/> <span className="highlight">Quality Products</span></h1>
            <p className="quality-dtl">It is a long established fact that a reader will be distracted by the readable
                content of a pagek like readable English.</p>
            <h2>What’s in it?</h2>
            <div className="quality-product-list">
                <div className="quality-product-item">
                    <img src={quality1removebgpreview} alt=""/>
                    <p>Aloe Vera</p>
                </div>
                <div className="quality-product-item">
                    <img src={quality2removebgpreview} alt=""/>
                    <p>Organic</p>
                </div>
                <div className="quality-product-item">
                    <img src={quality3removebgpreview} alt=""/>
                    <p>Jojoba Extract</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Quality