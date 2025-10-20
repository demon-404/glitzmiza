import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ type = 'product' }) => {
  if (type === 'product') {
    return (
      <div className="skeleton-product">
        <div className="skeleton-product-container">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-description short"></div>
            <div className="skeleton-price-section">
              <div className="skeleton-price"></div>
              <div className="skeleton-rating"></div>
            </div>
            <div className="skeleton-icons">
              <div className="skeleton-icon"></div>
              <div className="skeleton-icon"></div>
              <div className="skeleton-icon"></div>
            </div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'recommendations') {
    return (
      <div className="skeleton-recommendations">
        <div className="skeleton-recommendations-title"></div>
        <div className="skeleton-cards">
          <div className="skeleton-card">
            <div className="skeleton-card-image"></div>
            <div className="skeleton-card-content">
              <div className="skeleton-card-title"></div>
              <div className="skeleton-card-price"></div>
              <div className="skeleton-card-button"></div>
            </div>
          </div>
          <div className="skeleton-card">
            <div className="skeleton-card-image"></div>
            <div className="skeleton-card-content">
              <div className="skeleton-card-title"></div>
              <div className="skeleton-card-price"></div>
              <div className="skeleton-card-button"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
