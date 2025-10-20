import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { testRazorpayUrl, validateRazorpayUrl } from '../utils/razorpayTest';
import { testBackendConnection } from '../utils/backendTest';
import apiBase from '../utils/apiBase'
import Navbarsimple from '../Components/Navbarsimple';
import Footer from '../Components/Footer';
import Subscribe from '../Components/Subscribe';
import Offer from '../Components/Offer';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);

  // Test backend connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      const result = await testBackendConnection();
      setBackendStatus(result);
      console.log('Backend status:', result);
    };
    testConnection();
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setLoading(true);
    try {
      const totalAmount = getTotalPrice();
      const totalItems = getTotalItems();
      
      // Validate amount
      if (totalAmount < 1) {
        alert('Minimum order amount is ₹1.00');
        setLoading(false);
        return;
      }
      
      // Get customer details (you can modify this to get from a form)
      const customerDetails = {
        name: prompt('Enter your name:') || 'Customer',
        email: prompt('Enter your email:') || 'customer@example.com',
        phone: prompt('Enter your phone:') || '9999999999',
        address: {
          street: prompt('Enter street address:') || 'Street Address',
          city: prompt('Enter city:') || 'City',
          state: prompt('Enter state:') || 'State',
          pincode: prompt('Enter pincode:') || '123456'
        }
      };
      
      // Prepare items for backend
      const orderItems = items.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));
      
  // Create order via backend API
  // apiBase is imported from utils and defaults to the deployed backend
      
      console.log('Creating order with:', {
        items: orderItems,
        customerDetails: customerDetails,
        apiBase: apiBase
      });
      
      const response = await fetch(`${apiBase}/api/razorpay/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: orderItems,
          customerDetails: customerDetails
        })
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      console.log('Order creation result:', result);
      
      if (result.success) {
        // Use Razorpay SDK for payment
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          const options = {
            key: result.key,
            amount: result.order.amount,
            currency: result.order.currency,
            name: 'GLITZMIA',
            description: 'Order Payment',
            order_id: result.order.id,
            handler: async function (response) {
              // Verify payment
              try {
                const verifyResponse = await fetch(`${apiBase}/api/razorpay/verify-payment`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    orderId: result.order.orderId
                  })
                });
                
                const verifyResult = await verifyResponse.json();
                
                if (verifyResult.success) {
                  alert('Payment successful! Order ID: ' + result.order.orderId);
                  clearCart();
                  navigate('/');
                } else {
                  alert('Payment verification failed. Please try again.');
                }
              } catch (error) {
                console.error('Payment verification error:', error);
                alert('Payment verification failed. Please contact support.');
              }
            },
            prefill: {
              name: customerDetails.name,
              email: customerDetails.email,
              contact: customerDetails.phone
            },
            theme: {
              color: '#111633'
            }
          };
          
          const rzp = new window.Razorpay(options);
          rzp.open();
        };
        document.head.appendChild(script);
      } else {
        alert('Failed to create order: ' + result.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Error processing payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleAlternativePayment = () => {
    const totalAmount = getTotalPrice();
    const totalItems = getTotalItems();
    
    // Create a simple payment instruction
    const paymentInfo = `
Payment Instructions:

Total Amount: ₹${totalAmount.toFixed(2)}
Items: ${totalItems}

Please send payment to:
UPI ID: glitzmia@razorpay
Amount: ₹${totalAmount.toFixed(2)}

Or contact us for other payment methods.
    `;
    
    alert(paymentInfo);
  };

  if (items.length === 0) {
    return (
      <>
        <Navbarsimple />
        <div className="empty-cart">
          <div className="empty-cart-container">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <button onClick={handleContinueShopping} className="continue-shopping-btn">
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbarsimple />
      
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <p>{getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart</p>
            
            {/* Debug Panel */}
            {backendStatus && (
              <div className="debug-panel" style={{ 
                background: backendStatus.error ? '#fee2e2' : '#dcfce7', 
                padding: '10px', 
                margin: '10px 0', 
                borderRadius: '5px',
                fontSize: '12px'
              }}>
                <strong>Backend Status:</strong>
                {backendStatus.error ? (
                  <span style={{ color: '#dc2626' }}> ❌ {backendStatus.error}</span>
                ) : (
                  <span style={{ color: '#16a34a' }}> ✅ Connected</span>
                )}
                <br />
                <small>API Base: {apiBase}</small>
              </div>
            )}
          </div>

          <div className="cart-content">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img 
                      src={item.imageUrl || `${apiBase}/admin/products/${item.id}/image`} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = '/placeholder-product.jpg';
                      }}
                    />
                  </div>
                  
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <div className="item-price">
                      {item.discountPrice && item.discountPrice > 0 && item.discountPrice < item.price ? (
                        <>
                          <span className="current-price">₹{Number(item.discountPrice).toFixed(2)}</span>
                          <span className="original-price">₹{Number(item.price).toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="current-price">₹{Number(item.price).toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="item-total">
                    ₹{((item.discountPrice && item.discountPrice > 0 && item.discountPrice < item.price ? item.discountPrice : item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={loading || items.length === 0}
                  className="checkout-btn"
                >
                  {loading ? 'Processing...' : 'Proceed to Payment (Razorpay)'}
                </button>
                
                <button 
                  onClick={handleAlternativePayment}
                  disabled={loading || items.length === 0}
                  className="alternative-payment-btn"
                >
                  Alternative Payment
                </button>
                
                <button 
                  onClick={handleContinueShopping}
                  className="continue-btn"
                >
                  Continue Shopping
                </button>
                
                <button 
                  onClick={clearCart}
                  className="clear-cart-btn"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Offer />
      <Subscribe />
      <Footer />
    </>
  );
};

export default Cart;
