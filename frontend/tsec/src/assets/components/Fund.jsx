// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './fund.css';



function fund() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const handleDonation = async (e) => {
        e.preventDefault();
    
         // Check if Razorpay has loaded
      if (typeof window.Razorpay === 'undefined') {
        alert('Razorpay SDK not loaded.');
        return;
      }
    
      try {
        const orderUrl = 'http://localhost:3000/donate';
        const { data } = await axios.post(orderUrl, { name, email, amount });
    
        const options = {
          key: 'rzp_test_TrzRx21MJ6LUPk',
          amount: data.amount,
          currency: data.currency,
          name: 'Crowdfunding',
          description: 'Donation',
          order_id: data.id,
          handler: function (response) {
            alert('Payment successful!');
            console.log(response);
          },
          prefill: {
            name,
            email,
          },
          theme: {
            color: '#61dafb',
          },
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error('Error in payment:', error);
      }
    };
  return (
    <div className="donation-container">
  <div className="donation-steps">
    <h3 className='text-2xl font-semibold text-gray-800 mb-4'>How can you Donate Monthly?</h3>
    <div className="steps-grid">
      <div className="step">
        <h3>Step 1</h3>
        <p>Choose a mission of your choice</p>
      </div>
      <div className="step">
        <h3>Step 2</h3>
        <p>Choose the amount you would like to donate every month</p>
      </div>
      <div className="step">
        <h3>Step 3</h3>
        <p>Your donations will automatically be deducted monthly</p>
      </div>
      <div className="step">
        <h3>Step 4</h3>
        <p>You will receive regular updates about your donations</p>
      </div>
    </div>
  </div>

  <div className="donation-form">
    <h2>Save A Life Every Month</h2>
    <form onSubmit={handleDonation}>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      


<p className="text-gray-600 text-sm p-15">
    By continuing, you are agreeing to 
    <a href="#terms" className="text-blue-500 hover:underline"> Terms of Use</a> and 
    <a href="#privacy" className="text-blue-500 hover:underline"> Privacy Policy</a>.
</p>

      <button type="submit" className="donate-btn">
        Donate Now
      </button>
    </form>

    
  </div>
 
</div>
  );
}



export default fund;
