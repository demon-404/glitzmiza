import React, { useEffect } from 'react'
import CartIcon from './CartIcon'
import logo from '../assets/logo.png'
import goldenball from '../assets/golden-ball.png'
import whiteball from '../assets/white-ball.png'
import whitegoldenball from '../assets/white-golden-ball.png'
import flower2 from '../assets/flower2.png'
import flower from '../assets/flower.png'
import daynightcreame from '../assets/day-night-creame.png'
import { Link } from 'react-router-dom'

function Header() {
    useEffect(() => {
    // Show loader on page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('site-loader')?.classList.add('hide');
      }, 800);
    });

    const navbar = document.querySelector('.navbar');
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    // Scroll effect
    function handleScroll() {
      if (window.scrollY > 10) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Menu toggle
    function setMenuOpenState(isOpen) {
      if (!menuBtn || !navLinks) return;
      navLinks.classList.toggle('active', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.textContent = isOpen ? '✕' : '☰';
      menuBtn.classList.toggle('open', isOpen);
    }

    menuBtn?.setAttribute('aria-controls', 'nav-links');
    menuBtn?.setAttribute('aria-expanded', 'false');

    const handleMenuClick = () => {
      const isOpen = !navLinks.classList.contains('active');
      setMenuOpenState(isOpen);
    };
    menuBtn?.addEventListener('click', handleMenuClick);

    // Close menu on link click
    navLinks?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setMenuOpenState(false));
    });

    // Reset menu on resize
    const handleResize = () => {
      if (window.innerWidth > 1024) setMenuOpenState(false);
    };
    window.addEventListener('resize', handleResize);

    // Loader on link navigation
    document.querySelectorAll('a[href]').forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href') || '';
        if (href.startsWith('#') || href.startsWith('javascript:')) return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;

        e.preventDefault();
        const loader = document.getElementById('site-loader');
        loader?.classList.remove('hide');
        setTimeout(() => {
          window.location.href = a.href;
        }, 60);
      });
    });

    // Cleanup (important to prevent memory leaks)
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      menuBtn?.removeEventListener('click', handleMenuClick);
    };
  }, []); // Run once when component mounts

  return (
    <>
      <div id="site-loader" className="loader-overlay">
        <img src={logo} alt="Logo" className="loader-logo"/>
        <div className="loader-spinner"></div>
    </div>
    <nav>
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="Logo"/>
            </div>

            <div className="menu-btn" id="menu-btn">☰</div>

            <div className="links" id="nav-links">
                <Link to="/">Home</Link>
                <Link to="/product">Product</Link>
                <Link to="/aboutus">About Us</Link>
                <Link to="/contactus">Contact Us</Link>
                <Link to="/blog">Blog</Link>
                <CartIcon />
            </div>
        </div>
    </nav>
    <div className="main-header">
        <div className="header">
            <div className="header-dtl">
                <div className="circle-box">
                    <div className="circle same"><img src={goldenball} alt="" className="floating-ball"/></div>
                    <div className="circle"><img src={whiteball} alt="" className="floating-ball"/></div>
                </div>
                <h1>
                    <p className="txt">Enhance</p>
                    <h3 className="txt bold">your Natural <br className="none"/> Radiance</h3>
                </h1>
                <button>Order Now</button>
                <div className="same"><img src={whiteball} alt="" className="floating-ball"/></div>
            </div>
            <div className="header-img">
                <div className="header-img-circle">
                    <div className="golden-ring">
                        <div className="ring-circle">
                            <div className="circle-set"><img src={whitegoldenball} alt="" className="floating-ball"/></div>
                            <div className="circle-set"><img src={whiteball} alt="" className="floating-ball"/></div>
                        </div>
                        <div className="product-img">
                            <img src={whitegoldenball} alt="" className="floating-ball"/>
                            <img src={daynightcreame} alt="" className="floating-ball"/>
                            <img src={flower} alt="" className="floating-ball"/> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flower-img">
            <img src={flower2} alt="" className="floating-ball"/>
        </div>
    </div>
    </>
  )
}

export default Header