import React from 'react'
import { useNavigate } from 'react-router-dom'
import goldencreame from '../assets/right-3.png'
import whiteball from '../assets/whiteball.png'
import lady from '../assets/lady.png'
import ball2 from '../assets/ball2.png'
import goldenLeafe2 from '../assets/goldenLeafe2.png'
import goldround from '../assets/gold-round.png'

const Aboutsection = () => {
    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate('/blog');
    };

    return (
        <>
            <div className="about">
                <div className="aboutUs">
                    <img src={goldencreame} alt="" />
                    <img id="goldBall" src={goldround} alt="" className="floating-ball" />
                    <div className="content">
                        <h1>About Us</h1>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when
                            looking at its layout. The point of using.</p>
                        <button onClick={handleReadMore}>Read More</button>
                        <img src={whiteball} alt="" className="floating-ball" />
                        <img id="whiteGoldball" src={ball2} alt="" className="floating-ball" />
                    </div>
                    <div className="lady">
                        <img src={lady} alt="" />
                    </div>
                </div>
                <div className="leafe">
                    <img src={goldenLeafe2} alt="" />
                </div>
            </div>
        </>
    )
}

export default Aboutsection