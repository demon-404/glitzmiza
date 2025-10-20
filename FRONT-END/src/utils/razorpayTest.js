// Test function to verify Razorpay URL format
export const testRazorpayUrl = (amount) => {
  const amountInPaise = Math.round(amount * 100);
  const razorpayUrl = `https://razorpay.me/@glitzmia/${amountInPaise}`;
  
  console.log('Testing Razorpay URL:');
  console.log('Amount in rupees:', amount);
  console.log('Amount in paise:', amountInPaise);
  console.log('Generated URL:', razorpayUrl);
  
  // Test with different amounts
  const testAmounts = [1, 10, 100, 1000];
  testAmounts.forEach(testAmount => {
    const testPaise = Math.round(testAmount * 100);
    const testUrl = `https://razorpay.me/@glitzmia/${testPaise}`;
    console.log(`Test ${testAmount} rupees -> ${testUrl}`);
  });
  
  return razorpayUrl;
};

// Validate Razorpay.me URL format
export const validateRazorpayUrl = (url) => {
  const razorpayPattern = /^https:\/\/razorpay\.me\/@glitzmia\/\d+$/;
  return razorpayPattern.test(url);
};
