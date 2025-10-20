import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import cartIcon from '../assets/cart.png';
import './CartIcon.css';

const CartIcon = () => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const totalItems = getTotalItems();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div className="cart-icon-container" onClick={handleCartClick}>
      <img src={cartIcon} alt="Cart" className="cart-icon" />
      {totalItems > 0 && (
        <span className="cart-badge">{totalItems}</span>
      )}
    </div>
  );
};

export default CartIcon;
