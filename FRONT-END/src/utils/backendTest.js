// Test backend connectivity and Razorpay routes
import apiBase from './apiBase'
import apiFetch from './apiFetch'

export const testBackendConnection = async () => {
  
  try {
    // Test basic server connection
  const testResponse = await apiFetch('/test')
  const testData = await testResponse.json();
    console.log('✅ Server connection test:', testData);
    
    // Test Razorpay health endpoint
  const healthResponse = await apiFetch('/api/razorpay/health')
  const healthData = await healthResponse.json();
    console.log('✅ Razorpay routes test:', healthData);
    
    // Test Razorpay key endpoint
  const keyResponse = await apiFetch('/api/razorpay/key')
  const keyData = await keyResponse.json();
    console.log('✅ Razorpay key test:', keyData);
    
    return {
      server: testData,
      razorpay: healthData,
      key: keyData
    };
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    return {
      error: error.message,
      server: null,
      razorpay: null,
      key: null
    };
  }
};

// Test order creation with dummy data
export const testOrderCreation = async () => {
  
  const testOrder = {
    items: [
      {
        productId: '507f1f77bcf86cd799439011', // Dummy ObjectId
        quantity: 1
      }
    ],
    customerDetails: {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '9999999999',
      address: {
        street: 'Test Street',
        city: 'Test City',
        state: 'Test State',
        pincode: '123456'
      }
    }
  };
  
  try {
    const response = await apiFetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOrder)
    });
    
    const result = await response.json();
    console.log('✅ Order creation test:', result);
    return result;
  } catch (error) {
    console.error('❌ Order creation test failed:', error);
    return { error: error.message };
  }
};
