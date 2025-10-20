import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbarsimple from "../Components/Navbarsimple";
import SkeletonLoader from "../Components/SkeletonLoader";
import { useCart } from "../Context/CartContext";
// import productImg from "../assets/product.png";
import heartIcon from "../assets/heart.png";
import eyeIcon from "../assets/eye.png";
import cartIcon from "../assets/cart.png";
// import card1 from "../assets/card-1.png";
// import card2 from "../assets/card-2.png";
import Footer from "../Components/Footer";
import Subscribe from "../Components/Subscribe";
import Offer from "../Components/Offer";
import apiBase from '../utils/apiBase'
import apiFetch from '../utils/apiFetch'
import logo from '../assets/logo.png'

const Singleproduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [addingToCart, setAddingToCart] = useState(false)
  

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        setError('')
  const res = await apiFetch('/admin/products')
  if (!res.ok) throw new Error('Failed to load products')
  const products = await res.json()
        const currentProduct = products.find(p => p._id === id)
        if (!currentProduct) {
          setError('Product not found')
          return
        }
        setProduct(currentProduct)
        // Show other products as recommendations (exclude current product)
        setRecommendations(products.filter(p => p._id !== id).slice(0, 2))
      } catch (err) {
        void err
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    if (id) loadProduct()
  }, [id])

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      // Prepare product data for cart
      const cartProduct = {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        discountPrice: product.discountPrice,
        imageUrl: product.imageUrl || `${apiBase}/admin/products/${product._id}/image`
      };
      
      addToCart(cartProduct);
      
      // Show success message
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding product to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  }
  useEffect(() => {
    // -------------------
    // Navbar Scroll Effect
    // -------------------
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");

    function handleScroll() {
      if (window.scrollY > 10) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // -------------------
    // Menu Toggle Functionality
    // -------------------
    function setMenuOpenState(isOpen) {
      if (!menuBtn || !navLinks) return;
      navLinks.classList.toggle("active", isOpen);
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.textContent = isOpen ? "✕" : "☰";
      menuBtn.classList.toggle("open", isOpen);
    }

    menuBtn?.setAttribute("aria-controls", "nav-links");
    menuBtn?.setAttribute("aria-expanded", "false");

    menuBtn?.addEventListener("click", () => {
      const isOpen = !navLinks.classList.contains("active");
      setMenuOpenState(isOpen);
    });

    navLinks?.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setMenuOpenState(false));
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        setMenuOpenState(false);
      }
    });

    // -------------------
    // Loader functionality
    // -------------------
    window.addEventListener("load", () => {
      setTimeout(() => {
        document.getElementById("site-loader")?.classList.add("hide");
      }, 800);
    });

    // Show loader on link navigation
    document.querySelectorAll("a[href]").forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href") || "";
        if (href.startsWith("#") || href.startsWith("javascript:")) return;
        if (
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          a.target === "_blank"
        )
          return;

        e.preventDefault();
        const loader = document.getElementById("site-loader");
        loader?.classList.remove("hide");
        setTimeout(() => {
          window.location.href = a.href;
        }, 60);
      });
    });

    // -------------------
    // Cleanup event listeners when component unmounts
    // -------------------
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setMenuOpenState);
    };
  }, []);

  return (
    <>
      {/* Optional loader element (hidden by default) */}
      <div id="site-loader" className="loader-overlay hide">
        <img src={logo} alt="Logo" className="loader-logo" />
        <div className="loader-spinner"></div>
      </div>

      <Navbarsimple />

      {/* Single Product Section */}
      {loading ? (
        <SkeletonLoader type="product" />
      ) : error ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#b91c1c' }}>{error}</div>
      ) : product ? (
        <div className="singalbox">
          <div className="singalbox-img">
            <img src={product.imageUrl ? product.imageUrl : `${apiBase}/admin/products/${product._id}/image`} alt={product.name} />
          </div>
          <div className="singalbox-dtl">
            <h1>{product.name}</h1>
            <p className="dtl">{product.description}</p>
            <div className="price-icon">
              <div className="price">
                {product.discountPrice && product.discountPrice > 0 && product.discountPrice < product.price ? (
                  <>
                    <h1>₹{Number(product.discountPrice).toFixed(2)}</h1>
                    <p style={{ textDecoration: 'line-through', color: '#aaa' }}>₹{Number(product.price).toFixed(2)}</p>
                  </>
                ) : (
                  <h1>₹{Number(product.price).toFixed(2)}</h1>
                )}
                <p>4.0 ⭐⭐⭐⭐</p>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <img src={heartIcon} width="100%" alt="Heart Icon" />
                </div>
                <div className="icon">
                  <img src={eyeIcon} width="100%" alt="Eye Icon" />
                </div>
                <div className="icon" onClick={handleAddToCart} style={{ cursor: 'pointer' }}>
                  <img src={cartIcon} width="100%" alt="Cart Icon" />
                </div>
              </div>
            </div>
            <button onClick={handleAddToCart} disabled={addingToCart}>
              {addingToCart ? 'Adding to Cart...' : 'ADD TO CART'}
            </button>
          </div>
        </div>
      ) : null}

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="card-box">
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#834256' }}>You might also like</h2>
          {recommendations.map((rec) => {
            const hasDiscount = rec.discountPrice && rec.discountPrice > 0 && rec.discountPrice < rec.price
            const imgSrc = (rec.imageUrl ? rec.imageUrl : `${apiBase}/admin/products/${rec._id}/image`) + `?t=${encodeURIComponent(rec.updatedAt || rec.createdAt || '')}`
            return (
              <div className="card" key={rec._id} onClick={() => navigate(`/single-product/${rec._id}`)} style={{ cursor: 'pointer' }}>
                <div className="card-img">
                  <img src={imgSrc} alt={rec.name} />
                  <div className="heart-icon">
                    <img src={heartIcon} alt="Heart" />
                  </div>
                </div>
                <div className="card-dtl">
                  <h2 className="dtl-title">{rec.name}</h2>
                  {hasDiscount ? (
                    <p>₹{Number(rec.discountPrice).toFixed(2)} <span style={{ textDecoration: 'line-through', color: '#aaa' }}>₹{Number(rec.price).toFixed(2)}</span></p>
                  ) : (
                    <p>₹{Number(rec.price).toFixed(2)}</p>
                  )}
                  <button onClick={() => {
                    const cartProduct = {
                      id: rec._id,
                      name: rec.name,
                      description: rec.description,
                      price: rec.price,
                      discountPrice: rec.discountPrice,
                      imageUrl: rec.imageUrl || `${apiBase}/admin/products/${rec._id}/image`
                    };
                    addToCart(cartProduct);
                    alert('Product added to cart!');
                  }}>+ ADD TO CART</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Offer Section */}
      <Offer />

      {/* Subscribe Section */}
      <Subscribe />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Singleproduct;
