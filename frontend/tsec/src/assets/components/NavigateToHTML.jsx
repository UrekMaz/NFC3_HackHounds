// NavigateToHtml.js
import React from 'react';

const NavigateToHtml = () => {
  const navigateToHtml = () => {
    window.location.href = 'http://localhost:3000/frontend/tsec/src/Cert/index.html'; // Ensure this URL is correct
  };

  return (
    <div>
      <button onClick={navigateToHtml}>Go to Certificate Generator</button>
    </div>
  );
};

export default NavigateToHtml;